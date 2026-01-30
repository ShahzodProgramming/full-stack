import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

export const EditPosts = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const { postId } = useParams();

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [favouriteInput, setFavouriteInput] = useState(false);

  const usePostEdit = usePostStore((state) => state.editPost);

  const [searchParam] = useSearchParams();
  useEffect(() => {
    setTitleInput(searchParam.get("title"));
    setContentInput(searchParam.get("content"));
    setCategoryInput(searchParam.get("category"));
    setFavouriteInput(searchParam.get("favourite"));
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    usePostEdit(
      contentInput,
      titleInput,
      categoryInput,
      favouriteInput,
      postId,
      navigate,
    );
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

            <input
              type="text"
              placeholder="Category for the post, please write them between spaces."
              className="w-[90%] mx-auto border mt-5 border-green-900 p-2 rounded focus:bg-green-50 transition"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />

            <div className="mt-3 items-center">
              <div className="flex items-center gap-3">
                <label
                  className="text-green-700 text-lg"
                  htmlFor="checkbox_fav"
                >
                  Add to favourite list:
                </label>
                <input
                  type="checkbox"
                  id="checkbox_fav"
                  className="w-5 h-5"
                  onChange={() => setFavouriteInput((prev) => !prev)}
                />
              </div>
            </div>

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
