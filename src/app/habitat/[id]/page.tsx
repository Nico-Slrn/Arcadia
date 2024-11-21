"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Animal {
  id: number;
  race: string;
  name: string;
  image: string;
  date: string;
}

interface Habitat {
  id: number;
  name: string;
  description: string;
  image: string;
  animals: Animal[];
}

export default function HabitatDetails({ params }: { params: { id: string } }) {
  const [habitat, setHabitat] = useState<Habitat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHabitat() {
      try {
        const response = await fetch("/api/habitats");
        if (!response.ok) throw new Error("Erreur lors de la récupération de l'habitat.");
        const habitats: Habitat[] = await response.json();

        const foundHabitat = habitats.find((h) => h.id === parseInt(params.id, 10));
        if (!foundHabitat) throw new Error("Habitat non trouvé.");
        setHabitat(foundHabitat);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    }

    fetchHabitat();
  }, [params.id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="habitat-detail">
      {habitat && (
        <>
          <Image src={habitat.image} alt={habitat.name} width={800} height={400} />
          <h1>{habitat.name}</h1>
          <p>{habitat.description}</p>
          <h2>Animaux dans cet habitat :</h2>
          <ul>
            {habitat.animals.map((animal) => (
              <li key={animal.id}>
                <Image src={animal.image} alt={animal.name} width={100} height={100} />
                <p>{animal.name} ({animal.race}) - Arrivé le {animal.date}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
