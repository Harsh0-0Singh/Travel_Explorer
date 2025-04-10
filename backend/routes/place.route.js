import express from "express";
import multer from "multer"
import {storage} from "../utils/cloudConfig.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { register } from "../controllers/place.controller.js";

const router = express.Router();
const upload = multer({storage});

router.route("/register").post(isAuthenticated,upload.array('images',10),register);

export default router;