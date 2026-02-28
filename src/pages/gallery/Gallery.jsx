import "./styles.css";
import Navbar, { NavProps } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Cta from "../../components/cta/Cta";

const Card = ({ image, title }) => {
  return (
    <>
      <div className="card">
        <img src={image} alt="" />
        <div className="card-opacity"></div>
        <h1>{title}</h1>
      </div>
    </>
  );
};

const Gallery = () => {
  return (
    <>
      <NavProps home="Home" gallery="Gallery" register="Register" />
      <div className="gallery-container">
        <div className="tag" id="fees">
          OUR MOMENTS
        </div>
        <h1 className="header">Photo Gallery</h1>
        <p className="subheader">
          A glimpse into daily joys, activities, and events that make
          BrightPathh special.
        </p>
        <div className="cards-container">
          <Card title="Music Explore" image="/music-explorer.jfif" />
          <Card title="Garden Project" image="/garden-project.jfif" />
          <Card title="Game Afternoon" image="/game-afternoon.jfif" />
          <Card title="Healthy Snack Time" image="/healthy-snack-time.jfif" />
          <Card title="Homework Help" image="/homework-help.jfif" />
          <Card title="Reading Club" image="/reading-club.jfif" />
          <Card title="Sports Day" image="/sports.jfif" />
          <Card title="Stem Explorer" image="/stemexplorer.jfif" />
          <Card title="Talent Show" image="/talent-show.jfif" />
          <Card title="Art & Crafts" image="/art&crafts.jfif" />
        </div>
      </div>

      <Cta />
      <Footer />
    </>
  );
};

export default Gallery;
