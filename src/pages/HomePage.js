import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero/Hero";
import APropos from "../components/APropos/APropos";
import HowTo from "../components/HowTo/HowTo";
import Testimonials from "../components/Testimonials/Testimonials";
import ContactUs from "../components/ContactUs/ContactUs";

function HomePage() {
  return (
    <motion.div
      className="homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />
      <APropos />
      <HowTo />
      <Testimonials />
      <ContactUs />
    </motion.div>
  );
}

export default HomePage;
