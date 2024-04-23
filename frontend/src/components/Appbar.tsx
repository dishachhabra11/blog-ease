import { Link } from "react-router-dom"
import { Avatar } from "./Blogcard"
function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-2 ">
        <div>
          <Link to={"/blogs"}>
          <h3 className="font-bold flex flex-col text-xl justify-center">Blogease</h3></Link>
  
        </div>
        <div className="flex gap-2">
        <Link to={"/publish"}><button type="button" className="text-white bg-green-700 hover:bg-green-800    rounded-full text-xs  text-center me-2 mb-1 mt-1 px-5 py-2">Publish</button></Link>
            <Avatar name="Disha " size="big"/>
            
           
        </div>
    </div>
  )
}

export default Appbar