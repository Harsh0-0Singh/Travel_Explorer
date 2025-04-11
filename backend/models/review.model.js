import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating:{
        type:Number,
        max:5,
        min:1
    },
    message:{
        type:String
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

export const review = mongoose.model("review",reviewSchema);