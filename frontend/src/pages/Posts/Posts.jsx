import React from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

export const Posts = () => {
  const token = useAuthStore((state) => state.token);
  const getPosts = usePostStore((state) => state.getPost);
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Navbar />

      {token && (
        <>
          <div className="mt-10">
            <div className="max-w-xl w-[80%] border-2 border-gray-800 border-dashed p-5 flex flex-col items-start gap-10 bg-gray-200">
              <h1 className="text-4xl ">Create a new post</h1>

              <button
                className="bg-green-400 text-lg py-2 px-5 rounded-xl hover:bg-green-600 hover:text-white transition"
                onClick={() => navigate("/post/create")}
              >
                Let's go
              </button>
            </div>
          </div>

          <div className="mt-10">
            <button onClick={getPosts}>click</button>
          </div>
        </>
      )}
    </div>
  );
};
