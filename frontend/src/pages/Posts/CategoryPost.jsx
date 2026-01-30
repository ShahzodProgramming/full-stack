import React from "react";
import { usePostStore } from "../../store/postStore";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

const CategoryPost = () => {
  const { category } = useParams();
  const posts = usePostStore((state) => state.post).filter((e) =>
    e.category.includes(category),
  );
  const token = usePostStore((state) => state.token);
  const getPosts = usePostStore((state) => state.getPost);
  const usePostDelete = usePostStore((state) => state.deletePost);

  return (
    <div className="w-full">
      <Navbar />

      {token && (
        <>
          <h1 className="text-2xl mt-10 flex items-center gap-3">
            Category: <span className="bg-green-200 px-3 py-1">{category}</span>
          </h1>
          <div className="mt-10">
            <button
              onClick={getPosts}
              className="border-3 text-black border-green-400 text-lg py-2 px-5 rounded-xl hover:border-green-600 active:border-4 transition"
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
                          {e?.category?.map((category) => (
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

                  <div className="flex gap-3 items-start">
                    <Link
                      to={`/post/edit/${e._id}?title=${encodeURIComponent(e.title)}&content=${encodeURIComponent(e.content)}&category=${encodeURIComponent(e.category.join(" "))}`}
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
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPost;
