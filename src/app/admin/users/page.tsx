"use client";

import { useState, useEffect } from "react";

type User = {
  id: number;
  email: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ email: "", role: "employé" });
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    const response = await fetch("/api/admin?type=users");
    const data = await response.json();
    setUsers(data);
  }

  async function addUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin?type=users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        alert("Utilisateur créé !");
        setNewUser({ email: "", role: "employé" }); // Réinitialiser le formulaire
        fetchUsers(); // Recharger la liste
      } else {
        alert("Erreur lors de la création.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id: number) {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    const response = await fetch("/api/admin?type=users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("Utilisateur supprimé !");
      fetchUsers(); // Recharger la liste
    } else {
      alert("Erreur lors de la suppression.");
    }
  }

  useEffect(() => {
    fetchUsers(); // Charger les utilisateurs au démarrage
  }, []);

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

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
