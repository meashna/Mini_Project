import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Demo from "./Pages/Demo/Demo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
