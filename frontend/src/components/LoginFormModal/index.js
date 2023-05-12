// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // const demoUser = "Demo-lition"
  // const demoPass = "password"

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.demoLogin("Demo-lition", "password"))
      .then(closeModal)
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-email">
        <label>
          Username or Email
          <div className="username-input">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          </div>
        </label>
        </div>
        <div className="password">
        <label>
          Password
          <div className="password-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
        </label>
        </div>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div className="log-in-button">
        <button type="submit" disabled={credential.length < 4 || password.length < 6 ? true : false}>Log In</button>
        </div>
      </form>
      <div className="demo-button">
      <button type="submit"
      onClick={handleDemoSubmit}>Demo User Login</button>
      </div>
    </>
  );
}

export default LoginFormModal;
