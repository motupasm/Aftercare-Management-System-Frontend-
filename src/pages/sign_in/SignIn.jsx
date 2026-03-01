import React, { useState } from "react";
import "./styles.css";
import { Link, redirect, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleOnChangeLogin = (e) => {
    (setLoginForm({ ...loginForm, [e.target.name]: e.target.value }),
      setErrors({ ...errors, [e.target.name]: "" }));
  };

  const BASE_URL = "https://brightpath-b10e.onrender.com/api/";

  const validate = () => {
    newError = {};

    if (signUpForm.email && loginForm.password) {
    }

    setErrors(newError);
    Object.keys.newError === 0;
  };

  const handleOnSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });

    const data = await res.json();
    localStorage.setItem("user_data", data.is_staff);

    if (!res.ok) {
      console.log("Login Failed");
    } else {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      console.log(data.access);
    }

    if (data.is_staff) {
      navigate("/admin");
    } else if (data.status === "Approved") {
      navigate("/parents-dashboard");
    } else {
      navigate("/pending-review");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="headers">
          <h1 className="">Account Login</h1>
          <p>Enter your credentials to access your dashboard.</p>
        </div>
        <hr />
        <form onSubmit={handleOnSubmitLogin}>
          {errors.email && <p>{errors.email}</p>}
          <label>
            Email{" "}
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              required
              onChange={handleOnChangeLogin}
            />
          </label>

          <label>
            Password{" "}
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleOnChangeLogin}
            />
          </label>
          <div className="form-footer">
            <Link to="/sign-up">
              <p className="already-have-acc">Sign Up</p>
            </Link>
            {/* <Link to="/login">
              <p className="already-have-acc">Forgot password?</p>
            </Link> */}
          </div>

          <button disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="loaders">
                  <span className="spinner"></span>
                  Signing you in...
                </div>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
