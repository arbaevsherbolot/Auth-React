import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.scss";

const Login = () => {
  document.title = "Test Auth | Login";

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [userStatus, setUserStatus] = useState(false);

  const handleChangeUsername = (e) => {
    setData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const [user, setUser] = useState([{}]);

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

  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${server_url}/login`, data);

      const new_user = result.data.data;
      const token = result.data.token;

      const authStatus = result.data.auth;

      if (authStatus === true) {
        setUserStatus(true);
        localStorage.setItem("token", token);
        localStorage.setItem("username", new_user[0].username);
        localStorage.setItem("email", new_user[0].email);
      } else {
        setUserStatus(false);
        localStorage.setItem("token", null);
        localStorage.setItem("username", null);
        localStorage.setItem("email", null);
      }

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
        {userStatus ? (
          navigate("/")
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
