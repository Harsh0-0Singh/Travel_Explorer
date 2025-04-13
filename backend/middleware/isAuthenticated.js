import jwt from "jsonwebtoken"
const isAuthenticated = async(req,res,next)=>{
    try {
      const token = req.cookies.token;
      if(!token){
        return res.status(404).json({
          message:"User not logged in",
          success:false
        })
      }
      const istokenValid = jwt.verify(token,process.env.SECRET_KEY);
      if(!istokenValid){
        return res.status(400) .json({
          message:"Invalid token",
          success:false
        })
      }
      req.id = istokenValid.userId;
      next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;