import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  signin: async (username, password, email, navigate) => {
    try {
      const response = await axios.post("http://localhost:4444/api/register", {
        password,
        username,
        email,
      });

      navigate("/email-verification");
    } catch (error) {
      alert(error.response.data.message);
      console.log(
        "Your majesty, an error is to be appeared upon you.",
        error.response.data.message,
      );
      throw error;
    }
  },
  emailVerification: async (token, navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:4444/api/verify-email",
        {
          code: token,
        },
      );

      set({ token: response.data.token });
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log(
        "Your majesty, an error is to be appeared upon you.",
        error.response.data.message,
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
      console.log(message);

      set({ token });
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log(
        "Your majesty, an error is to be appeared upon you.",
        error.response.data.message,
      );

      throw error;
    }
  },
  logout: async () => {
    set({ token: null, user: null });
    localStorage.removeItem("token");
  },
}));
