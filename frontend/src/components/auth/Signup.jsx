import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEarlybirds } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserInput } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/contants";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    try {
      dispatch(setLoading(true));
      dispatch(setUserInput(input));
      const res = await axios.post(
        `${USER_API_END_POINT}/sendRegisterOtp`,
        { email: input.email },
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        navigate("/otpAuth");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className=" flex items-center justify-center max-w-3xl mx-auto ">
      <form
        onSubmit={submitHandler}
        className="border-5 w-3/4 border-blue-100 p-4 my-10 rounded-2xl"
      >
        <div className="flex justify-center w-full">
          <FaEarlybirds className="text-[#000052]  rounded-lg text-6xl" />
        </div>
        <h1 className="text-center font-bold text-blue-900 text-2xl">Signup</h1>
        <div className="mb-2 flex flex-col">
          <label htmlFor="fullname">Fullname</label>
          <input
            className="border border-blue-200 p-2 rounded-lg"
            type="text"
            id="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
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
            value={input.email}
            onChange={changeEventHandler}
            name="email"
            placeholder="Enter your Email"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border border-blue-200 p-2 rounded-lg"
            type="password"
            id="password"
            value={input.password}
            onChange={changeEventHandler}
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
            value={input.phoneNumber}
            onChange={changeEventHandler}
            name="phoneNumber"
            placeholder="Enter your Phone Number"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <br />
          <button
            type="submit"
            className=" bg-blue-900 text-white p-2 rounded-lg"
          >
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
