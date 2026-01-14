import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

export const CreatePosts = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  const usePostCreate = usePostStore((state) => state.createPost);
  const handlePostSubmit = (e) => {
    e.preventDefault();
    usePostCreate(titleInput, contentInput, navigate);
  };
  return (
    <div className="w-full">
      <Navbar />

      {token && (
        <div>
          <form
            className="mx-auto max-w-2xl w-[90%] mt-10 flex flex-col gap-5 items-center rounded py-5"
            onSubmit={handlePostSubmit}
          >
            <input
              type="text"
              placeholder="Title for the post"
              className="w-[90%] mx-auto border border-green-900 p-2 mt-10 rounded focus:bg-green-50 transition"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />

            <textarea
              type="text"
              placeholder="Content for the post"
              className="w-[90%] mx-auto border h-40 max-h-70 border-green-900 p-3 mt-10 rounded focus:bg-green-50 transition"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
            />

            <button
              className="bg-green-400 text-lg py-2 px-5 rounded-xl w-[50%] hover:bg-green-600 hover:text-white transition"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
