import React, { useEffect, useRef, useState } from "react";
// import Bowerbird from "../../assets/BowerBird_img.jpg";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { LogOut, Menu, X } from "lucide-react"; // Using lucide for icons
import { LuLogOut } from "react-icons/lu";
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from '../../utils/contants'
import  {toast} from "react-hot-toast";
import axios from "axios";
import { logout, setUser } from "../../redux/authSlice";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  //close mobile nav when clicking outside
  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(mobileMenuRef.current&&!mobileMenuRef.current.contains(event.target))
      {
        setIsOpen(false);
      }
    };
    if(isOpen){
      document.addEventListener("mousedown",handleClickOutside);

    }else{
      document.removeEventListener("mousedown",handleClickOutside);

    }
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[isOpen]);

  const logoutHandler = async()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(res.data.success){
        dispatch(logout());
        setIsOpen(false);
        navigate("/");
        toast.success(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="px-4 text-[#374161] bg-white fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img src={Bowerbird} className=" w-20 h-10 mr-2" alt="Logo" /> */}
          <h1 className="text-xl text-[#374161] font-bold smol-none">
           Travel Explorer
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex text-sm font-medium gap-5 items-center">
          {
            user&&user.role==='@admin'?(
              <>
              <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/">
              <li>HOME</li>
            </Link> 
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/gallery">
              <li>GALLERY</li>
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/admin/post/create">
              <li>CREATE POST</li>
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/admin/queries" >
           <li> QUERIES</li>
            </Link>
              </>
            ):(
              <>
              <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/">
              <li>HOME</li>
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/about">
              <li>ABOUT</li>
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/services">
              <li>PLACES</li>
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/gallery">
              <li>ADD PLACE</li>
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/contact">
              <li>CONTACT</li>
            </Link>
              </>
            )
          }
           
            
          </ul>
        </div>

        {/* Buttons */}
        {!user ? (
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <button variant="outline">Login</button>
            </Link>
            <Link to="/register">
              <button className="bg-[#374161] text-white p-2 rounded-md hover:bg-[#282f47]">
              SignUp
              </button>
            </Link>
          </div>
        ) : (
          <div className=" w-fit hidden md:flex items-center gap-2 cursor-pointer">
           
            <button onClick={logoutHandler} variant="link">
            {/* <LogOut /> */}
            <span className="hover:text-cyan-700 hover:scale-120 duration-300">Logout</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoMdClose className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div ref={mobileMenuRef} className="md:hidden px-4 pt-2 pb-4 space-y-3  ">
          <ul className="flex flex-col items-center uppercase gap-3 font-medium">
          {  user&&user.role==='@admin'?(  
           <>
           <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/" onClick={() => setIsOpen(false)}>
              HOME
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/places" onClick={() => setIsOpen(false)}>
              PLACES
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/admin/post/create" onClick={() => setIsOpen(false)}>
            CREATE POST
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/admin/queries" onClick={() => setIsOpen(false)}>
            REQUESTS
            </Link>
           </>
          ):(
           <>
           <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/about" onClick={() => setIsOpen(false)}>
              About us
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/services" onClick={() => setIsOpen(false)}>
              PLACES
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/gallery" onClick={() => setIsOpen(false)}>
              Add Place
            </Link>
            <Link className="hover:text-cyan-700 hover:scale-120 duration-300" to="/contact" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
           </>
          )
          }
       
          </ul>
          {
            !user?(<div className="pt-2 flex flex-col gap-2">
            <Link  to="/login" onClick={() => setIsOpen(false)}>
              <button variant="outline" className="w-full">
              Login
              </button>
            </Link>
            <Link  to="/register" onClick={() => setIsOpen(false)}>
              <button className="bg-[#374161]  text-white p-2 rounded-md hover:bg-[#282f47] w-full">
              SignUp
              </button>
            </Link>
            
            
          </div>):(
            <div className="pt-2 flex flex-col gap-2">
            <button className="bg-[#374161] flex items-center justify-center  text-white p-2 rounded-md hover:bg-[#282f47] w-full" onClick={logoutHandler} >
            <LuLogOut />
            <span className="hover:text-cyan-700 hover:scale-120 duration-300">Logout</span>
            </button>
            </div>
          )
          }
          
        </div>
      )}
    </div>
  );
};

export default Navbar;
