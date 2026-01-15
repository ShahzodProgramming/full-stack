import express from "express";
import { checkAuth } from "../middleware/authCheck.js";
import { postCreate, postEdit, postGet } from "../controller/postController.js";

const postRouter = express.Router();

postRouter.post("/create", checkAuth, postCreate);
postRouter.post("/get", checkAuth, postGet);
postRouter.put("/edit/:postId", checkAuth, postEdit);

// postRouter.delete("/delete:postId");

export default postRouter;
