import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";

import styles from "./Home.module.scss";

const Home = () => {
  document.title = "Home";

  const auth = useAuthUser();
  const signOut = useSignOut();

  const HandleSignOut = () => {
    signOut();
  };

  return (
    <>
      {auth() ? (
        <div className={styles.profile}>
          <h1 className={styles.username}>Hello {auth().username}!</h1>
          <p className={styles.email}>{auth().email}</p>

          <button className={styles.btn} onClick={HandleSignOut}>
            Sign Out
          </button>
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
