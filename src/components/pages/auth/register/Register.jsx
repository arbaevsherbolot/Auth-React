import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.scss";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChangeUsername = (e) => {
    setData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleChangeEmail = (e) => {
    setData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    setData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const server_url = "https://auth-node.up.railway.app/auth";
  const navigate = useNavigate();

  const notifyError = () => {
    return toast.error("Username already exists!", {
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
      await axios.post(`${server_url}/register`, data);

      setData((prev) => ({
        ...prev,
        username: "",
        email: "",
        password: "",
      }));

      navigate("/login");
    } catch {
      notifyError();
    }
  };

  return (
    <>
      <div className={styles.page}>
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
            value={data.email}
            placeholder="Email"
            onChange={handleChangeEmail}
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
            Register
          </button>

          <Link className={styles.link} to="/login">
            Already have an account? <span>Login</span>
          </Link>
        </form>

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

export default Register;
