import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const navigate=useNavigate();

  async function publishPost(){
    const response=axios.post(`${BACKEND_URL}/blog`,{
      title:title,
      content:content
  },{headers:{
    Authorization:localStorage.getItem("token")
  }})
  navigate(`/blog/${(await response).data.id}`)

}



  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          
        </div>
        <div className="max-w-screen-md mt-10 w-full  ">
         
          <input
          onChange={(e)=>{setTitle(e.target.value)}}
            type="text"
            id="large-input"
            className=" w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  outline-none m-auto text-2xl font-extrabold"
          />
           <div>
        <textarea onChange={(e)=>{
          setContent(e.target.value)
        }} id="message" rows={4} className="block mt-5 p-2.5 w-full text-sm h-[250px] outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 max-h-96" placeholder="Write your thoughts here..."></textarea>
        <button onClick={publishPost} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3">Publish Post</button>
        </div>
        </div>
       
       
      </div>
    </div>
  );
}

export default Publish;
