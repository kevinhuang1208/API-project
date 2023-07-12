// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="signUpFormDiv">
      <div className="signUpText">Sign Up</div>
      <form id='signUpForm' onSubmit={handleSubmit}>
        <label>
          Email
          <div className="email-input">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          </div>
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <div className="user-input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
          </div>
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <div className="first-name-input">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
          </div>
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <div className="last-name-input">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
          </div>
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <div className="pass-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          </div>
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <div className="confirm-pass-input">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
          </div>
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={!email || !username || !firstName || !lastName || !password || !confirmPassword || username.length < 4 || password.length < 6 ? true : false}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
