import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        required:true
    }
},{timestamps:true})

export const user = mongoose.model("user",userSchema);