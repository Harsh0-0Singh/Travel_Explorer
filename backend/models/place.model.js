import mongoose from "mongoose";
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        url:{
            type:String,
            required:true
        },
        publicId:{
            type:String,
            required:true
        }
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    adminApproved:{
        type:Boolean,
        required:true,
        dafault:false
    }
},{timestamps:true});

export const place = mongoose.model("place",placesSchema);