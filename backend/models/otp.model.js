import mongoose from "mongoose";
const Schema = mongoose.Schema
 
const otpSchema = new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
otp:{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now,
    index:{expires:300}
}
},{timestamps:true})

export const OTP = mongoose.model("otp",otpSchema);