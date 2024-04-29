import { Link } from "react-router-dom"
import { Avatar } from "./Blogcard"
import {jwtDecode} from 'jwt-decode';
import { useEffect,useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
function Appbar() {
  const [username,setUsername]=useState("Anonymous");

const getname=async ({id}:{id:string})=>{
  const payload= await axios.get(`${BACKEND_URL}/user/userid/${id}`);
  return(payload.data.name);
  
}
interface decoded_type {
  id: string;
  // Other properties if present in your payload
}


  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      const decoded: decoded_type = jwtDecode(jwt);
      const userId = decoded.id;
      getname({ id: userId })
        .then((name) => {
          setUsername(name); // Update the username state
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []); 
  
  
  return (
    
    <div className="border-b flex justify-between px-10 py-2 ">
      
        <div>
          <Link to={"/blogs"}>
          <h3 className="font-bold flex flex-col text-xl justify-center">Blogease</h3></Link>
  
        </div>
        <div className="flex gap-2">
        <Link to={"/publish"}><button type="button" className="text-white bg-green-700 hover:bg-green-800    rounded-full text-xs  text-center me-2 mb-1 mt-1 px-5 py-2">Publish</button></Link>
            <Avatar name={username[0].toUpperCase()} size="big"/>
             
        </div>
    </div>
  )
}

export default Appbar