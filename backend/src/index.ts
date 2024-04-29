import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import  {userrouter} from './routes/user'
import { blogrouter } from './routes/blog'
import { cors } from 'hono/cors'

export const app=new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  };
  Variables: {
    userid: string;
    unauthorized: boolean;
  };
}>()

app.use('/*', cors())

// app.use("/*", async (c, next) => {
//   try{
//    const header = c.req.header("authorization") || "";

   
//    const response = await verify(header, c.env.JWT_SECRET);
 
//    if (response.id) {
//      c.set("userid", response.id);
//      await next();
//    } else {
//      c.status(403);
//      return c.json({ error: "invalid user or user does not exist" });
//    }
//   }
//   catch(err){
//    c.status(403);
//    return c.json({ error: "can not authenticate you" });
//   }
//  });




app.route('/user',userrouter);
app.route('/blog',blogrouter);



export default app
