import React, { useState } from "react";
import "./Wishes.css";

const Wishes = () => {
  const [wishes, setWishes] = useState(["CDI", "Intérimaire"]);
  const options = ["CDI", "CDD", "Stage", "Alternance", "Intérimaire"];

  const addWish = (event) => {
    const newWish = event.target.value;
    if (newWish && !wishes.includes(newWish)) {
      setWishes([...wishes, newWish]);
    }
  };

  const removeWish = (wish) => {
    setWishes(wishes.filter((item) => item !== wish));
  };

  return (
    <section className="wishes-section">
      <h2>Mes souhaits</h2>
      <div className="wishes-list">
        {wishes.map((wish, index) => (
          <span key={index} className="wish">
            {wish} <button onClick={() => removeWish(wish)}>✖</button>
          </span>
        ))}
      </div>
      <select onChange={addWish} defaultValue="">
        <option value="" disabled>
          Ajouter un souhait
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Wishes;
