"use client";

import { useState } from "react";

export default function Contact() {
  const [error, setError] = useState<string | null>(null); // Déclare et utilise error

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); // Réinitialise l'erreur
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        setError(result.error || "Une erreur est survenue.");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  }

  return (
    <div className="contact">
      <h1>Nous Contacter</h1>

      <h2>Avez-vous des questions ?</h2>
      <p>N&apos;hésitez pas à nous écrire, nous sommes là pour vous aider.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Votre Nom :</label>
          <input type="text" id="name" name="name" required placeholder="Votre nom ici" />
        </div>
        <div>
          <label htmlFor="email">Votre E-mail :</label>
          <input type="email" id="email" name="email" required placeholder="Votre e-mail ici" />
        </div>
        <div>
          <label htmlFor="message">Votre Message :</label>
          <textarea id="message" name="message" required placeholder="Votre message ici" />
        </div>
        <button type="submit">Envoyer</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Affiche l'erreur */}
      <p>Une fois votre demande envoyée, elle sera traitée par notre équipe et vous recevrez une réponse par e-mail.</p>
    </div>
  );
};