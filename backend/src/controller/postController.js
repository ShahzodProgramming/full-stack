import { postModal } from "../modules/post.js";
import jwt from "jsonwebtoken";

export const postCreate = async (req, res) => {
  try {
    const { title, content, category, favourite } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title or content wasn't given" });
    }

    const post = new postModal({
      title,
      content,
      userId: req.user.id,
      category: category.split(" "),
      favourite: favourite ? favourite : false,
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
    const { authorization } = req.headers;
    let decoded = await jwt.decode(authorization.split(" ")[1], {
      complete: true,
    }).payload.id;

    const posts = await postModal.find({ userId: decoded });

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
    const { title, content, category, favourite } = req.body;
    const { authorization } = req.headers;
    const { postId } = req.params;

    const exists = await postModal.findById(postId);

    if (!exists) {
      return res.status(404).json({ message: "Failed to find the post" });
    }

    // finding the user binded to the post
    const userIdFromToken = await jwt.decode(authorization.split(" ")[1]).id;

    if (exists.userId !== userIdFromToken) {
      return res.status(403).json({
        message: "Not allowed, can't change the post of another person",
      });
    }

    // editing the post
    const editedPost = await postModal.findByIdAndUpdate(
      postId,
      {
        title: title ? title : exists.title,
        content: content ? content : exists.content,
        category: category ? category : exists.category ? exists.category : [],
        favourite: favourite ? favourite : false,
      },
      { new: true },
    );

    if (!editedPost) {
      return res.status(404).json({ message: "Failed to edit the post" });
    }

    return res
      .status(200)
      .json({ message: "Post edited successfully", editedPost });
  } catch (error) {
    console.error("An error occured", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};

export const postFavouriteUpdate = async (req, res) => {
  try {
    const { favourite, postId } = req.body;
    if (!postId) {
      return res
        .status(404)
        .json({ message: "Either favourite or post wasn't given" });
    }

    const exists = await postModal.findByIdAndUpdate(postId, {
      favourite: favourite === "true" ? true : false,
    });

    if (!exists) {
      return res.status(400).json({ message: "The post doesn't exist" });
    }
    return res.status(200).json({ message: "Post updated successfully!" });
  } catch (error) {
    console.error("An error occured", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};

export const postDelete = async (req, res) => {
  try {
    const { postId } = req.params;
    const { authorization } = req.headers;

    const exists = await postModal.findById(postId);
    if (!exists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const decoded = jwt.decode(authorization.split(" ")[1]);

    if (decoded.id !== exists.userId) {
      return res
        .status(403)
        .json({ message: "Can't delete the post of another user." });
    }

    const deletedPost = await postModal.findByIdAndDelete(postId);

    return res
      .status(200)
      .json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("An error occured", error);
    return res.status(500).json({ message: "Server error" });
  }
};
