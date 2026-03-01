import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Admin = () => {
  const [tabActive, setTabActive] = useState("dashboard");
  const [isActiveCardOpen, setIsActiveCardOpen] = useState(false);
  const [isUpdateActiveCardOpen, setIsUpdateActiveCardOpen] = useState(false);
  const [isHomeworkCardOpen, setIsHomeworkCardOpen] = useState(false);
  const [isUpdateHomeworkCardOpen, setIsUpdateHomeworkCardOpen] =
    useState(false);
  const [isAnnouCardOpen, setIsAnnouCardOpen] = useState(false);
  const [isUpdateAnnouCardOpen, setIsUpdateAnnouCardOpen] = useState(false);
  const [isLoadingStatus, setIsloadingStatus] = useState(false);

  const BASE_URL = "https://brightpath-b10e.onrender.com/api/";

  const token = localStorage.getItem("access");
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

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch(`${BASE_URL}status/`);
      const data = await res.json();
      console.log(data);

      setStatuses(data);
    };
    fetchStatus();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async (e) => {
      const res = await fetch(`${BASE_URL}register/`);
      const data = await res.json();
      setUsers(data);
    };

    fetchUser();
  }, []);

  // handle user approve
  const handleApprove = async (userId, statusName) => {
    setIsloadingStatus(true);
    await fetch(`${BASE_URL}register/${userId}/approve/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: statusName }),
    });
    fetchUser();
  };

  const handleReject = async (userId, statusName) => {
    await fetch(`${BASE_URL}register/${userId}/reject/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: statusName }),
    });
  };

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

  // delete activity
  const handleDeleteActivity = async (id) => {
    try {
      await fetch(`${BASE_URL}activities/${id}/`, {
        method: "DELETE",
      });
      setActivities((prev) =>
        prev.filter((activities) => activities.id !== id),
      );
    } catch (error) {
      console.error("Delete activity failed:", error);
    }
  };

  // update activity
  const [activityId, setActivityId] = useState(null);
  const [editActivityData, setEditActivityData] = useState({
    title: "",
    description: "",
    category: "",
    schedule: "",
    age_group: "",
  });

  const handleOnChangeUpdateActivity = (e) => {
    const { name, value } = e.target;
    // FK fields must be sent as numbers
    if (name === "category" || name === "schedule" || name === "age_group") {
      setEditActivityData({ ...editActivityData, [name]: Number(value) });
    } else {
      setEditActivityData({ ...editActivityData, [name]: value });
    }
  };

  // PATCH the activity and update local state
  const handleupdateActivity = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}activities/${activityId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editActivityData),
    });
    const updatedAtivity = await res.json();

    setActivities((prev) =>
      prev.map((act) => (act.id === updatedAtivity.id ? updatedAtivity : act)),
    );

    setIsUpdateActiveCardOpen(false);
    setActivityId(null);
  };

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
      console.log(data);
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

  // create activity
  const [isLoadingAcitivity, setIsIsLoadingAcitivity] = useState(false);
  const [activityForm, setActivityForm] = useState({
    title: "",
    category: null,
    schedule: null,
    age_group: null,
    description: "",
  });

  // POST new activity; redirect to activities tab on success
  const handleOnSubmitActivity = async (e) => {
    e.preventDefault();

    setIsIsLoadingAcitivity(true);
    const res = await fetch(`${BASE_URL}activities/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activityForm),
    });
    setIsIsLoadingAcitivity(false);

    const data = await res.json();

    if (!res.ok) {
      setErrors(data);
    } else {
      alert("activity created");
      setTabActive("activities");
      setActivityForm({
        title: "",
        category: "",
        schedule: "",
        age_group: "",
        description: "",
      });
    }
  };

  const handleOnChangeActivity = (e) => {
    const { name, value } = e.target;
    // FK fields must be sent as numbers
    if (name === "category" || name === "schedule" || name === "age_group") {
      setActivityForm({ ...activityForm, [name]: Number(value) });
    } else {
      setActivityForm({ ...activityForm, [name]: value });
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // create homework
  const [form, setForm] = useState({
    title: "",
    subject: null,
    grade: null,
    due_date: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // FK fields must be sent as numbers
    if (name === "subject" || name === "grade") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  // POST new homework
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch(`${BASE_URL}homeworks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setIsLoading(false);

    if (!res.ok) {
      setErrors({ details: errors });
    } else {
      alert("Homework has been created");
      setForm({
        title: "",
        subject: "",
        grade: "",
        due_date: "",
        description: "",
      });
    }
  };

  // delete homework
  const handleDeleteHomework = async (id) => {
    try {
      await fetch(`${BASE_URL}homeworks/${id}/`, {
        method: "DELETE",
      });
      setHomeworks((prev) => prev.filter((homeworks) => homeworks.id !== id));
    } catch (error) {
      console.error("Delete homework failed:", error);
    }
  };

  // update homework
  const [homeworkId, setHomeworkId] = useState(null);
  const [homeworkEditData, setHomeworkEditData] = useState({
    title: "",
    subject: "",
    grade: "",
    due_date: "",
    description: "",
  });

  const handleOnChangeEditHomework = (e) => {
    const { name, value } = e.target;
    // FK fields must be sent as numbers
    if (name === "grade" || name === "subject") {
      setHomeworkEditData({ ...homeworkEditData, [name]: Number(value) });
    } else {
      setHomeworkEditData({ ...homeworkEditData, [name]: value });
    }
  };

  // PATCH the homework and update local state
  const handleSubmitUpdatedHomework = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}homeworks/${homeworkId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(homeworkEditData),
    });

    const updatedHomework = await res.json();
    console.log(updatedHomework);

    setHomeworks((prev) =>
      prev.map((homework) =>
        homework.id === updatedHomework.id ? updatedHomework : homework,
      ),
    );
  };

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

  // create announcement
  const [annouForm, setAnnouForm] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleOnChangeAnnouForm = (e) => {
    const { name, value } = e.target;
    setAnnouForm({ ...annouForm, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // POST new announcement
  const handleSubmitAnnouForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}announcements/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(annouForm),
    });
    setIsLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setErrors(data);
    } else {
      alert("annou created");
    }
  };

  // delete announcement
  const handleDeleteAnnouncement = async (id) => {
    try {
      await fetch(`${BASE_URL}announcements/${id}/`, {
        method: "DELETE",
      });
      setAnnouncements((prev) =>
        prev.filter((announcements) => announcements.id !== id),
      );
    } catch (error) {
      console.error("Delete announcement failed:", error);
    }
  };

  // update announcement
  const [annouId, setAnnouId] = useState(null);
  const [annouEditFormData, setAnnouEditFormData] = useState({
    title: "",
    date: "",
    description: "",
  });

  // PATCH the announcement and update local state
  const handleAnnouncementUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}announcements/${annouId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(annouEditFormData),
    });

    const annouUpdatedData = await res.json();

    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === annouUpdatedData.id
          ? annouUpdatedData
          : announcement,
      ),
    );
  };

  const handleOnChangeEditAnnou = (e) =>
    setAnnouEditFormData({
      ...annouEditFormData,
      [e.target.name]: e.target.value,
    });

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

  return (
    <>
      <div className="dashboard-container">
        {/* Desktop sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-dashboard-header">
            <img src="/person.png" alt="" />
            <h1 className="header">Admin Portal</h1>
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
                <img src="/person.png" alt="" />
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

            <h1>Admin Dashboard</h1>
            <p>Manage your aftercare program content and settings</p>

            {/* Summary stat cards */}
            <div className="dashboard-main-cards">
              <div className="card">
                <img src="/people.png" alt="" />
                <h1>{users.length - 1}</h1>
                <hr />
                <p>Total Students</p>
              </div>
              <div className="card">
                <img src="/speaker.png" alt="" />
                <h1>{announcements.length}</h1>
                <hr />
                <p>Announcements</p>
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

            <h1 className="quick-action-header">Quick Actions</h1>

            {/* Shortcut tiles to jump to other tabs */}
            <ul className="quick-actions-container">
              <li className="card" onClick={() => setTabActive("annou")}>
                <div className="left-info">
                  <img src="/speaker-nav.png" alt="" />
                  <div className="card-infor">
                    <h1>Manage Announcements</h1>
                    <p>Add, edit, or remove announcements</p>
                  </div>
                </div>
                <img src="/right-arrow.png" alt="" />
              </li>
              <li className="card" onClick={() => setTabActive("homework")}>
                <div className="left-info">
                  <img src="/book1.png" alt="" />
                  <div className="card-infor">
                    <h1>Manage Homework</h1>
                    <p>Add, edit, or remove homework assignments</p>
                  </div>
                </div>
                <img src="/right-arrow.png" alt="" />
              </li>
              <li className="card" onClick={() => setTabActive("activities")}>
                <div className="left-info">
                  <img src="/activities.png" alt="" />
                  <div className="card-infor">
                    <h1>Manage Activities</h1>
                    <p>Update enrichment activities and schedules</p>
                  </div>
                </div>
                <img src="/right-arrow.png" alt="" />
              </li>
              <li className="card" onClick={() => setTabActive("settings")}>
                <div className="left-info">
                  <img src="/settings.png" alt="" />
                  <div className="card-infor">
                    <h1>Settings</h1>
                    <p>Manage settings.</p>
                  </div>
                </div>
                <img src="/right-arrow.png" alt="" />
              </li>
            </ul>
            <h1 className="quick-action-header">Admin Actions</h1>
            <div className="admin-actions">
              <ul className="headers">
                <li className="header">Full Name</li>
                {/* <li className="header">Form</li> */}
                <li className="header">Phone</li>
                <li className="header">Status</li>
                <li className="header">Date</li>
                <li className="header">Action</li>
              </ul>
              {users.map((user) => (
                <ul className="rows" key={user.id}>
                  <li className="row">{user.full_name}</li>
                  {/* <button className="row">{user.registration_form}</button> */}
                  <li className="row">{user.phone_number}</li>
                  <li
                    className={`status-fields ${user.status === "Approved" ? "approved" : "rejected"}`}
                  >
                    {user.status}
                  </li>
                  <li className="row">{user.date_joined}</li>
                  <li className="row">
                    {user.status === "Pending" || user.status === "Rejected" ? (
                      <button
                        type="sumbit"
                        onClick={() => handleApprove(user.id, "Approved")}
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        type="sumbit"
                        onClick={() => handleReject(user.id, "rejected")}
                      >
                        Reject
                      </button>
                    )}
                  </li>
                </ul>
              ))}
            </div>
            {/* Shortcut tiles to jump to other tabs */}
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
                <img src="/person.png" alt="" />
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
                <h1>Manage Announcements</h1>
                <p>View Announcemnets</p>
              </div>
              <button onClick={() => setIsAnnouCardOpen(!isAnnouCardOpen)}>
                {" "}
                <img src="/add.png" alt="" />
                Add Announcement
              </button>
            </div>

            {/* Add announcement slide-in panel */}
            <div
              className={`add-annou-container ${isAnnouCardOpen ? "annouActive" : ""}`}
            >
              <div className="header-items">
                <h1 className="header">Add Announcement</h1>
                <img
                  src="/close-menu-icon.png"
                  alt=""
                  onClick={() => setIsAnnouCardOpen(!isAnnouCardOpen)}
                />
              </div>
              <form action="" onSubmit={handleSubmitAnnouForm}>
                <label htmlFor="title">
                  Title{" "}
                  <input
                    type="text"
                    placeholder="announcement title"
                    name="title"
                    onChange={handleOnChangeAnnouForm}
                  />
                </label>
                <label htmlFor="date">
                  Date{" "}
                  <input
                    type="date"
                    name="date"
                    id=""
                    onChange={handleOnChangeAnnouForm}
                  />
                </label>
                <label htmlFor="desc">
                  Description{" "}
                  <textarea
                    name="description"
                    id=""
                    placeholder="announcement details..."
                    cols={6}
                    rows={6}
                    onChange={handleOnChangeAnnouForm}
                  ></textarea>
                </label>
                <div className="btns">
                  <button
                    type="button"
                    onClick={() => setIsAnnouCardOpen(!isAnnouCardOpen)}
                  >
                    Cancel
                  </button>{" "}
                  <button disabled={isLoading}>
                    {isLoading ? "Adding Announcement..." : "Add Announcement"}
                  </button>
                </div>
              </form>
            </div>

            {/* Edit announcement slide-in panel */}
            <div
              className={`update-annou-container ${isUpdateAnnouCardOpen ? "annouActive" : ""}`}
            >
              <div className="header-items">
                <h1 className="header">Update Announcement</h1>
                <img
                  src="/close-menu-icon.png"
                  alt=""
                  onClick={() =>
                    setIsUpdateAnnouCardOpen(!isUpdateAnnouCardOpen)
                  }
                />
              </div>
              <form action="" onSubmit={handleAnnouncementUpdate}>
                <label htmlFor="title">
                  Title{" "}
                  <input
                    type="text"
                    placeholder="announcement title"
                    name="title"
                    value={annouEditFormData.title}
                    onChange={handleOnChangeEditAnnou}
                  />
                </label>
                <label htmlFor="date">
                  Date{" "}
                  <input
                    type="date"
                    name="date"
                    id=""
                    value={annouEditFormData.date}
                    onChange={handleOnChangeEditAnnou}
                  />
                </label>
                <label htmlFor="desc">
                  Description{" "}
                  <textarea
                    name="description"
                    value={annouEditFormData.description}
                    placeholder="announcement details..."
                    cols={6}
                    rows={6}
                    onChange={handleOnChangeEditAnnou}
                  ></textarea>
                </label>
                <div className="btns">
                  <button
                    type="button"
                    onClick={() => setIsUpdateAnnouCardOpen(false)}
                  >
                    Cancel
                  </button>{" "}
                  <button onClick={() => setIsUpdateActiveCardOpen(false)}>
                    {isLoading
                      ? "Updating Announcement..."
                      : "Update Announcement"}
                  </button>
                </div>
              </form>
            </div>

            {/* Announcements list */}
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
                        <div className="actions">
                          {/* Open edit panel pre-filled with this announcement's data */}
                          <img
                            src="/edit.png"
                            alt=""
                            title="edit"
                            onClick={() => {
                              setAnnouId(announcement.id);
                              setIsUpdateAnnouCardOpen(true);
                              setAnnouEditFormData({
                                title: announcement.title,
                                date: announcement.date,
                                description: announcement.description,
                              });
                            }}
                          />
                          <img
                            src="/delete.png"
                            alt=""
                            title="delete"
                            onClick={() =>
                              handleDeleteAnnouncement(announcement.id)
                            }
                          />
                        </div>
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
                <img src="/person.png" alt="" />
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
                <h1>Manage Homework</h1>
                <p>Create, edit, and delete homework assignments</p>
              </div>
              <button onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}>
                {" "}
                <img src="/add.png" alt="" />
                Add Homework
              </button>
            </div>

            <div className="homeworks-cards">
              {/* Add homework slide-in panel */}
              <div
                className={`add-activity-container ${isActiveCardOpen ? "cardOpen" : ""}`}
              >
                <div className="header-items">
                  <h1 className="header">Add Homework</h1>
                  <img
                    src="/close-menu-icon.png"
                    alt=""
                    onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}
                  />
                </div>
                <form action="" onSubmit={handleSubmit}>
                  <label htmlFor="title">
                    Title{" "}
                    <input
                      type="text"
                      placeholder="Homework name"
                      name="title"
                      onChange={handleOnChange}
                    />
                  </label>
                  <div className="selectors">
                    <label htmlFor="Subject">
                      Subject{" "}
                      <select
                        name="subject"
                        onChange={handleOnChange}
                        value={form.subject || ""}
                      >
                        <option>Select Subject</option>
                        {subjects.map((sub) => (
                          <option value={sub.id} key={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="Schedule">
                      Grade{" "}
                      <select name="grade" onChange={handleOnChange}>
                        <option value="0">Select Grade</option>
                        {grades.map((grade) => (
                          <option key={grade.id} value={grade.id}>
                            {grade.grade}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label htmlFor="date">
                    Due Date{" "}
                    <input
                      type="date"
                      name="due_date"
                      id=""
                      onChange={handleOnChange}
                    />
                  </label>
                  <label htmlFor="desc">
                    Description{" "}
                    <textarea
                      name="description"
                      id=""
                      placeholder="homework details..."
                      cols={6}
                      rows={6}
                      onChange={handleOnChange}
                    ></textarea>
                  </label>
                  <div className="btns">
                    <button
                      type="button"
                      onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}
                    >
                      Cancel
                    </button>{" "}
                    <button disabled={isLoading}>
                      {isLoading ? "Creating Homework..." : "Add Homework"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Edit homework slide-in panel */}
              <div
                className={`update-activity-container ${isUpdateActiveCardOpen ? "UpdateCardActive" : ""}`}
              >
                <div className="header-items">
                  <h1 className="header">Update Homework</h1>
                  <img
                    src="/close-menu-icon.png"
                    alt=""
                    onClick={() =>
                      setIsUpdateActiveCardOpen(!isUpdateActiveCardOpen)
                    }
                  />
                </div>
                <form action="" onSubmit={handleSubmitUpdatedHomework}>
                  <label htmlFor="title">
                    Title{" "}
                    <input
                      type="text"
                      placeholder="Homework Title"
                      onChange={handleOnChangeEditHomework}
                      name="title"
                      value={homeworkEditData.title}
                    />
                  </label>
                  <div className="selectors">
                    <label htmlFor="Subject">
                      Subject{" "}
                      <select
                        name="subject"
                        onChange={handleOnChangeEditHomework}
                        value={homeworkEditData.subject}
                      >
                        <option>Select Subject</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Grade{" "}
                      <select
                        name="grade"
                        onChange={handleOnChangeEditHomework}
                        value={homeworkEditData.grade}
                      >
                        <option>Select Grade</option>
                        {grades.map((grade) => (
                          <option key={grade.id} value={grade.id}>
                            {grade.grade}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label htmlFor="date">
                    Due Date{" "}
                    <input
                      type="date"
                      name="due_date"
                      value={homeworkEditData.due_date}
                      onChange={handleOnChangeEditHomework}
                    />
                  </label>
                  <label htmlFor="desc">
                    Description{" "}
                    <textarea
                      name="description"
                      id=""
                      placeholder="Homework details..."
                      cols={6}
                      rows={6}
                      onChange={handleOnChangeEditHomework}
                      value={homeworkEditData.description}
                    ></textarea>
                  </label>
                  <div className="btns">
                    <button
                      type="button"
                      onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}
                    >
                      Cancel
                    </button>{" "}
                    <button>Update Homework</button>
                  </div>
                </form>
              </div>

              {/* Homework list */}

              {homeworks.length === 0 ? (
                <p className="NoCards">No Homeworks</p>
              ) : (
                homeworks.map((homework) => (
                  <div className="card" key={homework.id}>
                    <img src="/book.png" alt="" />
                    <div className="card-infor">
                      <div className="title-actions">
                        <h1 className="title">{homework.title}</h1>
                        <div className="actions">
                          {/* Open edit panel pre-filled with this homework's data */}
                          <img
                            src="/edit.png"
                            alt=""
                            title="edit"
                            onClick={() => {
                              setHomeworkId(homework.id);
                              setIsUpdateActiveCardOpen(true);
                              setHomeworkEditData({
                                title: homework.title,
                                subject: homework.subject,
                                grade: homework.grade,
                                due_date: homework.due_date,
                                description: homework.description,
                              });
                            }}
                          />
                          <img
                            src="/delete.png"
                            alt=""
                            title="delete"
                            onClick={() => handleDeleteHomework(homework.id)}
                          />
                        </div>
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
                <img src="/person.png" alt="" />
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
                <p>Create, edit, and delete enrichment activities</p>
              </div>
              <button onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}>
                {" "}
                <img src="/add.png" alt="" />
                Add Activity
              </button>
            </div>

            <div className="activities-cards">
              {/* Add activity slide-in panel */}
              <div
                className={`add-activity-container ${isActiveCardOpen ? "cardOpen" : ""}`}
              >
                <div className="header-items">
                  <h1 className="header">Add Activity</h1>
                  <img
                    src="/close-menu-icon.png"
                    alt=""
                    onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}
                  />
                </div>
                <form action="" onSubmit={handleOnSubmitActivity}>
                  <label htmlFor="title">
                    Title{" "}
                    <input
                      type="text"
                      placeholder="Activity name"
                      name="title"
                      value={activityForm.title}
                      onChange={handleOnChangeActivity}
                    />
                  </label>
                  <div className="selectors">
                    <label htmlFor="Category">
                      Category{" "}
                      <select
                        name="category"
                        value={activityForm.category || ""}
                        onChange={handleOnChangeActivity}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="Schedule">
                      Schedule{" "}
                      <select
                        name="schedule"
                        value={activityForm.schedule || ""}
                        onChange={handleOnChangeActivity}
                      >
                        <option>Select dates</option>
                        {schedules.map((schedule) => (
                          <option key={schedule.id} value={schedule.id}>
                            {schedule.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label htmlFor="Schedule">
                    Age Group{" "}
                    <select
                      name="age_group"
                      value={activityForm.age_group || ""}
                      onChange={handleOnChangeActivity}
                    >
                      <option value="">Select Age Group</option>
                      {ageGroups.map((ageGroup) => (
                        <option key={ageGroup.id} value={ageGroup.id}>
                          {ageGroup.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="desc">
                    Description{" "}
                    <textarea
                      name="description"
                      onChange={handleOnChangeActivity}
                      id=""
                      placeholder="Activity details..."
                      cols={6}
                      rows={6}
                      value={activityForm.description}
                    ></textarea>
                  </label>
                  <div className="btns">
                    <button
                      type="button"
                      onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}
                    >
                      Cancel
                    </button>{" "}
                    <button disabled={isLoadingAcitivity}>
                      {isLoadingAcitivity
                        ? "Creating activity..."
                        : "Add Activity"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Edit activity slide-in panel */}
              <div
                className={`update-activity-container ${isUpdateActiveCardOpen ? "UpdateCardActive" : ""}`}
              >
                <div className="header-items">
                  <h1 className="header">Update Activity</h1>
                  <img
                    src="/close-menu-icon.png"
                    alt=""
                    onClick={() =>
                      setIsUpdateActiveCardOpen(!isUpdateActiveCardOpen)
                    }
                  />
                </div>
                <form action="" onSubmit={handleupdateActivity}>
                  <label htmlFor="title">
                    Title{" "}
                    <input
                      type="text"
                      placeholder="Activity name"
                      name="title"
                      value={editActivityData.title}
                      onChange={handleOnChangeUpdateActivity}
                    />
                  </label>
                  <div className="selectors">
                    <label htmlFor="Category">
                      Category{" "}
                      <select
                        name="category"
                        value={editActivityData.category}
                        onChange={handleOnChangeUpdateActivity}
                      >
                        <option>Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="Schedule">
                      Schedule{" "}
                      <select
                        name="schedule"
                        value={editActivityData.schedule}
                        onChange={handleOnChangeUpdateActivity}
                      >
                        <option>Select dates</option>
                        {schedules.map((schedule) => (
                          <option key={schedule.id} value={schedule.id}>
                            {schedule.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    Age Group{" "}
                    <select
                      name="age_group"
                      value={editActivityData.age_group}
                      onChange={handleOnChangeUpdateActivity}
                    >
                      <option>Select Age Group</option>
                      {ageGroups.map((ageGroup) => (
                        <option key={ageGroup.id} value={ageGroup.id}>
                          {ageGroup.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="desc">
                    Description{" "}
                    <textarea
                      name="description"
                      value={editActivityData.description}
                      onChange={handleOnChangeUpdateActivity}
                      placeholder="Activity details..."
                      cols={6}
                      rows={6}
                    ></textarea>
                  </label>
                  <div className="btns">
                    <button
                      type="button"
                      onClick={() => setIsActiveCardOpen(!isActiveCardOpen)}
                    >
                      Cancel
                    </button>{" "}
                    <button onClick={() => setTabActive("activities")}>
                      Update Activity
                    </button>
                  </div>
                </form>
              </div>

              {/* Activities list */}
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
                      <div className="actions">
                        {/* Open edit panel pre-filled with this activity's data */}
                        <img
                          src="/edit.png"
                          alt=""
                          title="edit"
                          onClick={() => {
                            setActivityId(act.id);
                            setIsUpdateActiveCardOpen(true);
                            setEditActivityData({
                              title: act.title,
                              description: act.description,
                              category: act.category,
                              schedule: act.schedule,
                              age_group: act.age_group,
                            });
                          }}
                        />
                        <img
                          src="/delete.png"
                          alt=""
                          title="delete"
                          onClick={() => handleDeleteActivity(act.id)}
                        />
                      </div>
                    </div>
                    <hr />
                    <p>{act.description}</p>
                    <p className="grade">{act.age_group_name}</p>
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
                <img src="/person.png" alt="" />
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

export default Admin;
