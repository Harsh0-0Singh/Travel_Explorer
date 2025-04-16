import express from "express"
import dotenv from "dotenv"
import connectdb from "./utils/connectdb.js"
import userRoute from "./routes/user.route.js"
import placeRoute from "./routes/place.route.js"
import reviewRoute from "./routes/review.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config({})
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const corsOptions ={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
app.use("/user",userRoute);
app.use("/place",placeRoute);
app.use("/place/:id/reviews",reviewRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server active at ${process.env.PORT}`);
    connectdb()   
})