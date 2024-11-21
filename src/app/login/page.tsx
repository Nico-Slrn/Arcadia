"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import du hook pour redirection

export default function LoginPage() {
  const [email, setEmail] = useState<string>(""); // Typage explicite
  const [password, setPassword] = useState<string>(""); // Typage explicite
  const [error, setError] = useState<string>(""); // Typage explicite
  const [success, setSuccess] = useState<string>(""); // Typage explicite
  const router = useRouter(); // Utilisation du hook pour gérer la redirection

  // Gestion de la soumission du formulaire de connexion
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Appelle l'API de connexion avec les informations fournies
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Stocke les informations utilisateur dans un cookie
        document.cookie = `user=${JSON.stringify({
          role: data.role,
        })}; path=/`;

        // Redirigez vers la page admin après une connexion réussie
        router.push("/admin");
      } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>

      <p>
        <Link href="/">
          Retour à l&apos;accueil
        </Link>
      </p>
    </div>
  );
}

