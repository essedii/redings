

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useSignupMutation } from "./authApiSlice";

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [signup, { isLoading }] = useSignupMutation()
  const dispatch = useDispatch()

  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
      e.preventDefault()

      try {
          const userData = await signup({ user, pwd }).unwrap()
          dispatch(setCredentials({ ...userData, user }))
          setUser('')
          setPwd('')
          navigate('/welcome')
      } catch (err) {
          if (!err?.originalStatus) {
              // isLoading: true until timeout occurs
              setErrMsg('No Server Response');
          } else if (err.originalStatus === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.originalStatus === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Signup Failed');
          }
          errRef.current.focus();
      }
  }

  const handleUserInput = (e) => setUser(e.target.value)

  const handlePwdInput = (e) => setPwd(e.target.value)

  const content = isLoading ? <h1>Loading...</h1> : (
      <div className=" d-flex align-items-center flex-column">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

          <h3 className='mb-5'>Create an account</h3>
          <div className="container d-flex justify-content-center">
          <form autoComplete="off" >
              <label  className="form-label" htmlFor="username">Username:</label>
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

              <label  className="form-label" htmlFor="password">Password:</label>
              <input
               className="form-control mb-3"
                  type="password"
                  id="password"
                  onChange={handlePwdInput}
                  value={pwd}
                  required
              />
            <button
              className="btn btn-sm btn-outline-success"
              type="button"
              onClick={handleSubmit}
            >
             Log In
            </button>
          </form>
    
          </div>
          <p className='mt-4'>Already have an account? <a href='/login'>Login</a> </p>
    
      </div>
  )

  return content
}
export default Register