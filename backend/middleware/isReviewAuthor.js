import { review } from "../models/review.model";

const isReviewAuthor = async(req,res,next)=>{
try {
  const {reviewId}  = req.params;
  const Review = await review.findById(reviewId);
  if(!Review){
    return res.status(400).json({
        message:"This review has already been deleted",
        sucecss:false
    })
  }
  const userId = req.id;
  if(Review.author!==userId){
    return res.status(400).json({
     message:"You are not the author of this review",
     success:false
    })
  }
  next();
} catch (error) {
    console.log(error)
    
}
}

export default isReviewAuthor