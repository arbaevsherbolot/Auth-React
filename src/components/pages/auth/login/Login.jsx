import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.scss";

const Login = () => {
  document.title = "Login";

  const [data, setData] = useState({
    username: "",
    password: "",
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
    return toast.success("Successfully logged in", {
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

  const notifyError = (msg) => {
    const defaultMessage = "Server temporarily unavailable";

    return toast.error(msg ? `${msg}` : defaultMessage, {
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

  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${server_url}/login`, data).then((res) => {
        if (res.data.auth === true) {
          notifySuccess();

          console.log(res.data);

          setData((prev) => ({
            ...prev,
            username: "",
            password: "",
          }));

          navigate("/");
        } else {
          notifyError(res.data.message);
        }
      });
    } catch {
      notifyError();
    }
  };

  return (
    <>
      <div className={styles.page}>
        <form onSubmit={sendData} className={styles.form}>
          <h3 className={styles.title}>Welcome back! 👋🏻</h3>

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
            Log In
          </button>

          <Link className={styles.link} to="/register">
            Do not have an account? <span>Register</span>
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

export default Login;
