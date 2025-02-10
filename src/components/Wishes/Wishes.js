import React, { useState } from "react";
import "./Wishes.css";

const Wishes = ({ wishes = [], userId, token }) => {
  const [wishesState, setWishesState] = useState(wishes);

  const addWish = async () => {
    const newWish = prompt("Ajouter un nouveau souhait :");
    if (!newWish) {
      alert("Veuillez entrer un souhait valide.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/wishes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ wish: newWish }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du souhait");
      }

      const data = await response.json();
      setWishesState((prevWishes) => [
        ...prevWishes,
        { id: data.id, wish: newWish },
      ]);
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  const removeWish = async (wishId) => {
    console.log("ID du souhait à supprimer :", wishId); // Ajoutez ceci pour déboguer
    if (!wishId) {
      alert("L'ID du souhait est introuvable !");
      return;
    }
    if (!window.confirm("Voulez-vous vraiment supprimer ce souhait ?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/wishes/${wishId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du souhait");
      }

      setWishesState((prevWishes) =>
        prevWishes.filter((wish) => wish.id !== wishId)
      );
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  return (
    <section className="wishes-section">
      <h2>Mes souhaits</h2>
      <div className="wishes-list">
        {wishesState.map((wish) => (
          <span key={wish.id} className="wish">
            {wish.wish} <button onClick={() => removeWish(wish.id)}>✖</button>
          </span>
        ))}
      </div>
      <button className="add-wish-button" onClick={addWish}>
        Ajouter un souhait
      </button>
    </section>
  );
};
export default Wishes;
