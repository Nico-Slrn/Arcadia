"use client";

import { useState, useEffect, useCallback } from "react";

type Report = {
  id: number;
  animalId: number;
  description: string;
  date: string;
};

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]); // Liste des rapports
  const [filters, setFilters] = useState({ animalId: "", date: "" }); // Filtres
  const [loading, setLoading] = useState(false); // Gérer le chargement
  const [error, setError] = useState<string | null>(null); // Gérer les erreurs

  // Fonction pour récupérer les rapports avec filtres
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null); // Réinitialiser les erreurs
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/admin?type=reports&${query}`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des rapports.");
      const data = await response.json();
      setReports(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Gérer les changements de filtres
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Charger les rapports au démarrage
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="admin-container">
      <h1>Gestion des rapports vétérinaires</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Filtres</h2>
      <form>
        <div>
          <label htmlFor="animalId">ID de l&apos;animal :</label>
          <input
            type="number"
            id="animalId"
            name="animalId"
            value={filters.animalId}
            onChange={handleFilterChange}
            placeholder="ID de l&apos;animal"
          />
        </div>
        <div>
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>
        <button type="button" onClick={fetchReports}>
          Appliquer les filtres
        </button>
      </form>

      <h2>Liste des rapports</h2>
      {loading ? (
        <p>Chargement des rapports...</p>
      ) : reports.length > 0 ? (
        <ul>
          {reports.map((report: Report) => (
            <li key={report.id}>
              <strong>ID Animal :</strong> {report.animalId} <br />
              <strong>Description :</strong> {report.description} <br />
              <strong>Date :</strong> {new Date(report.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun rapport trouv&eacute;.</p>
      )}
    </div>
  );
}
