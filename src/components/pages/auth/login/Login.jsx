import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.scss";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState([{}]);

  const [reply, setReply] = useState({
    message: "",
    error: "",
  });

  const handleChangeUsername = (e) => {
    setData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    setData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const server_url = "https://auth-node.up.railway.app/auth";

  const notifySuccess = () => {
    return toast.success("User is successfully logged in!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyError = () => {
    return toast.error("Incorrect username or password!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${server_url}/login`, data);
      const new_user = result.data.data;

      setUser(new_user);

      notifySuccess();

      setData((prev) => ({
        ...prev,
        username: "",
        password: "",
      }));
    } catch {
      notifyError();
    }
  };

  return (
    <>
      <div className={styles.page}>
        {user[0].username && user[0].email ? (
          <div className={styles.profile}>
            <p className={styles.username}>Welcome {user[0].username}!</p>
            <p className={styles.email}>{user[0].email}</p>
          </div>
        ) : (
          <form onSubmit={sendData} className={styles.form}>
            <input
              required
              type="text"
              value={data.username}
              placeholder="Username"
              onChange={handleChangeUsername}
              className={styles.input}
            />

            <input
              required
              type="text"
              value={data.password}
              placeholder="Password"
              onChange={handleChangePassword}
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Login
            </button>

            <Link className={styles.link} to="/register">
              Do not have an account? <span>Register</span>
            </Link>
          </form>
        )}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Login;
