import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { Bindings } from "hono/types";
import { userrouter } from "./user";
import { postblog_schema } from "../../zod";
import { updateblog_schema } from "../../zod";

export const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userid: string;
  };
}>();

blogrouter.use("/*", async (c, next) => {

 
 try{
  const header = c.req.header("authorization") || "";
  const response = await verify(header, c.env.JWT_SECRET);

  if (response.id) {
    c.set("userid", response.id);
    await next();
  } else {
    c.status(403);
    return c.json({ error: "invalid user or user does not exist" });
  }
 }
 catch(err){
  c.status(403);
 
  return c.json({ error: "can not authenticate you" });
 }
});

blogrouter.get("/test", (c) => {
  return c.text("disha");
});
//to post blogs
blogrouter.post("/", async (c) => {
  const userid=c.get("userid");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const valid=postblog_schema.safeParse(body);
  if(!valid.success){
    c.status(400);
    return c.json({error:"invalid input"});
  }

  const blog = await prisma.post.create({
    data: {
      
      title: body.title,
      content: body.content,
      authorId: userid,
    },
  });
  return c.json({ id: blog.id });
});

blogrouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const valid=updateblog_schema.safeParse(body);
  if(!valid.success){
    c.status(400);
    return c.json({error:"invalid input"});
  }

  const blog = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ id: blog.id });
});

//add pagination
blogrouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany(
    {
  select:{
    content:true,
    title:true,
    id:true,
    authorId:true,
    published:true,
    author:{
      select:{
      name:true,
    },
  },
  date:true,
  }
    }
  );

  return c.json({ blogs });
});

//id is dynamic here
blogrouter.get('/:id', async (c) => {

  const id = c.req.param('id');
  

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const blog = await prisma.post.findFirst({
      where:{
        id:id,
      },
      select:{
        title:true,
        content:true,
        id:true, 
        author:{
          select:{
            name:true,
          },
        },
        date:true,
      }
    });
    return c.json(blog);
  } catch (err) {
    c.status(411);
    return c.json({ error: "error while fetching the blog post" });
  }
});


