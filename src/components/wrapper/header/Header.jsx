import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.links}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.link
            }>
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.link
            }>
            Register
          </NavLink>
        </div>
      </div>
    </>
  );
};
