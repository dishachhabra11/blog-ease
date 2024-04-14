import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Bindings } from 'hono/types'
import { signup_schema } from '../../zod'
import { signin_schema } from '../../zod'

export const userrouter=new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();
userrouter.post('/signup',async  (c) => {
    const prisma = new PrismaClient({
       datasourceUrl: c.env?.DATABASE_URL,
   }).$extends(withAccelerate())
   
   try{
     const body=await c.req.json();
     const valid=signup_schema.safeParse(body);
     if(!valid.success){
      console.log("the signup schema result",valid);
       c.status(400);
       return c.json({
         error: "Invalid input"
       });
     }
   
   const user=await prisma.user.create({
     data: {
         
         email: body.email,
         password:body.password
       } 
   });
   
   const token= await sign(
    { id:user.id},
     c.env.JWT_SECRET
   );
   
     return c.json({
       token
     })
     
   }
   catch(e){
      c.status(404);
      return c.json({error:e});
   }
   
   })
   
   
   //for sign in
   userrouter.post('/signin', async (c) => {
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate())
   
   const body= await c.req.json();
   const valid=signin_schema.safeParse(body);
   if(!valid.success) {
     c.status(400);
     return c.json({
       error: "Invalid input"
     });
   }
   const user=await prisma.user.findUnique({where:{email: body.email,password: body.password}});
   
   if(!user){
     c.status(403);
     return c.json({
       msg:'you are not logged in',
     })
   }
   const token= await sign({id: user.id},c.env.JWT_SECRET);
   return c.json({token})
   })