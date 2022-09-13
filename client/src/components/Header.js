import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="Header" style={{ backgroundColor: "red" }}>
      <h1>Redux Blog</h1>
      <nav>
        <ul style={{ color: "white" }}>
          <li>
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="listing" style={{ color: "white" }}>
              Post
            </Link>
          </li>
          <li>
            <Link to="user" style={{ color: "white" }}>
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
