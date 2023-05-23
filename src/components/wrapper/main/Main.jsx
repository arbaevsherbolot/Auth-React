import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import Login from "../../pages/auth/login/Login";
import Register from "../../pages/auth//register/Register";
import Home from "../../pages/home/Home";

export const Main = () => {
  const auth = useAuthUser();
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={auth() ? null : <Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </>
  );
};
