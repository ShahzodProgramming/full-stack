import React from "react";
import { Navbar } from "./components/Navbar";
import { Router } from "react-router-dom";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
