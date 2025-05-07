import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; //hook: used to dispatch the needed actions
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import "./Auth.css";
import { signup, login } from "../../actions/auth";
function Auth() {
  const [isSignup, setIsSignup] = useState(false); //isSignup: have you done the signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the email and password from going to url
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate)); //signup is from action
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };
  const theme = useSelector((state) => state.themeReducer);
  return (
    <section
      className="auth-section"
      style={{
        backgroundColor: !theme && "#313030",
        color: !theme && "#e6e8eb",
      }}
    >
      {isSignup && <AboutAuth />}
      <div className="auth-container">
        {!isSignup && (
          <img src={icon} alt="stack-overflow" className="login-logo" />
        )}

        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: !theme && "#222121" }}
        >
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forget password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isSignup && (
              <p
                style={{
                  color: theme ? "#666737" : "#e6e8eb",
                  fontSize: "13px",
                }}
              >
                Passwords must contain atleast eight <br /> characters including
                atleast 1 letter and 1 <br /> number.
              </p>
            )}
          </label>
          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" name="check" id="check" />
              <p style={{ fontSize: "13px" }}>
                Opt-in to receive occasional
                <br /> product updates, user research invitations,
                <br /> company announcements and digest.
              </p>
            </label>
          )}
          <button className="auth-btn">{isSignup ? "Signup" : "Login"}</button>
          {isSignup && (
            <p
              style={{ color: theme ? "#666737" : "#e6e8eb", fontSize: "13px" }}
            >
              By clicking "Sign-up" you agree to our{" "}
              <span style={{ color: "#007ac6" }}>
                terms of <br />
                service
              </span>
              , <span style={{ color: "#007ac6" }}>
                privacy policy
              </span> and{" "}
              <span style={{ color: "#007ac6" }}>cookie policy</span>.
            </p>
          )}
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log-In" : "Sign-up"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
