import React, { useState } from "react";
import "./../../assets/scss/authenticate.scss";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import loginImage from "../../assets/images/logos/images/augmented-reality-6031566-4991337.webp";
import titleImage from "../../assets/images/logos/images/Logo_2-removebg-preview.png";
import Header from "../../layouts/Header";

const Authenticate = () => {
  const [active, setActive] = useState("login");

  const handleChange = () => {
    setActive(active === "login" ? "signup" : "login");
  };

  return (
      <div className="authenticate">
        <div className="auth__left">
          <img className="title-image"
            src={titleImage}
            alt=""
          />
          <img className="login-vector"
            src={loginImage}
            alt=""
          />
        </div>
        <div className="auth__right">
          {active === "login" ? <Login /> : <Signup />}

          <div className="auth__more">
            <span>
              {active === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={handleChange}>Sign Up</button>
                </>
              ) : (
                <>
                  Have an account? <button onClick={handleChange}>Log in</button>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
  );
}

export default Authenticate;
