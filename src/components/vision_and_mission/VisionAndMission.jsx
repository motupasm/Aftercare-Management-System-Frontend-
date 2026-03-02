import React from "react";
import "./styles.css";
const VisionAndMission = () => {
  return (
    <>
      <div className="visionandmission-container">
        <div className="tag" id="vision">
          WHO ARE WE
        </div>
        <h1 className="header">Our Mission & Vision</h1>
        <p className="subheader">
          Guided by purpose , driven by care. Learn about the principles that
          shape everything we do at BrightPath
        </p>
        <div className="visionandmission-cards">
          <div className="card">
            <img src="/target.png" alt="" />
            <h1>Our Mission</h1>
            <hr />
            <p>
              To provide a safe, nurturing and simulating after-school
              environment where every child has opotunity to learn, grow , and
              develop essential life skill. We are comminted to supporting
              academic success while fastering creativity, physical activity,
              and social-emotional development.
              <br />
              <br />
              Through structure programming and caring supervision, we bridge
              the gap between the school day and home, giving parents peace of
              mind and children a place of thrive.
            </p>
          </div>
          <div className="card">
            <img src="/eye.png" alt="" />
            <h1>Our Mission</h1>
            <hr />
            <p>
              To be the most trusted impactful after-school care provider in our
              community, recognized for cultivatng confident, curious and
              compassinate young learners who are prepared for future success.
              <br />
              <br />
              We envision a world where every child, regardless of bakcground,
              has access to enriching after-school experience that inspire a
              lifelong love of learning and personal growth.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionAndMission;
