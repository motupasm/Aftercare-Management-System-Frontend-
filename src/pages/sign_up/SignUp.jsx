import React, { useState } from "react";
import "./styles.css";

import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [signUpForm, setSignUpForm] = useState({
    full_name: "",
    email: "",
    username: "",
    phone_number: "",
    password: "",
    password2: "",
    registration_form: null,
  });

  const BASE_URL = "https://brightpath-b10e.onrender.com/api/";

  const navigate = useNavigate();

  const handleOnChangeSignUpForm = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    console.log(e.target.type, value);

    setSignUpForm({ ...signUpForm, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    newError = {};

    if (!signUpForm.email.trim) {
    }
    if (signUpForm.password.trim() < 8) {
      newError = "passoword must be atleast 8 characters";
    }
    if (signUpForm.password2 & (signUpForm.password2 !== signUpForm.password)) {
      newError = "Passwords do not match.";
    }

    setErrors(newError);
    Object.keys.newError === 0;
  };

  const handleSubmitSignUpForm = async (e) => {
    if (!validate) return;

    const formData = new FormData();
    formData.append("full_name", signUpForm.full_name);
    formData.append("email", signUpForm.email);
    formData.append("phone_number", signUpForm.phone_number);
    formData.append("password", signUpForm.password);
    formData.append("registration_form", signUpForm.registration_form);
    formData.append("username", signUpForm.username);

    e.preventDefault();

    setIsLoading(true);

    const res = await fetch(`${BASE_URL}register/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log({ "signup data": data });

    if (!res.ok) {
      setErrors(data);
    } else {
      navigate("/pending-review");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="headers">
          <h1 className="">Create Parent Account</h1>
          <p>Register to access your child’s daycare portal.</p>
        </div>
        <hr />
        <form onSubmit={handleSubmitSignUpForm}>
          <div className="top-headers">
            <label>
              Full Name{" "}
              <input
                type="text"
                placeholder="Full Name"
                name="full_name"
                onChange={handleOnChangeSignUpForm}
              />
            </label>
            <label>
              Email{" "}
              <input
                type="email"
                placeholder="example@gmail.com"
                name="email"
                onChange={handleOnChangeSignUpForm}
              />
              {errors.email && <p className="errors">{errors.email}</p>}
            </label>
          </div>
          <label>
            Username{" "}
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleOnChangeSignUpForm}
            />
            {errors.email && <p className="errors">{errors.email}</p>}
          </label>
          <label>
            Phone{" "}
            <input
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              onChange={handleOnChangeSignUpForm}
            />
          </label>
          <label>
            Password{" "}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChangeSignUpForm}
            />
            {errors.password && <p className="errors">{errors.password}</p>}
          </label>
          <label>
            Confirm Password{" "}
            <input
              type="Password"
              placeholder="Confirm Password"
              name="password2"
            />
            {errors.password2 && <p className="errors">{errors.password2}</p>}
          </label>
          <label>
            Upload Registration Form{" "}
            <input
              type="file"
              accept=".pdf"
              name="registration_form"
              onChange={handleOnChangeSignUpForm}
            />
            {errors.registration_form && (
              <p className="errors">{errors.registration_form}</p>
            )}
          </label>
          <div className="top-headers">
            <input type="checkbox" required />{" "}
            <p>I confirm that the information provided is accurate.</p>
          </div>

          <button disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="loaders">
                  <span className="spinner"></span>
                  Creating your account...
                </div>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <Link to="/login">
            <p className="already-have-acc">Already have account?</p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
