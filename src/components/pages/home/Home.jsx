import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import styles from "./Home.module.scss";

const Home = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const [users, setUsers] = useState([{}]);

  document.title = `Home ${auth() ? " | " + auth().username : ""}`;

  const server_url = import.meta.env.VITE_SERVER_URL;

  const HandleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        await axios.get(server_url).then((result) => {
          setUsers(result.data);
        });
      } catch (err) {
        alert(err.message);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      {auth() ? (
        <div>
          <div className={styles.profile}>
            <img
              src="https://support.signal.org/hc/article_attachments/360083910451/animated-2.gif"
              alt="Icon"
              className={styles.user_img}
            />

            <div className={styles.user_data}>
              <h1 className={styles.username}>{auth().username}</h1>
              <a href={`mailto:${auth().email}`}>
                <p className={styles.email}>{auth().email}</p>
              </a>
            </div>

            <button className={styles.btn} onClick={HandleSignOut}>
              Sign Out
            </button>
          </div>

          <h1 className={styles.title}>All users:</h1>

          {users.map((user, i) => (
            <div className={styles.users} key={i}>
              <h3 className={styles.username}>{user.username}</h3>
              <a href={`mailto:${user.email}`}>
                <p className={styles.email}>{user.email}</p>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.welcome}>
          <h1 className={styles.title}>Welcome!</h1>
        </div>
      )}
    </>
  );
};

export default Home;
