import { place } from "../models/place.model.js";
import { review } from "../models/review.model.js";
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
