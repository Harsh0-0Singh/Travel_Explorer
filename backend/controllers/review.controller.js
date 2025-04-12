import { place } from "../models/place.model.js";
import { review } from "../models/review.model.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { user } from "../models/user.model.js";

export const create = async (req, res) => {
  try {
    const { rating } = req.body;
    if (!rating) {
      return res.status(400).json({
        message: "Rating cannot be blank",
        success: false,
      });
    }
    const newreview = new review(req.body);
    if (!newreview) {
      return res.status(400).json({
        message: "Fields cannot be blank",
        success: false,
      });
    }
    const Place = await place.findById(req.params.id);
    newreview.author = req.id;
    if (!Place) {
      return res.status(400).json({
        message: "This place has been deleted",
        success: false,
      });
    }
    Place.reviews.push(newreview);

    await newreview.save();
    await Place.save();

    return res.status(200).json({
      message: "Review added sucessfully",
      success: true,
      Place,
      newreview,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async(req,res)=>{
 try {
  const{reviewId} = req.params;
  const{rating} = req.body;
  if(!rating){
    return res.status(400).json({
      message:"Ratings cannot be blank",
      success:false
    })
  }
  const oldReview = await review.findById(reviewId);
  if(!oldReview){
    return res.status(400).json({
      message:"Review does not exist",
      success:false
    })
  }
  const newReview = req.body;
  if(newReview.rating) oldReview.rating = newReview.rating;
  if(newReview.message) oldReview.message = newReview.message;

  newReview =  await oldReview.save();
  return res.status(200).json({
    message:"Review updated successfully",
    success:true
  })
 } catch (error) {
  console.log(error)
 } 
}

export const deleteReview = async(req,res)=>{
  try {

    const{id,reviewId} = req.params;
    const Place = place.findById(id);
    if(!Place){
      return res.status(400).json({
        message:"The post has been deleted",
        success:false
      })
    }
    const updated = await place.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    if(!updated){
      return res.status(400).json({
        message:"Review deletion failed",
        success:false
      })
    }
    const deleted = await review.findByIdAndDelete(reviewId);
    if(!deleted){
      return res.status(400).json({
        message:"Review deletion failed",
        success:false
      })
    }
    return res.status(200).json({
      message:"Review deleted",
      success:true
    })
  } catch (error) {
    console.log(error)
  }
}