import React from "react";
import "./styles.css";
const ChooseUs = () => {
  return (
    <>
      <div className="chooseus-wrapper">
        <div className="choooseus-container">
          <div className="tag">WHY CHOOSE US</div>
          <h1 className="header">Everything Your child Needs to Thrive</h1>
          <p className="subheader">
            Our comprehensive program is built around four pillars that ensure
            your child's safety , growth and happiness every single day.
          </p>
          <ul className="chooseus-cards">
            <li className="card">
              <img src="/shield.png" alt="" />
              <h1>Safe Environment</h1>
              <hr />
              <p>
                Fully supervised, secure facility with trained staff and strict
                safety protocols for every child
              </p>
            </li>
            <li className="card">
              <img src="/book.png" alt="" />
              <h1>Homework Support</h1>
              <hr />
              <p>
                Dedicated quiet time with tutoring assistance to help students
                complete assignments effectively
              </p>
            </li>

            <li className="card">
              <img src="/people.png" alt="" />
              <h1>Enrichment Activities</h1>
              <hr />
              <p>
                Arts , sports , STEM , and reading programs designed to inspire
                creativity and growth.
              </p>
            </li>
            <li className="card">
              <img src="/clock.png" alt="" />
              <h1>Flexible Hours</h1>
              <hr />
              <p>
                Convinient after-school hours with option saturday sessions to
                fit your family's schedule
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChooseUs;
