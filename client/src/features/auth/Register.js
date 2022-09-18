import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useSignupMutation } from "./authApiSlice";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await signup({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
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
        setErrMsg("Signup Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div
      className=" d-flex align-items-center flex-column"
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
            value={user}
            onChange={handleUserInput}
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
            onChange={handlePwdInput}
            value={pwd}
            required
          />
          <div className="d-flex flex-column justify-content-center">
            <button
              className="btn btn-sm btn-primary mb-5 mt-2"
              type="button"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mb-3">
          Already have an account? <a href="/login">Login</a>{" "}
        </p>
      </div>
    </div>
  );

  return content;
};
export default Register;
