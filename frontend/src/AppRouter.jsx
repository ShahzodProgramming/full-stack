import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sign } from "./pages/Sign";
import { Posts } from "./pages/Posts/Posts";
import { CreatePosts } from "./pages/Posts/CreatePosts";
import { EditPosts } from "./pages/Posts/EditPosts";
import { EmailVerification } from "./pages/EmailVerification";
import { EmailVerificationFinal } from "./pages/Posts/EmailVerificationFinal";
import CategoryPost from "./pages/Posts/CategoryPost";
import { FavouritePost } from "./pages/Posts/FavouritePost";

export const AppRouter = () => {
  return (
    <div className="max-w-6xl w-[90%] flex flex-col items-center mx-auto mt-10 mb-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route
          path="/email-verification-next"
          element={<EmailVerificationFinal />}
        />

        <Route path="/post">
          <Route path="" element={<Posts />} />
          <Route path="create" element={<CreatePosts />} />
          <Route path="edit/:postId" element={<EditPosts />} />
          <Route path="category/:category" element={<CategoryPost />} />
          <Route path="favourite" element={<FavouritePost />} />
        </Route>
      </Routes>
    </div>
  );
};
