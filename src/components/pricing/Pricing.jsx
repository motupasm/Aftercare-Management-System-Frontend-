import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
const Pricing = () => {
  return (
    <>
      <div className="pricing-container">
        <div className="tag" id="fees">
          PRICING
        </div>
        <h1 className="header">Simple , Transparent Fees</h1>
        <p className="subheader">
          Choose the plan than works best for your family. All plans include our
          full enrichment program.
        </p>

        <div className="pricing-cards">
          <div className="card">
            <h1 className="card-header">3-Days plan</h1>
            <div className="price-container">
              <h1 className="price">R250</h1>
              <p className="period">/month</p>
            </div>
            <p>
              Perfect for families who need part-time <br />
              care
            </p>
            <ul>
              <li>
                <img src="/tick.png" alt="" />3 days per week (Mon/Wed/Fri)
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Homework assistance
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Snack included
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Parents portal access
              </li>
            </ul>
            <Link to="/registration">
              <button>Get Started</button>
            </Link>
          </div>
          <div className="card">
            <h1 className="card-header">5-Days plan</h1>
            <div className="price-container">
              <h1 className="price">R400</h1>
              <p className="period">/month</p>
            </div>
            <p>Our most popular full-week coverage</p>
            <ul>
              <li>
                <img src="/tick.png" alt="" />5 days per week (Mon-Fri)
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Homework assistance
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Snack included
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Parents portal access
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Sartuday sessions included
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Priority enrolment
              </li>
              <div className="tag">Most Popular</div>
            </ul>
            <Link to="/registration">
              <button className="popular">Get Started</button>
            </Link>
          </div>
          <div className="card">
            <h1 className="card-header">Drop-In</h1>
            <div className="price-container">
              <h1 className="price">R150</h1>
              <p className="period">/day</p>
            </div>
            <p>Flexible option for occasional needs</p>
            <ul>
              <li>
                <img src="/tick.png" alt="" />
                Any available day
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Homework assistance
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Snack included
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Access to daily activities
              </li>
              <li>
                <img src="/tick.png" alt="" />
                Subject to availability
              </li>
            </ul>
            <Link className="Link" to="/registration">
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
