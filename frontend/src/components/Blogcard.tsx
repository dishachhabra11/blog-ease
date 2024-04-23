import { Link } from "react-router-dom";

interface BlogcardProps {
  id:String;
    authorname: string;
    publisheddate: string;
    title: string;
    content: string;
    
}

function Blogcard({authorname, publisheddate, title, content,id}: BlogcardProps) {
  return (
  <Link to={`/blog/${id}`}>
      <div className="p-4 flex flex-col border-b pb-4 ">
        <div className="flex gap-1">{<Avatar  name={authorname[0]} size="small"/>}<span className="text-black font-extralight flex flex-col justify-center  ">{authorname} </span><span className=" flex flex-col justify-center text-gray-500 font-medium "> &#183;{publisheddate}</span></div>
        <div className="pt-2 pb-6">
        <div className="text-xl font-bold ">{title}</div>
        <div className="font-normal">{content.slice(0,100)+"..."}</div>
        </div>

       <div className="flex gap-2 items-center"> 
       {/* <button type="button" className="text-gray-900  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1   bg-gray-200">react</button> */}
       <div className="  border border-gray-300 focus:outline-none hover:bg-gray-100 text-gray-500 font-medium rounded-full  bg-gray-200 text-sm px-3 py-1">{content.length >1000?Math.floor(content.length/100): 1} min read</div></div>
        
    </div>
  </Link>
  )
}
 export function Avatar({name,size,color}:{name:string,color?:string,size?:"big"|"small"}){
    return <div>
        <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${color ? `${color}`:"bg-gray-700"} ${size=="small"? "w-6 h-6" :"w-10 h-10"}`}>
    <span className="font-bold text-white">{name[0]}</span>
</div>
    </div>
}

export default Blogcard