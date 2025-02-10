import React from "react";
import Hero from "../components/Hero/Hero";
import APropos from "../components/APropos/APropos";
import HowTo from "../components/HowTo/HowTo";
import Testimonials from "../components/Testimonials/Testimonials";
import ContactUs from "../components/ContactUs/ContactUs";

function HomePage() {
  return (
    <div className="homepage">
      <Hero />
      <APropos />
      <HowTo />
      <Testimonials />
      <ContactUs />
    </div>
  );
}

export default HomePage;
