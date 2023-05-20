import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import show_icon from "../../../../assets/svg/show.svg";
import styles from "./Register.module.scss";

const Register = () => {
  document.title = "Register";

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const password_toggle = () => {
    setShowPassword(!showPassword);
  };

  const server_url = "https://auth-node.up.railway.app/auth";

  const navigate = useNavigate();

  const notifyError = (msg) => {
    return toast.error(`${msg}`, {
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

  const sendData = async (e) => {
    e.preventDefault();

    try {
      if (!validateUsername(data.username)) {
        notifyError("Invalid Username!");
      } else if (!validateEmail(data.email)) {
        notifyError("Invalid Email!");
      } else if (data.password.length < 8) {
        notifyError("Password must be at least 8 characters!");
      } else {
        await axios.post(`${server_url}/register`, data);

        setData((prev) => ({
          ...prev,
          username: "",
          email: "",
          password: "",
        }));

        navigate("/login");
      }
    } catch {
      notifyError("Username already exists!");
    }
  };

  const validateUsername = (username) => {
    const regex = /^[\w\s]{2,30}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  return (
    <>
      <div className={styles.page}>
        <form onSubmit={sendData} className={styles.form}>
          <h3 className={styles.title}>Welcome! 👋🏻</h3>

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
            Sign Up
          </button>

          <Link className={styles.link} to="/login">
            Already have an account? <span>Login</span>
          </Link>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
