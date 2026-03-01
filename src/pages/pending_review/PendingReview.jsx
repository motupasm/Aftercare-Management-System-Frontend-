import React, { useState } from "react";
import "./styles.css";

import { Link } from "react-router-dom";

const PendingReview = () => {
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

  const handleOnChangeSignUpForm = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    console.log(e.target.type, value);

    setSignUpForm({ ...signUpForm, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    newError = {};

    if (signUpForm.email) {
    }
    if (signUpForm.password) {
    }
    if (signUpForm.password2 !== signUpForm.password) {
      newError = "Password do not match.";
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

    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log({ "signup data": data });

    if (!res.ok) {
      setErrors(data);
    } else {
      alert("account has been created");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="pending-container">
        <div className="headers">
          <h1 className="">Your registration has been received.</h1>
          <hr />
          <p className="pendingPreview">
            Our daycare administration team will review your application
            shortly. You will gain access to the parent dashboard once your
            account has been approved.
          </p>
        </div>

        <ul className="details">
          <li>
            <img src="/clock.png" alt="" /> -: Review Time : 24–48 hours
          </li>
          <li>
            {" "}
            <img src="/bell.png" alt="" />
            -: Notification : Email confirmation
          </li>
          <li>
            {" "}
            <img src="/phone.png" alt="" />
            -: Need help? Contact support
          </li>
        </ul>
      </div>
    </>
  );
};

export default PendingReview;
