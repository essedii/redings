import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { faReact } from "@fortawesome/free-brands-svg-icons";
export const Header = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const URL = "http://localhost:3000";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLocal("out");
    navigate("/");
  };
  const [local, setLocal] = useState("in");
  useEffect(() => {
    token = localStorage.getItem("token");
  }, []);
  //   useEffect(() => {setToken(localStorage.getItem('token'))}, [token]);

  return token ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between mb-5">
      <div
        className="d-flex align-items-center ms-3"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faReact} />
        <h5 className="m-0 ms-2">Redings</h5>
      </div>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03"></div>

      <div className="d-flex">
        <div
          className="me-3"
          onClick={() => {
            navigate("/listings/create");
          }}
        >
          <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faPlus} />
        </div>{" "}
        <div
          className="me-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleLogout();
          }}
        >
          <FontAwesomeIcon className="me-2" icon={faRightFromBracket} />
          Logout
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between mb-5">
      <div
        className="d-flex align-items-center ms-3"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faReact} />
        <h5 className="m-0 ms-2">Redings</h5>
      </div>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03"></div>

      <div>
        <button
          className="btn btn-sm btn-primary me-3"
          style={{ width: "100px" }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-sm btn-outline-primary me-3"
          style={{ width: "100px" }}
          onClick={() => navigate("/register")}
        >
          Signup
        </button>
      </div>
    </nav>
  );
};
