import express from "express";
import multer from "multer"
import {storage} from "../utils/cloudConfig.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleted, register, showAll, showOne } from "../controllers/place.controller.js";
import isOwner from "../middleware/isOwner.js";

const router = express.Router();
const upload = multer({storage});

router.route("/register").post(isAuthenticated,upload.array('images',10),register);
// router.route("/update").post(isAuthenticated,upload.array('images',10),update);
router.route("/delete/:id").delete(isAuthenticated,isOwner,deleted);
router.route("/show").get(showAll);
router.route("/show/:id").get(showOne);


export default router;