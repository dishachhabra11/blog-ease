import Appbar from "../components/Appbar"
import Blogcard from "../components/Blogcard"
import { convertMonth } from "../components/Fullblog";
import Skeleton from "../components/Skeleton";
import { useBlogs } from "../hooks"


const Blogs = () => {

  const {loading,blogs} =useBlogs();
  
 if(loading==true){
  return <div className="flex justify-center  lg:max-w-screen-xl  sm:max-w-screen-md sm:px-5 cursor-pointer">
  <div className="flex flex-col max-w-xl">
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    
    </div>
    </div>
 }
 
  return (
    <div>
      <Appbar/>
      
 <div className="flex justify-center  lg:max-w-screen-xl  sm:max-w-screen-md sm:px-5 cursor-pointer">
    <div className="flex flex-col max-w-xl">
      {
        blogs.map((blog)=>{
          return <Blogcard authorname={blog.author.name ||"Anonymous"} publisheddate={
            convertMonth(blog.date.split('-')[1])+" "+blog.date.split('-')[2].split('T')[0]+" "+ blog.date.split('-')[0] 
          } title={blog.title} content={blog.content} id={blog.id}/>
        })
      }
    
  
    </div>
  </div>
    </div>
   
  )
}

export default Blogs