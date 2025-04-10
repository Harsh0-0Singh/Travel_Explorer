import { place } from "../models/place.model.js";

export const register = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.files || req.files.length == 0) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
      });
    }
    if (!title || !description) {
      return res.status(400).json({
        message: "Both title and description are necessary",
        success: false,
      });
    }
    const Place = await place.findOne({ title });
    if (Place) {
      return res.status(400).json({
        message: "Place with the same name exists",
        success: false,
      });
    }
    const imagedata = req.files.map(file=>({
      url:file.path,
      publicId:file.filename

    }))
  const registeredPlace = await  place.create({
      title,
      description,
      images:imagedata,
      author:req.id
    })
    return res.status(200).json({
      message:"Place added successfully",
      success:true,
      registeredPlace
    })
  } catch (error) {
    console.log(error);
  }
};
