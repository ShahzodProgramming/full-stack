import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);

  const token = useAuthStore((state) => state.token);
  return (
    <nav className="flex flex-col sm:flex-row gap-5 2xs:gap-0 items-center justify-between w-full pb-3 border-b-2 border-b-green-500 border-dashed">
      <Link to="/">
        <div className="italic text-xl">Welcome, businessman!</div>
      </Link>

      {!token && (
        <div className="flex gap-5">
          <Link to="/login">
            <button className="bg-green-400 text-lg py-2 px-5 rounded-xl hover:bg-green-600 hover:text-white transition">
              Log in
            </button>
          </Link>

          <Link to="/signin">
            <button className="bg-green-400 text-lg py-2 px-5 rounded-xl hover:bg-green-600 hover:text-white transition">
              Sign in
            </button>
          </Link>
        </div>
      )}

      {token && (
        <button
          className="bg-red-400 text-lg py-2 px-5 rounded-xl hover:bg-red-600 hover:text-white transition"
          onClick={logout}
        >
          Log out
        </button>
      )}
    </nav>
  );
};
