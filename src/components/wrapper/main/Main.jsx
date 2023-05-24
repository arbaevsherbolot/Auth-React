import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import Login from "../../pages/auth/login/Login";
import Register from "../../pages/auth//register/Register";
import Home from "../../pages/home/Home";
import Error from "../../pages/error/Error";

export const Main = () => {
  const auth = useAuthUser();
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={auth() ? <Error /> : <Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Error />} path="*" />
      </Routes>
    </>
  );
};
