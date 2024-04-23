import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import  {BACKEND_URL} from '../config.ts';
const Auth = ({type}:{type: "signup" | "signin"}) => {
  const [postdata, setpostdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const postrequest = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}${type=="signup" ?"/user/signup": "/user/signin"}`, postdata);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("error wh sending data");
    }
  };
  return (
    <div className=" h-screen flex  flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
          <div className="text-center max-w-md font-bold text-3xl">
            {type=="signup" ? "Create an account" :"Login into account"}
          </div>
          <div className="text-center text-md text-gray-500">
          {type=="signup" ? "Already have an account?" :"Don't have an account?"}
            
            <Link to={type=="signup" ? "/signin":"/signup"} className="underline">
              {type=="signup" ? "Sign in" :"Sign up"}
            </Link>
          </div>
          </div>

          <div className="mt-1 ">
           {type=="signup" ?  <LabelledInput
              placeholder="enter your name"
              label="name"
              onChange={(e) => {
                setpostdata({ ...postdata, name: e.target.value });
              }}
            /> : null}

            <LabelledInput
              placeholder="enter your email"
              label="Email"
              onChange={(e) => {
                setpostdata({ ...postdata, email: e.target.value });
              }}
            />
            <LabelledInput
              placeholder="enter your password"
              label="Password"
              type="password"
              onChange={(e) => {
                setpostdata({ ...postdata, password: e.target.value });
              }}
            />
            <button  onClick={postrequest} type="button" className="text-white my-6 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">{type=="signup"?"Signup":"Signin"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LabelledInputtype {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputtype) {
  return (
    <div className="py-1">
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id="first_name"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
        required
      />
    </div>


  );
}

export default Auth;
