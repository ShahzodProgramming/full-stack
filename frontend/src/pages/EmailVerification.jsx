import React, { useState } from "react";
import { Navbar } from "../components/Navbar";

export const EmailVerification = () => {
  return (
    <div className="w-full">
      <Navbar />
      <h1 className="text-4xl text-blue-400 text-center mt-20 max-w-2xl mx-auto">
        A verificaton letter was sent to your email address
      </h1>
    </div>
  );
};
