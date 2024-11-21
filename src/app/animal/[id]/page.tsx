"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Animal = {
  id: number;
  name: string;
  image: string;
  race: string;
  date: string;
};

type PageProps = {
  params: { id: string };
};

export default function AnimalDetails({ params }: PageProps) {
  const { id } = params;
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await fetch(`/api/animals`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données.");
        const animals: Animal[] = await response.json();
        const foundAnimal = animals.find((a) => a.id === parseInt(id, 10));
        if (!foundAnimal) throw new Error("Animal non trouvé.");
        setAnimal(foundAnimal);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    }

    fetchAnimal();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="animal-detail">
      <button onClick={() => router.back()} className="back-button">
        Retour
      </button>
      {animal && (
        <div className="animal-content">
          <Image src={animal.image} alt={animal.name} width={500} height={500} />
          <h1>
            {animal.name} ({animal.race})
          </h1>
          <p>Date d&apos;arrivée : {animal.date}</p>
        </div>
      )}
    </div>
  );
}

