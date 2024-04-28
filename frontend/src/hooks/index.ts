import axios from "axios"
import { useEffect,useState } from "react"
import { BACKEND_URL } from "../config"


 export interface blog{
    "title": string,
    "content": string,
     "id": string,
     "author": {
         "name": string,
     }
     "date":string
    }
    export const useBlog=({id}:{id:string})=>{
      
    
        const [blog,setblog]=useState<blog>();
        const [loading,setloading]=useState(true);
        useEffect(()=>{
            axios.get(`${BACKEND_URL}/blog/${id}`,{
                headers: {
                    Authorization: localStorage.getItem("token")
                  }
            })
            .then((res)=>{
                 setblog(res.data);
                 setloading(false);
             })
            
        },[])
        return{
            loading,blog
         }
    }
    



export const useBlogs=()=>{
    interface blog{
           "content": string,
            "title": string,
            "id": string,
            "author": {
                "name": string,
            }
    }

    const [blogs,setblogs]=useState<blog[]>([]);
    const [loading,setloading]=useState(true);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
              }
        })
        .then((res)=>{
             setblogs(res.data.blogs);
             setloading(false);
         })
        
    },[])
    return{
        loading,blogs
     }
}


