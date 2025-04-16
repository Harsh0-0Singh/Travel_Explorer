import axios from "axios";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import { setLoading, setUserInput } from "../../redux/authSlice";

const OtpAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInput, user, loading } = useSelector((store) => store.auth);
  // console.log("This is user data",userInput);
  const [otp, setOtp] = useState("");
  const changeHandler = (e) => {
    setOtp(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatchispatch(setUserInput((prev) => ({ ...prev, otp: otp }))) 
    const updated = {...userInput,otp};
    console.log("Updated",updated)
    dispatch(setUserInput(updated));
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/signup`,
        updated,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
      // dispatch(setUserInput({}));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center justify-center max-w-xl mx-auto ">
      <form
        className="border-5 w-3/4 gap-3 border-blue-100 p-4 my-10 rounded-2xl flex flex-col "
        action=""
        onSubmit={submitHandler}
      >
        <label htmlFor="otp" className="text-center">
          Enter the OTP sent at your Email
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={changeHandler}
          className="border p-2 rounded-lg border-gray-200"
        />
        <button
          type="submit"
          className="border p-2 rounded-lg px-8 mx-auto border-gray-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OtpAuth;
