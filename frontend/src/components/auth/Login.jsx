import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEarlybirds } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserInput, setUser } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/contants";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.data.success) {
        const { User, token, expiresAt } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("expiresAt", expiresAt);

        dispatch(setUser({ user: User, token, expiresAt }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center mt-20 max-w-3xl mx-auto ">
      <form
        onSubmit={submitHandler}
        className="w-3/4  border-blue-100 p-4 my-10 rounded-2xl"
      >
        <div className="flex justify-center w-full">
          <FaEarlybirds className="text-[#000052]  rounded-lg text-6xl" />
        </div>
        <h1 className="text-center font-bold text-blue-900 text-2xl">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-blue-200 p-2 rounded-lg"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={changeHandler}
            value={input.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border border-blue-200 p-2 rounded-lg"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            value={input.password}
          />
        </div>
        <div className="mb-2 flex flex-col">
          <br />
          <button
            type="submit"
            className="bg-blue-900 text-white p-2 rounded-lg"
          >
            Submit
          </button>
        </div>
        <span className="text-sm ml-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-900">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
