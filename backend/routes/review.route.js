import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isReviewAuthor from "../middleware/isReviewAuthor.js";
import { create, deleteReview, updateReview } from "../controllers/review.controller.js";


const router = express.Router({ mergeParams: true });

router.route("/create").post(isAuthenticated, create);
router.route("/update/:reviewId").put(isAuthenticated,isReviewAuthor,updateReview);
router.route("/delete/:reviewId").delete(isAuthenticated,isReviewAuthor,deleteReview);

export default router;

