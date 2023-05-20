import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import show_icon from "../../../../assets/svg/show.svg";
import styles from "./Login.module.scss";

const Login = () => {
  document.title = "Login";

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const password_toggle = () => {
    setShowPassword(!showPassword);
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
      theme: "dark",
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
      theme: "dark",
    });
  };

  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    try {
      if (!validateUsername(data.username)) {
        notifyError("Invalid Username!");
      } else {
        await axios.post(`${server_url}/login`, data).then((res) => {
          if (res.data.auth === true) {
            console.log(res.data);

            notifySuccess();

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
      }
    } catch {
      notifyError();
    }
  };

  const validateUsername = (username) => {
    const regex = /^[\w\s]{2,30}$/;
    return regex.test(username);
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

          <div className={styles.password_wrapper}>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={data.password}
              placeholder="Password"
              onChange={handleChangePassword}
              className={styles.input}
            />

            <img
              src={show_icon}
              alt="password-icon"
              className={styles.password_btn}
              onClick={password_toggle}
            />
          </div>

          <button type="submit" className={styles.button}>
            Log In
          </button>

          <Link className={styles.link} to="/register">
            Do not have an account? <span>Register</span>
          </Link>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
