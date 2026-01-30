import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../store/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

export const FavouritePost = () => {
  const token = useAuthStore((state) => state.token);
  const getPosts = usePostStore((state) => state.getPost);
  const usePostDelete = usePostStore((state) => state.deletePost);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const selectedFavouritePosts = usePostStore((state) => state.post).filter(
    (e) => e.favourite === true,
  );
  const favouritePost = usePostStore((state) => state.favouritePost);
  const handlePostFavUpdate = (favouriteInput, postId) => {
    favouritePost(favouriteInput, postId, navigate);
  };
  return (
    <div className="w-full">
      <Navbar />

      <div className="text-xl font-bold mt-20">Favourite Posts: </div>
      <div className="flex flex-col gap-5 mt-10">
        {token && selectedFavouritePosts.length !== 0 ? (
          selectedFavouritePosts?.map((e) => (
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
                        <Link key={category} to={`/post/category/${category}`}>
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
            </div>
          ))
        ) : (
          <div className="bg-red-500 p-5 text-white text-center font-bold text-lg">
            No posts are favourite
          </div>
        )}
      </div>  
    </div>
  );
};
