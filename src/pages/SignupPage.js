import React, { useState } from "react";
import "./SignupPage.css";

function SignupPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const minLength = 12;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    let error = "";
    if (password.length < minLength) {
      error = "Le mot de passe doit comporter au moins 12 caractères.";
    } else if (!specialCharRegex.test(password)) {
      error = "Le mot de passe doit contenir au moins un caractère spécial.";
    }
    return error;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await fetch("http://localhost:3002/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Inscription réussie ! Connectez-vous maintenant.");
      } else {
        setMessage(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="Prénom"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default SignupPage;
