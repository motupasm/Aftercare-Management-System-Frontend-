import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero-container" id="home">
        <div className="left-hero-content">
          <p className="tag">AFTER SCHOOL CARE PROGRAM</p>
          <div className="hero-header">
            Where Leaning Continues <br /> After the Bell
          </div>
          <p className="hero-subheader">
            BrightPath Aftercare provides a safe , nurturing space where <br />
            children thrive through homeword support , enrichment activities{" "}
            <br />
            and meaningfull social connections.
          </p>
          <div className="hero-btn">
            <Link to="/registration">
              {" "}
              <button>
                Enroll Your Child <img src="/right-arrow-icon.png" alt="" />
              </button>
            </Link>

            <a href="#activities">
              <button className="explorer-btn">Explore Activities</button>
            </a>
          </div>
        </div>
        <img src="/hero.jfif" alt="" className="hero-image" />
      </div>
    </>
  );
};

export default Hero;
