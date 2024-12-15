import React from "react";
import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";
const AuthNav = () => {
  return (
      <div >
      <ul className={css.listMenu}>
        <li className={css.listItem}>
          <Link to="/register">Register</Link>
        </li>
        <li className={css.listItem}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
