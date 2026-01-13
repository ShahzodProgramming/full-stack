import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sign } from "./pages/Sign";

export const AppRouter = () => {
  return (
    <div className="max-w-6xl w-[90%] flex flex-col items-center mx-auto mt-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
      </Routes>
    </div>
  );
};
