import  mongoose  from "mongoose";
import { place } from "../models/place.model.js";
import { cloudinary } from "../utils/cloudConfig.js";

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

// export const update = async(req,res)=>{
//   try {
//     const{publicIds} = req.body;
//     console.log(typeof publicIds);
//     return
//   } catch (error) {
//     console.log(error);
//   }
// }
                                                            
export const deleted = async(req,res)=>{
  try {
  const{id} = req.params;
  if(!id||!mongoose.Types.ObjectId.isValid(id))  
  {
   return res.status(400).json({
    message:"Invalid request",
    success:false
   })
  }
  const Place = await place.findById(id);
  if(!Place){
    return res.status(404).json({
      message:"Place not found",
      sucess:false
    })
  }
  const images = Place.images;
  for (const image of images) {
   console.log(image)
   await cloudinary.uploader.destroy(image.publicId); 
  }

  const deleted = await Place.deleteOne()
  return res.status(200).json({
    message:"Place deleted successfully",
    succeess:true,
    deleted
  })
  } catch (error) {
    console.log(error)
  }
}

export const showAll = async(req,res)=>{
  try {
   const allPlaces = await place.find({})
   if(!allPlaces||allPlaces.length==0){
    return res.status(400).json({
      message:"No Places found",
      success:false
    })
   }
   return res.status(400).json({
    allPlaces,
    success:true
   })
  } catch (error) {
    console.log(error)
  }
}

export const showOne = async(req,res)=>{
  try {
  const{id}  = req.params;
  if(!id||!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      message:"Invalid request",
      success:false
    })
  }
  const Place = await place.findById(id);
  if(!Place){
    return res.status(404).json({
      message:"Place not found",
      success:false
    })
  }
  return res.status(200).json({
    Place
  })
  } catch (error) {
    console.log(error);
  }
}