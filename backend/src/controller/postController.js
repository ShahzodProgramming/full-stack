import { postModal } from "../modules/post.js";
import jwt from "jsonwebtoken";

export const postCreate = async (req, res) => {
  try {
    const { title, content } = req.body;

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

export const postGet = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    let decoded = await jwt.decode(token.split(" ")[1], { complete: true })
      .payload.id;

    const posts = await postModal.find({ userId: decoded });

    console.log(posts);
    return res.json({ posts });
  } catch (error) {
    console.error("An error occured", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};
