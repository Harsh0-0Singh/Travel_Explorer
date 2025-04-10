import express from "express"
import dotenv from "dotenv"
import connectdb from "./utils/connectdb.js"
import userRoute from "./routes/user.route.js"
import placeRoute from "./routes/place.route.js"
import cookieParser from "cookie-parser"


dotenv.config({})
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/user",userRoute);
app.use("/place",placeRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server active at ${process.env.PORT}`);
    connectdb()   
})