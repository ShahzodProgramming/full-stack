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

export const postEdit = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const { postId } = req.params;
    const exists = await postModal.findById(postId);

    if (!exists) {
      console.log("Failed to find the post");
      return res.status(404).json({ message: "Failed to find the post" });
    }
    const userIdFromToken = await jwt.decode(authorization.split(" ")[1]).id;
    console.log(exists.userId, userIdFromToken);
    if (exists.userId !== userIdFromToken) {
      console.log("User trying to change the post of another user");
      return res.status(403).json({
        message: "Not allowed, can't change the post of another person",
      });
    }

    const editedPost = await postModal.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!editedPost) {
      console.log("Failed to edit the post");
      return res.status(404).json({ message: "Failed to edit the post" });
    }

    return res
      .status(200)
      .json({ message: "Post edited successfully", post: editedPost });
  } catch (error) {
    console.error("An error occured", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};
