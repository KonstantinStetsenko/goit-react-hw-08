import React from "react";
import { Link } from "react-router-dom";
import css from "./Navigation.module.css";
const Navigation = () => {
  return (
    <div>
      <ul className={css.listMenu}>
        <li className={css.listItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={css.listItem}>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
