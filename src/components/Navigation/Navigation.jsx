import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

console.log(styles);

const Navigation = () => (
  <nav>
    <ul className={styles.list}>
      <li>
        <NavLink to="/" exact activeClassName={styles.link}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies" activeClassName={styles.link}>
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
