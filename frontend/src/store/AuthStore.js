import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  posts: [],

  signin: async (username, password, email, navigate) => {
    try {
      const response = await axios.post("http://localhost:4444/api/register", {
        password,
        username,
        email,
      });

      const { token, message } = response.data;
      localStorage.setItem("token", token);
      set({ token });

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log(
        "Your majesty, an error is to be appeared upon you.",
        error.response.data.message
      );

      throw error;
    }
  },
  login: async (password, email, navigate) => {
    try {
      const response = await axios.post("http://localhost:4444/api/login", {
        password,
        email,
      });

      const { token, message } = response.data;
      localStorage.setItem("token", token);
      set({ token });

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log(
        "Your majesty, an error is to be appeared upon you.",
        error.response.data.message
      );

      throw error;
    }
  },
  logout: async () => {
    set({ token: null, posts: [], user: null });
    localStorage.removeItem("token");
  },
}));
