import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const server_url = "https://auth-node.up.railway.app/auth";

  useEffect(() => {
    const getUserProfile = async () => {
      await axios
        .get(`${server_url}/profile`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
        });
    };

    getUserProfile();
  }, []);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <>
      <h1>Welcome {username}!</h1>
      <p>{email}</p>
    </>
  );
};

export default Home;
