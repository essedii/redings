import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData, username }));
      console.log("token", userData.token);
      console.log("username", userData.username);
      setUsername("");
      setPassword("");

      localStorage.setItem("username", userData.username);
      localStorage.setItem("token", userData.token);
      //   localStorage.setItem('user', username)
      //   localStorage.setItem('userId', userData.userId)

      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUsernameInput = (e) => setUsername(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div
      className=" d-flex align-items-center flex-column "
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <div
        className="mt-5 mb-3"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <h1>REDINGS</h1>
      </div>

      <div
        className="container d-flex flex-column justify-content-center"
        style={{ width: "20rem", backgroundColor: "white" }}
      >
        <form autoComplete="off">
          <label className="form-label mt-3" htmlFor="username">
            Username:
          </label>
          <input
            className="form-control mb-3"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUsernameInput}
            autoComplete="off"
            required
          />

          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-control mb-3"
            type="password"
            id="password"
            onChange={handlePasswordInput}
            value={password}
            required
          />
          <div className="d-flex flex-column justify-content-center">
            <button
              className="btn btn-sm btn-primary mb-5 mt-2"
              type="button"
              onClick={handleSubmit}
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mb-3">
          Don't have an account? <a href="/register">Signup</a>{" "}
        </p>
      </div>
    </div>
  );

  return content;
};
export default Login;
