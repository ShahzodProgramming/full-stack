import { postModal } from "../modules/post.js";
import jwt from "jsonwebtoken";

export const postCreate = async (req, res) => {
  try {
    const { title, content, token } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title or content wasn't given" });
    }

    const post = new postModal({
      title,
      content,
      userId: req.user.id,
    });

    const savedPost = await post.save();

    return res.json({ message: "Post created successfully", savedPost });
  } catch (error) {
    console.error("An error occured", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};
