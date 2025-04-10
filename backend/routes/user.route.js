import express from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);

export default router;