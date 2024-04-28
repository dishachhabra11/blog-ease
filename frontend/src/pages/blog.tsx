import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import Fullblog from "../components/Fullblog";
import Skeleton from "../components/Skeleton";


function Blog() {
try{
  const {id}=useParams();
  console.log(id);
  const {loading,blog}=useBlog({id:id||""});
  if(loading==true){
    return <div><Skeleton/></div>
  }
  return (
    <div><Fullblog blog={blog||{title:"",content:"",id:"",author:{name:""},date:""}}/></div>)
}
catch(e){
  console.log("the errro is ",e);
}
}

export default Blog