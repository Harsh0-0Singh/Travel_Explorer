import { review } from "../models/review.model.js";

const isReviewAuthor = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const foundReview = await review.findById(reviewId);

    if (!foundReview) {
      return res.status(400).json({
        message: "This review has already been deleted",
        success: false
      });
    }

    const userId = req.id;
    // console.log(foundReview.author.equals(userId))
    if (!foundReview.author.equals(userId)) {
      return res.status(403).json({
        message: "You are not the author of this review",
        success: false
      });
    }
    next();
  } catch (error) {
    console.error("isReviewAuthor error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export default isReviewAuthor;
