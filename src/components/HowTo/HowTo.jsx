import React from "react";
import { motion } from "framer-motion";
import "./HowTo.css";

const HowTo = () => {
  return (
    <div className="howto-container">
      <h1 className="howto-title">
        Pass'Alternance en 3 étapes simples et rapides !
      </h1>
      <h2 className="howto-subtitle">
        Trouvez une alternance rapidement et partagez les offres libérées ! 🚀
      </h2>

      <div className="howto-steps">
        <div className="steps">
          {[
            {
              number: "1",
              title: "Inscrivez-vous",
              description:
                "Créez votre compte en quelques clics pour accéder aux opportunités.",
            },
            {
              number: "2",
              title: "Accédez aux offres",
              description:
                "Consultez les offres disponibles et postulez en un clic.",
            },
            {
              number: "3",
              title: "Partagez une offre",
              description:
                "Aidez d’autres étudiants en partageant les opportunités que vous libérez.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.number}
              className="howto-step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: index * 0.3, ease: "easeOut" }}
            >
              <div className="howto-step">
                <div className="howto-step-number">{step.number}</div>
                <div className="howto-step-content">
                  <h3 className="howto-step-title">{step.title}</h3>
                  <p className="howto-step-description">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="howto-buttons">
        <button className="howto-button">Je cherche une alternance</button>
        <button className="howto-button">Je publie une offre</button>
      </div>
    </div>
  );
};

export default HowTo;
