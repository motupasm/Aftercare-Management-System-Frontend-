import React from "react";
import "./styles.css";

const Card = ({ image, icon, title, tag, description, days, grades }) => {
  return (
    <>
      <div className="card">
        <img src={image} alt="" className="activity-image" />
        <div className="card-tag">Creative</div>
        <div className="card-information">
          <div className="infor-header">
            <img src={icon} alt="" className="icon" />
            <h1>{title}</h1>
          </div>

          <p>{description}</p>
          <hr />
          <div className="footer-card-infor">
            <p className="day">{days}</p> <p className="grade">{grades}</p>
          </div>
        </div>
      </div>
    </>
  );
};
const Activities = () => {
  return (
    <>
      <div className="activities-container">
        <div className="tag" id="activities">
          OUR PROGRAMS
        </div>
        <h1 className="header">Enrichment Activities</h1>
        <p className="subheader">
          A balance program of creative, physical, academic, and exploratory
          activities designed to engage every child.
        </p>
        <div className="activities-cards-container">
          <Card
            image="/art&crafts.jfif"
            icon="/paint.png"
            title="Art & Crafts"
            tag=""
            description="Creative expression through painting, drawing, sculpure, and
                mixed media projects that develop fine motor skills and artistic
                confidence."
            days="Wed & Fri"
            grades="Grades 2-5"
          />
          <Card
            image="/sports.jfif"
            icon="/trophy.png"
            title="Sports & Fitness"
            tag=""
            description="Team sports, relay games, and 
            fitness activities that build coordination, 
            teamwork, and healthy habits in fun, supportive setting."
            days="Tue & Thur"
            grades="Grades K-5"
          />
          <Card
            image="/stemexplorer.jfif"
            icon="/science.png"
            title="STEM Explorer"
            tag=""
            description="Hand-on science experiments, coding basics, and 
            engineer challenges that spark curiosity and develop 
            critical thinking skills"
            days="Wed & Fri"
            grades="Grades 2-5"
          />
          <Card
            image="/reading-club.jfif"
            icon="/book.png"
            title="Reading Club"
            tag=""
            description="Guided reading sessions, storytelling, and
             book discussions that cultivate literacy skills
              and a lifelong love of reading."
            days="Daily"
            grades="Grades K-5"
          />
        </div>
      </div>
    </>
  );
};

export default Activities;
