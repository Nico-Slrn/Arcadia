import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Définir un type pour l'habitat
interface Habitat {
  id: number;
  title: string;
  description: string;
}

const HabitatDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Déclarez l'état avec le type explicite pour accepter soit `null` soit un objet `Habitat`
  const [habitat, setHabitat] = useState<Habitat | null>(null);

  useEffect(() => {
    if (id) {
      const habitats: Habitat[] = [
        { id: 1, title: "Savanne", description: "Découvrez les lions, girafes et autres animaux." },
        { id: 2, title: "Jungle", description: "Habitat dense et humide pour les tigres et perroquets." },
        { id: 3, title: "Désert", description: "Lieu aride pour les serpents et lézards." },
        { id: 4, title: "Forêt tropicale", description: "Espace pour les singes et paresseux." },
      ];

      // Trouver l'habitat correspondant à l'ID
      const habitatData = habitats.find((habitat) => habitat.id === parseInt(id as string));

      // Assigner habitatData ou `null` si rien n'est trouvé
      setHabitat(habitatData || null);
    }
  }, [id]);

  // Si l'habitat est `null`, afficher "Chargement..."
  if (!habitat) {
    return <div>Chargement...</div>;
  }

  // Si l'habitat est trouvé, afficher les informations
  return (
    <div>
      <h1>{habitat.title}</h1>
      <p>{habitat.description}</p>
    </div>
  );
};

export default HabitatDetail;
