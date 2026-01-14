import React from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const Home = () => {
  const token = useAuthStore((state) => state.token);
  return (
    <div className="w-full">
      <Navbar />

      <div className="mt-20">
        {token && (
          <Link
            to="/post"
            className="bg-green-400 text-lg py-2 px-5 rounded-xl hover:bg-green-600 hover:text-white transition"
          >
            Posts
          </Link>
        )}
      </div>
    </div>
  );
};
