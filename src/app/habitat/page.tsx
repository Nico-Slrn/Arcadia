"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Définition du type Habitat (spécifique à cette page uniquement)
interface Habitat {
  id: number;
  name: string;
  image: string;
}

export default function HabitatsPage() {
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHabitats() {
      try {
        const response = await fetch("/api/habitats");
        if (!response.ok) throw new Error("Erreur lors de la récupération des habitats.");
        const data: Habitat[] = await response.json();
        setHabitats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur inconnue.");
      } finally {
        setLoading(false);
      }
    }

    fetchHabitats();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="habitat-list">
      <h1>Habitats du Zoo</h1>
      <div className="habitat-grid">
        {habitats.map((habitat) => (
          <Link key={habitat.id} href={`/habitat/${habitat.id}`} className="habitat-card">
            <div>
              <Image
                src={habitat.image}
                alt={habitat.name}
                width={300}
                height={200}
                className="habitat-image"
              />
              <h2>{habitat.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
