import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/login/Login";
import Register from "../../pages/auth//register/Register";
import Home from "../../pages/home/Home";

export const Main = () => {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </>
  );
};
