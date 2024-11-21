"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]); // Liste des utilisateurs
  const [newUser, setNewUser] = useState({ email: "", role: "employé" }); // Nouvel utilisateur
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs
  const [loading, setLoading] = useState(false); // Indique si une action est en cours
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // État d'authentification
  const router = useRouter(); // Redirection

  // Fonction pour vérifier l'authentification
  const checkAuthentication = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check");
      if (!response.ok) throw new Error("Non authentifié");
      const data = await response.json();
      if (data.role !== "admin") {
        router.push("/login"); // Rediriger si l'utilisateur n'est pas admin
      } else {
        setIsAuthenticated(true); // Authentifié et rôle valide
      }
    } catch {
      router.push("/login"); // Rediriger si non authentifié
    }
  }, [router]);

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/admin?type=users");
      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");
      const data: User[] = await response.json();
      setUsers(data); // Mise à jour de la liste des utilisateurs
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  }, []);

  // Fonction pour ajouter un utilisateur
  async function addUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); // Activer le mode chargement
    setError(null); // Réinitialiser les erreurs
    try {
      const response = await fetch("/api/admin?type=users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur.");
      setNewUser({ email: "", role: "employé" }); // Réinitialiser le formulaire
      await fetchUsers(); // Recharger la liste des utilisateurs
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoading(false); // Désactiver le mode chargement
    }
  }

  // Fonction pour supprimer un utilisateur
  async function deleteUser(id: number) {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    setLoading(true); // Activer le mode chargement
    setError(null); // Réinitialiser les erreurs
    try {
      const response = await fetch("/api/admin?type=users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression de l'utilisateur.");
      await fetchUsers(); // Recharger la liste des utilisateurs
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoading(false); // Désactiver le mode chargement
    }
  }

  // Charger la liste des utilisateurs et vérifier l'authentification au montage du composant
  useEffect(() => {
    checkAuthentication();
    fetchUsers();
  }, [checkAuthentication, fetchUsers]);

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isAuthenticated === null) {
    return <p>Vérification de l&apos;authentification...</p>;
  }

  return (
    <div className="admin-container">
      <h1>Gestion des utilisateurs</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={addUser}>
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="employé">Employé</option>
          <option value="vétérinaire">Vétérinaire</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>

      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} ({user.role})
            <button onClick={() => deleteUser(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


