import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../store/AuthStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

export const Posts = () => {
  const token = useAuthStore((state) => state.token);
  const getPosts = usePostStore((state) => state.getPost);
  const posts = usePostStore((state) => state.post);
  const usePostDelete = usePostStore((state) => state.deletePost);

  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);
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
            <button
              onClick={getPosts}
              className="border-2 border-green-400 text-lg py-2 px-5 rounded-xl hover:border-green-600 transition"
            >
              Click to refresh posts
            </button>

            <div className="flex flex-col gap-5 mt-20">
              {posts?.map((e) => (
                <div
                  key={e._id}
                  className="bg-gray-100 w-full p-5 relative hover:bg-gray-200  transition flex justify-between"
                >
                  <div>
                    <div>
                      <span className="text-gray-500 text-sm">Title:</span>
                      <p className="text-2xl">{e.title}</p>
                    </div>

                    <div className="ml-[2%]">
                      <span className="text-gray-500 text-sm">Content:</span>
                      <p className="text-lg">{e.content}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Link to={`/post/edit/${e._id}`}>
                      <button className="bg-yellow-300  px-3 py-1 hover:bg-yellow-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-400 px-3 py-1 hover:bg-red-500"
                      onClick={() => usePostDelete(e._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
