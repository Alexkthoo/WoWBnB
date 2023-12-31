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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log(errors.credential);
        }
      });
  };

  const handleLogInDemo = (e) => {
    e.preventDefault();
    const demoAcc = "Sylvanas_Windrunner";
    const demoPassword = "password";
    return dispatch(
      sessionActions.login({ credential: demoAcc, password: demoPassword })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const disabledTextColor = "white";
  const disabledBgColor = "grey";
  const enabledTextColor = "#efd213";
  const enabledBgColor = "#104789";

  // disable login if username has less than 4 char and password less than 6 char
  const disableLogIn = credential.length < 4 || password.length < 6;

  return (
    // login
    <div className="login-container">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="username-fill-form">
          <label>Username or Email</label>
          <label>
            <input
              placeholder="Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="password-fill-form">
          <label className="password-form">Password</label>
          <label>
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {errors.credential && <p>{errors.credential}</p>}
        <div className="login-buttons-container">
          <button
            className="log-in-button"
            type="submit"
            disabled={disableLogIn}
            style={{
              color: disableLogIn ? disabledTextColor : enabledTextColor,
              backgroundColor: disableLogIn ? disabledBgColor : enabledBgColor,
            }}
          >
            Log In
          </button>
          <button className="demo-button" onClick={handleLogInDemo}>
            Log in as Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
