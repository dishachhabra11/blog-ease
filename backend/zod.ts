import {z} from 'zod';

 export const signup_schema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6).max(16),  
})


export const signin_schema=z.object({
    email:z.string().email(),
    password:z.string().min(8).max(16),  
})


export const postblog_schema=z.object({
    title:z.string(),
    content:z.string(),  
})


export const updateblog_schema=z.object({
    id:z.string(),
    title:z.string(),
    content:z.string(),  
})


export type signup_schema=z.infer<typeof signup_schema>
export type signin_schema=z.infer<typeof signin_schema>
export type postblog_schema=z.infer<typeof postblog_schema>
export type updateblog_schema=z.infer<typeof updateblog_schema>