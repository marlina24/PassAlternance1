import React from 'react';
import './Hero.css';
import HeroImage from '../../assets/hero-image.jpg'; // Remplace par ton image réelle

const Hero = () => {
    return (
      <section className="hero">
        <div className="fluid-shape"></div> {/* Shape fluide */}
        <div className="hero-card">
          <h2>QUALITY EDUCATION</h2>
          <h1>L'alternance n'a jamais été aussi proche avec Pass'Alternance</h1>
          <p>Image from Freepik</p>
        </div>
        <div className="hero-image-container">
          <img src={HeroImage} alt="Illustration" className="hero-image" />
        </div>
      </section>
    );
  };
  
  export default Hero;