import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export const NavProps = ({ home, gallery, pricing, register }) => {
  const [isToggled, setIsToggled] = useState(false);

  const token = localStorage.getItem("access");
  const role_based = localStorage.getItem("user_data");
  return (
    <>
      <div className="navbar-container">
        <Link to="/">
          <div className="navbar-logo">
            <h1>BrightPath</h1>
          </div>
        </Link>
        <ul className="navbar-menu-links">
          <Link to="/">
            <li className="menu-links">{home}</li>
          </Link>
          <Link to="/gallery">
            <li className="menu-links">{gallery}</li>
          </Link>

          <a href="#fees">
            <li className="menu-links">{pricing}</li>
          </a>
          <Link to="/registration">
            <li className="menu-links">{register}</li>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </ul>
        <div
          className="sidebar-toggler-icons"
          onClick={() => setIsToggled(!isToggled)}
        >
          {isToggled ? (
            <img src="/close-menu-icon.png" alt="" />
          ) : (
            <img src="/open-menu-icon.png" alt="" />
          )}
        </div>
      </div>
      <div className={`sidebar-container ${isToggled ? "toggle-sidebar" : ""}`}>
        <ul className="sidebar-menu-links">
          <Link to="/">
            <li className="menu-links">Home</li>
          </Link>
          <hr />
          <Link to="/gallery">
            <li className="menu-links">Gallery</li>
          </Link>
          <hr />

          <a href="#fees">
            <li className="menu-links">Pricing</li>
          </a>
          <hr />
          <Link to="/registration">
            <li className="menu-links">Register</li>
          </Link>
          <hr />
          <Link to="/login">
            <button>Login</button>
          </Link>
        </ul>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <NavProps
        home="Home"
        gallery="Gallery"
        pricing="Pricing"
        register="Register"
      />
    </>
  );
};

export default Navbar;
