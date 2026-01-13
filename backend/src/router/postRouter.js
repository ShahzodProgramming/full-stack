import express from "express";
import { checkAuth } from "../middleware/authCheck.js";
import { postCreate } from "../controller/postController.js";

const postRouter = express.Router();

postRouter.post("/create", checkAuth, postCreate);

// postRouter.post("/delete:postId");
// postRouter.post("/edit:postId");

export default postRouter;
