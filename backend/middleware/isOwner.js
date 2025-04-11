import { place } from "../models/place.model.js";

const isOwner = async(req,res,next)=>{
    try {
      const{id}= req.params;
      const userId = req.id;
      const Place = false;
      if(id){
       Place =  await place.findById(id);
      }
      if(!Place){
        return res.status(400).json({
            message:"Place does not exist",
            succeess:false
        })
      }
     if(Place.author !== userId)
     {
        return res.status(400).json({
            message:"You are not the author of this listing",
            success:false
        })
     }
     next();  
    } catch (error) {
        console.log(error)
    }
}

export default isOwner;