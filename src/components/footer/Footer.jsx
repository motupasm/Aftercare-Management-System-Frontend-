import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="footer-container">
          <ul className="items">
            <li>
              <h1>BrightPath</h1>
            </li>
            <li>
              <p className="subheader">
                Providing a safe, nurturing, and enriching after-school
                experience for every child.
              </p>
            </li>
          </ul>
          <ul className="items">
            <span>
              <li>Quick Links</li>
            </span>
            <a href="#home">
              <li>Home</li>
            </a>
            <a href="#vision">
              <li>Mission & Vision</li>
            </a>
            <a href="#activities">
              <li>Activities</li>
            </a>
            <a href="#fees">
              <li>Fees</li>
            </a>
            <Link to="/gallery">
              <li>Gallery</li>
            </Link>
          </ul>
          <ul className="items">
            <span>
              <li>Portals</li>
            </span>
            <li>Parents Portal</li>
            <li>Admin Portal</li>
            <Link to="/registration">
              <li>Registration</li>
            </Link>
          </ul>
          <ul className="items">
            <span>
              <li>Contact Us</li>
            </span>
            <li>
              <img src="/phone.png" alt="" />
              060 777 1984
            </li>
            <li>
              <img src="/email.png" alt="" />
              motupams@gmail.com
            </li>
            <li>
              <img src="/location.png" alt="" />
              123 Learning Lane, phalaborwa
            </li>
          </ul>
        </div>
        <hr />
        <p className="copyrite">
          2026 BrightPath AfterCare. All right reserverd
        </p>
      </div>
    </>
  );
};

export default Footer;
