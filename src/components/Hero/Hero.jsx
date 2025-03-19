import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import HeroImage from "../../assets/hero-image.jpg";

const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div className="hero-card" whileHover={{ scale: 1.05 }}>
        <motion.h1
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          L'alternance n'a jamais été aussi proche avec Pass'Alternance
        </motion.h1>
        <p>VICTOR MARLINA</p>
      </motion.div>

      <motion.div
        className="hero-image-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={HeroImage}
          alt="Illustration"
          className="hero-image"
          initial={{ y: -400, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
