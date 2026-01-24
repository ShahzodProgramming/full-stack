import express from "express";
import { login, signUp, verifyEmail } from "../controller/authController.js";
import postRouter from "./postRouter.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", signUp);
router.post("/verify-email", verifyEmail);

router.use("/post", postRouter);

export default router;
