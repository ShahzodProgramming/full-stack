import axios from "axios";
import { create } from "zustand";

export const usePostStore = create((set, get) => ({
  token: localStorage.getItem("token") || null,
  post: [],
  createPost: async (title, content, navigate) => {
    try {
      if (!get().token) {
        alert("Unathorized");
        console.error("Unathorized");
        return null;
      }

      if (!title || !content) {
        alert("Title or content wasn't given");
        console.error("Title or content wasn't given");
        return null;
      }

      const response = await axios.post(
        "http://localhost:4444/api/post/create",
        {
          title,
          content,
        },
        {
          headers: {
            authorization: "Bearer " + get().token,
          },
        },
      );

      navigate("/post");

      console.log(response.data);
    } catch (error) {
      console.error("An error, your majesty", error);
      console.error(error.response?.data?.message || error.message);
    }
  },

  getPost: async () => {
    try {
      const response = await axios.post(
        "http://localhost:4444/api/post/get",
        { token: "Bearer " + get().token },
        {
          headers: {
            Authorization: `Bearer ${get().token}`,
          },
        },
      );

      set((state) => ({ post: response.data.posts }));

      console.log(get().post);
    } catch (error) {
      console.error("An error, your majesty", error);
      console.error(error.response?.data?.message || error.message);
    }
  },
  editPost: async (content, title, id, navigate) => {
    try {
      if (!content || !title) {
        console.error("Title or content wasn't given");
        alert("Title or content wa+sn't given");
        return null;
      }

      const response = await axios.put(
        `http://localhost:4444/api/post/edit/${id}`,
        {
          content,
          title,
        },
        {
          headers: {
            authorization: "Bearer " + get().token,
          },
        },
      );

      console.log(response);

      navigate("/post");
      return "success";
    } catch (error) {
      console.error("An error occured!");
      console.error(error.response?.data?.message || error.message);
      console.log(error);
    }
  },
  deletePost: async (id) => {
    try {
      if (!id) {
        alert("error");
        return null;
      }

      const response = await axios.delete(
        `http://localhost:4444/api/post/delete/${id}`,
        {
          headers: {
            authorization: "Bearer " + get().token,
          },
        },
      );

      console.log(response);
      get().getPost();
    } catch (error) {
      console.error("An error occured", error);
      console.error(error.response?.data?.message || error.message);
    }
  },
}));
