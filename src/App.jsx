import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import ChooseUs from "./components/choose_us/ChooseUs";
import VisionAndMission from "./components/vision_and_mission/VisionAndMission";
import Activities from "./components/activities/Activities";
import Pricing from "./components/pricing/Pricing";
import Cta from "./components/cta/Cta";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ChooseUs />
      <VisionAndMission />
      <Activities />
      <Pricing />
      <Cta />
      <Footer />
    </>
  );
}

export default App;
