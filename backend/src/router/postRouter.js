import express from "express";
import { checkAuth } from "../middleware/authCheck.js";
import {
  postCreate,
  postDelete,
  postEdit,
  postFavouriteUpdate,
  postGet,
} from "../controller/postController.js";

const postRouter = express.Router();

postRouter.post("/create", checkAuth, postCreate);
postRouter.post("/get", checkAuth, postGet);
postRouter.put("/edit/favourite", checkAuth, postFavouriteUpdate);
postRouter.put("/edit/:postId", checkAuth, postEdit);
postRouter.delete("/delete/:postId", checkAuth, postDelete);

export default postRouter;
