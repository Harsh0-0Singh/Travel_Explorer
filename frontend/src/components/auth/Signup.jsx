import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEarlybirds } from "react-icons/fa";

const Signup = () => {
  const[input,setInput]= useState({
    fullname:"",
    email:"",
    password:"",
    phoneNumber:"",
  })

  const changeEventHandler=(e)=>{
  setInput({...input,[e.target.name]:e.target.value})
  }
  const submitHandler = async(e)=>{
  const formData = new FormData();
  formData.append("fullname",input.fullname);
  formData.append("email",input.email);
  formData.append("password",input.password);
  formData.append("phoneNumber",input.phoneNumber);
  try{

  }catch(error){
   console.log(error)
  }
  }
  return (
    <div className=" flex items-center justify-center max-w-3xl mx-auto ">
      <form className="border-5 w-3/4 border-blue-100 p-4 my-10 rounded-2xl">
      <div className="flex justify-center w-full"><FaEarlybirds className="text-[#000052]  rounded-lg text-6xl" /></div>
        <h1 className="text-center font-bold text-blue-900 text-2xl">Signup</h1>
        <div className="mb-2 flex flex-col">
          <label htmlFor="fullname">Fullname</label>
          <input
            className="border border-blue-200 p-2 rounded-lg"
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your Fullname"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="border border-blue-200 p-2 rounded-lg"
            type="text"
            id="email"
            name="email"
            placeholder="Enter your Email"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border border-blue-200 p-2 rounded-lg"
            type="text"
            id="password"
            name="password"
            placeholder="Enter your Password"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="border border-blue-200 p-2 rounded-lg"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <br />
          <button className=" bg-blue-900 text-white p-2 rounded-lg">
            Submit
          </button>
        </div>
        <span className="text-sm ml-2">
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-900">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
