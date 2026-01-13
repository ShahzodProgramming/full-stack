import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const Sign = () => {
  const navigate = useNavigate();
  const signin = useAuthStore((state) => state.signin);

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signin(
      usernameInput,
      passwordInput,
      emailInput,
      navigate
    );

    console.log("Registered successfully", response);
  };
  return (
    <div className="w-full">
      <Navbar />

      <form
        className="mx-auto max-w-2xl w-[90%] border-2 border-green-500 mt-20 flex flex-col items-center rounded py-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl">Sign in</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-[90%] mx-auto border border-green-800 p-3 mt-10 rounded focus:bg-green-100 transition"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-[90%] mx-auto border border-green-800 p-3 mt-3 rounded focus:bg-green-100 transition"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-[90%] mx-auto border border-green-800 p-3 mt-3 rounded focus:bg-green-100 transition"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />

        <button className="bg-green-400 mt-10 px-5 py-2 rounded w-[50%] hover:text-white hover:bg-green-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};
