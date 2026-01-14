import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sign } from "./pages/Sign";
import { Posts } from "./pages/Posts/Posts";
import { CreatePosts } from "./pages/Posts/CreatePosts";

export const AppRouter = () => {
  return (
    <div className="max-w-6xl w-[90%] flex flex-col items-center mx-auto mt-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/post">
          <Route path="" element={<Posts />} />
          <Route path="create" element={<CreatePosts />} />
        </Route>
      </Routes>
    </div>
  );
};
