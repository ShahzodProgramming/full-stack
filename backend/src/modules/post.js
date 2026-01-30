import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    category: { type: Array, default: [], required: false, index: true },
    favourite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const postModal =
  mongoose.models.post || mongoose.model("post", postSchema);
