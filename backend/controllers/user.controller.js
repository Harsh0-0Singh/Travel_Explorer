import mongoose from "mongoose";
import { user } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { fullname, email, password, phoneNumber } = req.body;

    if (!fullname || !email || !password || !phoneNumber) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User already exists",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber
    });

    return res.status(200).json({
      message: "User registered successfully",
      success: true
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const login = async(req,res)=>{
    try {
        const{email,password}= req.body;
        if(!email||!password)
        {
            return res.status(400).json({
                message:"Email and password both are required",
                success:false
            })
        }
        const User = await user.findOne({email});
        if(!User){
            return res.status(404).json({
                message:"User does not exist",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,User.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect passsword",
                success:false
            })
        }
       const tokenData = {userId:User._id}
       const expiresIn = 24*60*60*1000;
       const expiresAt = expiresIn+Date.now();
       
       const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
       return res.status(200)
       .cookie("token",token,{maxAge:expiresIn,httpOnly:true,sameSite:"strict"})
       .json({
        message:`Welcome back ${User.fullname}`,
        User,
        token,
        expiresAt,
        success:true
       })

    } catch (error) {
        console.log(error);
    }
};

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
          message:"User logged out successfully",
          success:true
        })       
    } catch (error) {
        console.log(error);
    }
};

export const deleteAccount = async(req,res)=>{
  try {
  const userId  = req.id;
  const User = await user.findById(userId);
  if(!User){
    return res.status(404).json({
      message:"User not found",
      success:false
    })
  }
  const deleted = await User.deleteOne();
  console.log(deleted);
  } catch (error) {
    console.log(error)
  }
};
