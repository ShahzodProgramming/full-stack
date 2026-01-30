import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./AuthStore";

export const usePostStore = create((set, get) => ({
  token: localStorage.getItem("token"),
  post: [],
  createPost: async (title, content, category, favourite, navigate) => {
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
          category,
          favourite,
        },
        {
          headers: {
            authorization: "Bearer " + get().token,
          },
        },
      );

      navigate(-1);
    } catch (error) {
      console.error("An error, your majesty", error);
      console.error(error.response?.data?.message || error.message);

      if (error.response.data.reason === "Token expired") {
        console.log("Token expired please relogin");
        const logout = useAuthStore((state) => state.logout);
        logout();
      }
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
    } catch (error) {
      console.error("An error, your majesty", error);
      console.error(error.response?.data?.message || error.message);

      if (error.response.data.reason === "Token expired") {
        console.log("Token expired please relogin");
        const logout = useAuthStore((state) => state.logout);
        logout();
      }
    }
  },
  editPost: async (content, title, category, favourite, id, navigate) => {
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
          category:
            typeof category === "object" ? category : category.split(" "),
          favourite,
        },
        {
          headers: {
            authorization: "Bearer " + get().token,
          },
        },
      );

      get().getPost();

      navigate(-1);
      return "success";
    } catch (error) {
      console.error("An error occured!");
      console.error(error.response?.data?.message || error.message);
      console.log(error);

      if (error.response?.data?.reason === "Token expired") {
        console.log("Token expired please relogin");
        const logout = useAuthStore((state) => state.logout);
        logout();
      }
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

      if (error.response.data.reason === "Token expired") {
        console.log("Token expired please relogin");
        const logout = useAuthStore((state) => state.logout);
        logout();
      }
    }
  },
  favouritePost: async (favourite, id) => {
    try {
      if (!id) {
        console.error("Error occured in the request");
        return null;
      }
      const response = await axios.put(
        `http://localhost:4444/api/post/edit/favourite`,
        {
          favourite,
          postId: id,
        },
        {
          headers: {
            authorization: "Bearer " + get().token,
          },
        },
      );

      get().getPost();
      console.log("Post updated successfully");
      return "success";
    } catch (error) {
      console.error("An error occured!");
      console.error(error.response?.data?.message || error.message);
      console.log(error);

      if (error.response?.data?.reason === "Token expired") {
        console.log("Token expired please relogin");
        const logout = useAuthStore((state) => state.logout);
        logout();
      }
    }
  },
}));
