import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Cta = () => {
  return (
    <>
      <div className="cta-container">
        <h1 className="header">
          Ready to Give Your Child the Best After-School Experience?
        </h1>
        <p className="subheader">
          Join hundreds of families whp trust BrightPath Aftercare. Download our
          registration form and secure your child's spot today
        </p>
        <div className="cta-btns">
          <Link to="/registration">
            <button>
              Register Now <img src="/right-arrow-icon.png" alt="" />
            </button>
          </Link>
          <button>Sign up</button>
        </div>
      </div>
    </>
  );
};

export default Cta;
