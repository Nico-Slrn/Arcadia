import Link from "next/link";

export default function HabitatsPage() {
  const habitats = [
    { id: 1, title: "Savanne", description: "Découvrez les lions, girafes et autres animaux." },
    { id: 2, title: "Jungle", description: "Habitat dense et humide pour les tigres et perroquets." },
    { id: 3, title: "Désert", description: "Lieu aride pour les serpents et lézards." },
    { id: 4, title: "Forêt tropicale", description: "Espace pour les singes et paresseux." },
  ];

  return (
    <div>
      <h1>Habitats du Zoo Arcadia</h1>
      <ul>
        {habitats.map((habitat) => (
          <li key={habitat.id}>
            <Link href={`/habitats/${habitat.id}`} className="more-info">
              <div>
                <h2>{habitat.title}</h2>
                <p>{habitat.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
