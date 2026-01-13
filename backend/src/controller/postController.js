import { postModal } from "../modules/post.js";
export const postCreate = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("Shit orked");
    if (!title && !content) {
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
