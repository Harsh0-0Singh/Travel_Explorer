import mongoose from "mongoose";
import { user } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export const sendRegisterOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({
        message: "Email field is required",
        success: false,
      });
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email",
        success: false,
      });
    }
    const isEmailAlreadyReg = await user.findOne({ email });
    if (isEmailAlreadyReg) {
      return res.status(400).json({
        message: "User already registered",
        success: false,
      });
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const hashedOTP = await bcrypt.hash(otp, 12);
    const newOTP = await OTP.create({
      email,
      otp: hashedOTP,
      name: "register_otp",
    });

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verification",
      html: `<p>Your OTP code is ${otp}</p>`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else return null;
    });
    return res.status(200).json({
      result: newOTP,
      message: "otp sent sucessfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error in sendRegisterOTP - controllers/user.js",
      error,
      success: false,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, otp } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !otp) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    if (!validator.isEmail(email))
      return res.status(400).json({
        message: `email pattern failed. Please provide a valid email.`,
        success: false,
      });
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User already exists",
        success: false,
      });
    }
    const otpHolder = await OTP.find({ email });
    if (otpHolder.length == 0)
      return res
        .status(400)
        .json({ message: "you have entered an exired otp", success: false });

    const register_otps = otpHolder.filter((otp) => otp.name == "register_otp");
    const findedOTP = register_otps[register_otps.length - 1];
    const plainOTP = otp;
    const hashedOTP = findedOTP.otp;
    const isValidOTP = await bcrypt.compare(plainOTP, hashedOTP);
    if (isValidOTP) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.create({
        fullname,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      await OTP.deleteMany({ email: findedOTP.email });
      return res.status(200).json({
        message: "User registered successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
         message: "wrong otp", 
         success: false 
        });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password both are required",
        success: false,
      });
    }
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, User.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect passsword",
        success: false,
      });
    }
    const tokenData = { userId: User._id };
    const expiresIn = 24 * 60 * 60 * 1000;
    const expiresAt = expiresIn + Date.now();

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: expiresIn,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${User.fullname}`,
        User,
        token,
        expiresAt,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.id;
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const deleted = await User.deleteOne();
    console.log(deleted);
  } catch (error) {
    console.log(error);
  }
};
