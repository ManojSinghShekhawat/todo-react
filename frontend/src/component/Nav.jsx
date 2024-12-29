import React from "react";
import { Link } from "react-router-dom";
const Nav = ({ isAuthanticate, handleLogout }) => {
  return (
    <nav>
      <Link className={isAuthanticate ? "view" : ""} to="/register">
        Register
      </Link>
      <Link className={isAuthanticate ? "view" : ""} to="/login">
        Login
      </Link>
      <Link to="/">Home</Link>
      <button className={isAuthanticate ? "" : "view"} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
