import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Demo from "./Pages/Demo/Demo";
import Seller from "./Pages/Seller/Seller";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
        <Route path="/seller" element={<Seller />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
