import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

// Placeholder card components (not yet implemented)
const Card = ({ title, subject, grade, due, note }) => {
  return <></>;
};

const ActivityCard = ({ title, type, days, description, grade }) => {
  return <></>;
};

const BASE_URL = "http://127.0.0.1:8000/api/";

const logout = async () => {
  const refresh = localStorage.getItem("refresh");

  await fetch(`${BASE_URL}logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({ refresh }),
  });

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};

const ParentsDashboard = () => {
  const [tabActive, setTabActive] = useState("dashboard");

  // fetch Activities
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async (e) => {
      const res = await fetch(`${BASE_URL}activities/`);
      const data = await res.json();
      setActivities(data);
    };
    fetchActivities();
  }, []);

  // fetch categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async (e) => {
      const res = await fetch(`${BASE_URL}categories/`);
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // fetch schedules
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async (e) => {
      const res = await fetch(`${BASE_URL}schedules/`);
      const data = await res.json();
      setSchedules(data);
    };

    fetchSchedules();
  }, []);

  // fetch ageGroups
  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    const fetchAgeGroups = async (e) => {
      const res = await fetch(`${BASE_URL}age-groups/`);
      const data = await res.json();
      setAgeGroups(data);
    };

    fetchAgeGroups();
  }, []);

  // list subjects
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubject = async (e) => {
      const res = await fetch(`${BASE_URL}subjects/`);
      const data = await res.json();
      setSubjects(data);
    };

    fetchSubject();
  }, []);

  // list grades
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async (e) => {
      const res = await fetch(`${BASE_URL}grades/`);
      const data = await res.json();
      setGrades(data);
    };

    fetchGrades();
  }, []);

  // fetch announcements
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async (e) => {
      const res = await fetch(`${BASE_URL}announcements/`);
      const data = await res.json();
      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, []);

  // fetch homework
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchHomeworks = async (e) => {
      const res = await fetch(`${BASE_URL}homeworks/`);
      const data = await res.json();
      setHomeworks(data);
    };
    fetchHomeworks();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        {/* Desktop sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-dashboard-header">
            {" "}
            <img src="/person.png" alt="" />
            <h1 className="header">Parents Portal</h1>
          </div>
          <hr />
          <ul className="sidebar-items">
            <li
              onClick={() => setTabActive("dashboard")}
              className={`menu ${tabActive === "dashboard" ? "active" : ""}`}
            >
              <img src="/dashboard.png" alt="" />
              Dashboard
            </li>
            <li
              onClick={() => setTabActive("annou")}
              className={`menu ${tabActive === "annou" ? "active" : ""}`}
            >
              <img src="/speaker-nav.png" alt="" />
              Announcements
            </li>
            <li
              onClick={() => setTabActive("homework")}
              className={`menu ${tabActive === "homework" ? "active" : ""}`}
            >
              <img src="/book1.png" alt="" />
              Homework
            </li>
            <li
              onClick={() => setTabActive("activities")}
              className={`menu ${tabActive === "activities" ? "active" : ""}`}
            >
              <img src="/activities.png" alt="" />
              Activities
            </li>
            <li
              onClick={() => setTabActive("settings")}
              className={`menu ${tabActive === "settings" ? "active" : ""}`}
            >
              <img src="/settings.png" alt="" />
              Settings
            </li>
          </ul>
          <hr />
          <Link to="/">
            <p onClick={logout}>
              <img src="/logout.png" alt="" />
              Logout
            </p>
          </Link>
        </div>

        {/* Dashboard tab */}
        {tabActive === "dashboard" ? (
          <div className="dashboard-content">
            {/* Mobile navbar */}
            <div className="dashboard-navbar">
              <div className="dashboar-dashboard-header">
                <h1 className="header">Parents Portal</h1>
              </div>
              <hr />
              <ul className="dashboar-items">
                <li
                  onClick={() => setTabActive("dashboard")}
                  className={`menu ${tabActive === "dashboard" ? "active" : ""}`}
                >
                  <img src="/dashboard.png" alt="" />
                  Dashboard
                </li>
                <li
                  onClick={() => setTabActive("annou")}
                  className={`menu ${tabActive === "annou" ? "active" : ""}`}
                >
                  <img src="/speaker-nav.png" alt="" />
                  Announcements
                </li>
                <li
                  onClick={() => setTabActive("homework")}
                  className={`menu ${tabActive === "homework" ? "active" : ""}`}
                >
                  <img src="/book1.png" alt="" />
                  Homework
                </li>
                <li
                  onClick={() => setTabActive("activities")}
                  className={`menu ${tabActive === "activities" ? "active" : ""}`}
                >
                  <img src="/activities.png" alt="" />
                  Activities
                </li>
                <li
                  onClick={() => setTabActive("settings")}
                  className={`menu ${tabActive === "settings" ? "active" : ""}`}
                >
                  <img src="/settings.png" alt="" />
                  Settings
                </li>
              </ul>
              <Link to="/">
                <p>
                  <img src="/logout.png" alt="" />
                  Logout
                </p>
              </Link>
            </div>

            <h1>Welkom back , Parent</h1>
            <p>Here's what happening with your child's daycare program</p>

            {/* Summary stat cards */}
            <div className="dashboard-main-cards">
              <div className="card">
                <img src="/speaker.png" alt="" />
                <h1>{announcements.length}</h1>
                <hr />
                <p>Announments</p>
              </div>
              <div className="card">
                <img src="/book.png" alt="" />
                <h1>{homeworks.length}</h1>
                <hr />
                <p>Active Homeworks</p>
              </div>
              <div className="card">
                <img src="/activity-dash.png" alt="" />
                <h1>{activities.length}</h1>
                <hr />
                <p>Activities</p>
              </div>
            </div>

            {/* Recent announcements preview */}
            <ul className="annouments-wrapper">
              <h1 className="quick-action-header">Recent Announments</h1>
              {announcements.map((announcement) => (
                <li className="card" key={announcement.id}>
                  <div className="left-info">
                    <h1>{announcement.title}</h1>
                    <p>Feb 10 , 2026</p>
                  </div>
                  <p className="note">Important</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {/* Announcements tab */}
        {tabActive === "annou" ? (
          <div className="dashboard-content">
            {/* Mobile navbar */}
            <div className="dashboard-navbar">
              <div className="dashboar-dashboard-header">
                <h1 className="header">Parents Portal</h1>
              </div>
              <hr />
              <ul className="dashboar-items">
                <li
                  onClick={() => setTabActive("dashboard")}
                  className={`menu ${tabActive === "dashboard" ? "active" : ""}`}
                >
                  <img src="/dashboard.png" alt="" />
                  Dashboard
                </li>
                <li
                  onClick={() => setTabActive("annou")}
                  className={`menu ${tabActive === "annou" ? "active" : ""}`}
                >
                  <img src="/speaker-nav.png" alt="" />
                  Announcements
                </li>
                <li
                  onClick={() => setTabActive("homework")}
                  className={`menu ${tabActive === "homework" ? "active" : ""}`}
                >
                  <img src="/book1.png" alt="" />
                  Homework
                </li>
                <li
                  onClick={() => setTabActive("activities")}
                  className={`menu ${tabActive === "activities" ? "active" : ""}`}
                >
                  <img src="/activities.png" alt="" />
                  Activities
                </li>
                <li
                  onClick={() => setTabActive("settings")}
                  className={`menu ${tabActive === "settings" ? "active" : ""}`}
                >
                  <img src="/settings.png" alt="" />
                  Settings
                </li>
              </ul>
              <Link to="/">
                <p>
                  <img src="/logout.png" alt="" />
                  Back to Website
                </p>
              </Link>
            </div>

            <div className="content-header">
              <div className="left">
                <h1>Manage Announcements</h1>
                <p>View Announcemnets</p>
              </div>
            </div>

            {/* Announcements list — read only for parents */}
            <div className="homeworks-cards">
              {announcements.length === 0 ? (
                <p className="NoCards">No Announcements</p>
              ) : (
                announcements.map((announcement) => (
                  <div className="card" key={announcement.id}>
                    <img src="/speaker.png" alt="" />
                    <div className="card-infor">
                      <div className="title-actions">
                        <h1 className="title">{announcement.title}</h1>
                      </div>
                      <div className="cat">
                        <p className="due">{announcement.date}</p>
                      </div>
                      <p className="note">{announcement.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Homework tab */}
        {tabActive === "homework" ? (
          <div className="dashboard-content">
            {/* Mobile navbar */}
            <div className="dashboard-navbar">
              <div className="dashboar-dashboard-header">
                <h1 className="header">Parents Portal</h1>
              </div>
              <hr />
              <ul className="dashboar-items">
                <li
                  onClick={() => setTabActive("dashboard")}
                  className={`menu ${tabActive === "dashboard" ? "active" : ""}`}
                >
                  <img src="/dashboard.png" alt="" />
                  Dashboard
                </li>
                <li
                  onClick={() => setTabActive("annou")}
                  className={`menu ${tabActive === "annou" ? "active" : ""}`}
                >
                  <img src="/speaker-nav.png" alt="" />
                  Announcements
                </li>
                <li
                  onClick={() => setTabActive("homework")}
                  className={`menu ${tabActive === "homework" ? "active" : ""}`}
                >
                  <img src="/book1.png" alt="" />
                  Homework
                </li>
                <li
                  onClick={() => setTabActive("activities")}
                  className={`menu ${tabActive === "activities" ? "active" : ""}`}
                >
                  <img src="/activities.png" alt="" />
                  Activities
                </li>
                <li
                  onClick={() => setTabActive("settings")}
                  className={`menu ${tabActive === "settings" ? "active" : ""}`}
                >
                  <img src="/settings.png" alt="" />
                  Settings
                </li>
              </ul>
              <Link to="/">
                <p>
                  <img src="/logout.png" alt="" />
                  Back to Website
                </p>
              </Link>
            </div>

            <div className="content-header">
              <div className="left">
                <h1>Manage Homework</h1>
                <p>View and track homeworks</p>
              </div>
            </div>

            {/* Homework list — read only for parents */}
            <div className="homeworks-cards">
              {homeworks.length === 0 ? (
                <p className="NoCards">No Homeworks</p>
              ) : (
                homeworks.map((homework) => (
                  <div className="card" key={homework.id}>
                    <img src="/book.png" alt="" />
                    <div className="card-infor">
                      <div className="title-actions">
                        <h1 className="title">{homework.title}</h1>
                      </div>
                      {/* Subject badge — colour-coded by subject name */}
                      <div className="cat">
                        <p
                          className={`subject ${
                            homework.subject_name === "Physics"
                              ? "subject_physics"
                              : "" || homework.subject_name === "Mathematics"
                                ? "subject_maths"
                                : "" || homework.subject_name === "Arts"
                                  ? "subject_arts"
                                  : ""
                          }`}
                        >
                          {homework.subject_name}
                        </p>
                        <p className="grade">{homework.grade_name}</p>
                        <p className="due"> Due: {homework.due_date}</p>
                      </div>
                      <p className="note">{homework.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Activities tab */}
        {tabActive === "activities" ? (
          <div className="dashboard-content">
            {/* Mobile navbar */}
            <div className="dashboard-navbar">
              <div className="dashboar-dashboard-header">
                <h1 className="header">Admin Portal</h1>
              </div>
              <hr />
              <ul className="dashboar-items">
                <li
                  onClick={() => setTabActive("dashboard")}
                  className={`menu ${tabActive === "dashboard" ? "active" : ""}`}
                >
                  <img src="/dashboard.png" alt="" />
                  Dashboard
                </li>
                <li
                  onClick={() => setTabActive("annou")}
                  className={`menu ${tabActive === "annou" ? "active" : ""}`}
                >
                  <img src="/speaker-nav.png" alt="" />
                  Announcements
                </li>
                <li
                  onClick={() => setTabActive("homework")}
                  className={`menu ${tabActive === "homework" ? "active" : ""}`}
                >
                  <img src="/book1.png" alt="" />
                  Homework
                </li>
                <li
                  onClick={() => setTabActive("activities")}
                  className={`menu ${tabActive === "activities" ? "active" : ""}`}
                >
                  <img src="/activities.png" alt="" />
                  Activities
                </li>
                <li
                  onClick={() => setTabActive("settings")}
                  className={`menu ${tabActive === "settings" ? "active" : ""}`}
                >
                  <img src="/settings.png" alt="" />
                  Settings
                </li>
              </ul>
              <Link to="/">
                <p>
                  <img src="/logout.png" alt="" />
                  Back to Website
                </p>
              </Link>
            </div>

            <div className="content-header">
              <div className="left">
                <h1>Manage Activities</h1>
                <p>View and track activities</p>
              </div>
            </div>

            {/* Activities list — read only for parents */}
            <div className="activities-cards">
              {activities.length === 0 ? (
                <p className="NoCards">No Activities</p>
              ) : (
                activities.map((act) => (
                  <div className="card" key={act.id}>
                    <div className="top-card-infor">
                      <img src="/book.png" alt="" />
                      <div className="infor">
                        <h1>{act.title}</h1>
                        <div className="middle-inf">
                          {/* Category badge — colour-coded by category name */}
                          <p
                            className={`type ${
                              act.category_name === "Stem"
                                ? "type_stem"
                                : "" || act.category_name === "Creative"
                                  ? "type_creative"
                                  : "" || act.category_name === "Academic"
                                    ? "type_academic"
                                    : "" || act.category_name === "Physical"
                                      ? "type_physical"
                                      : ""
                            }`}
                          >
                            {act.category_name}
                          </p>
                          <p className="day">{act.schedule_name}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <p>{act.description}</p>
                    <p className="grade">{act.grade}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Settings tab — under development */}
        {tabActive === "settings" ? (
          <div className="dashboard-content">
            {/* Mobile navbar */}
            <div className="dashboard-navbar">
              <div className="dashboar-dashboard-header">
                <h1 className="header">Admin Portal</h1>
              </div>
              <hr />
              <ul className="dashboar-items">
                <li
                  onClick={() => setTabActive("dashboard")}
                  className={`menu ${tabActive === "dashboard" ? "active" : ""}`}
                >
                  <img src="/dashboard.png" alt="" />
                  Dashboard
                </li>
                <li
                  onClick={() => setTabActive("homework")}
                  className={`menu ${tabActive === "homework" ? "active" : ""}`}
                >
                  <img src="/book1.png" alt="" />
                  Homework
                </li>
                <li
                  onClick={() => setTabActive("activities")}
                  className={`menu ${tabActive === "activities" ? "active" : ""}`}
                >
                  <img src="/activities.png" alt="" />
                  Activities
                </li>
                <li
                  onClick={() => setTabActive("settings")}
                  className={`menu ${tabActive === "settings" ? "active" : ""}`}
                >
                  <img src="/settings.png" alt="" />
                  Settings
                </li>
              </ul>
              <Link to="/">
                <p>
                  <img src="/logout.png" alt="" />
                  Back to Website
                </p>
              </Link>
            </div>
            <div className="content-header">
              <div className="left">
                <h1>Settings Not Available</h1>
                <p>The settings feature is under development...</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ParentsDashboard;
