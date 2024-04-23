import Appbar from "./Appbar";
import { blog } from "../hooks";
import { Avatar } from "./Blogcard";

function Fullblog({ blog }: { blog: blog }) {
  return (
    <div>
      <Appbar />
      <div className="grid lg:grid-cols-12 sm:grid-cols-8 px-20 py-10 max-w-screen-xl ">
        <div className="col-span-8 ">
             <div className="text-4xl font-extrabold pb-3">{blog.title || ""}</div>
             <div className="text-slate-500 mb-6">Posted on 2 Dec,2023</div>
          
          <div>{blog.content}</div>
        </div>
        <div className="lg:col-span-4 hidden lg:flex  flex-col px-10 ">
          <div className="font-medium text-lg pb-3">Author</div>
          <div className="flex gap-2"><div className="flex flex-col justify-center"><Avatar size="small" name="" color="bg-gray-200	" /></div><div className="flex flex-col text-xl font-bold">{blog.author.name|| "Anonymous"}<div className="font-normal text-sm leading-1 text-gray-600">This is authors description who is a part of blogease </div> </div></div>
        </div>
      </div>
    </div>
  );
}

export default Fullblog;
