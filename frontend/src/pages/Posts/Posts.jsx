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

  const usePostEdit = usePostStore((state) => state.editPost);
  const handlePostFavUpdate = (favouriteInput, postId) => {
    usePostEdit(favouriteInput, postId, navigate);
  };

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
            <div className="flex gap-5">
              <button
                onClick={getPosts}
                className="border-2 border-green-400 text-lg py-2 px-5 rounded-xl hover:border-green-600 transition"
              >
                Click to refresh posts
              </button>

              <Link to={"/post/favourite"}>
                <button className="border-2 border-green-400 text-lg py-2 px-5 rounded-xl hover:border-green-600 transition">
                  Go to selected posts
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-5 mt-20">
              {posts?.map((e) => (
                <div
                  key={e._id}
                  className="bg-gray-100 w-full p-5 relative hover:bg-gray-200  transition flex justify-between"
                >
                  <div>
                    <div>
                      <p className="text-2xl">{e.title}</p>
                    </div>

                    <div>
                      <p className="text-lg">{e.content}</p>
                    </div>

                    <div className="flex gap-3 mt-10">
                      {e.category.length === 0 ? (
                        ""
                      ) : (
                        <span className="flex gap-1">
                          {e?.category?.map((category, i) => (
                            <Link
                              key={category}
                              to={`/post/category/${category}`}
                            >
                              <span className="text-sm p-2 hover:bg-gray-300">
                                {category}
                              </span>
                            </Link>
                          ))}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center gap-3">
                      {e.favourite ? (
                        <i
                          className="ri-star-fill text-xl"
                          onClick={() => {
                            handlePostFavUpdate(false, e._id);
                          }}
                        ></i>
                      ) : (
                        <i
                          className="ri-star-line text-xl"
                          onClick={() => {
                            handlePostFavUpdate(true, e._id);
                          }}
                        ></i>
                      )}
                      <Link
                        to={`/post/edit/${e._id}?title=${encodeURIComponent(e.title)}&content=${encodeURIComponent(e.content)}&category=${encodeURIComponent(e.category.join(" "))}&favourite=${encodeURIComponent(e.favourite)}`}
                      >
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
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
