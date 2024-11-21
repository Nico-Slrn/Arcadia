import { NextResponse } from "next/server";

export async function GET() {
  const habitats = [
    { id: 1, name: "Savanne", description: "Découvrez les lions, girafes et autres animaux.", image: "/savanne.webp", animals: [
        { id: 1, race: "Lion", name: "Symba", image: "/lion.webp", date: "15/06/2022" },
        { id: 2, race: "Girafe", name: "Zara", image: "/girafe.webp", date: "27/11/2021"}
    ]},

    { id: 2, name: "Jungle", description: "Dense et humide pour les tigres et perroquets.", image: "/jungle.webp", animals: [
        { id: 3, race: "Tigre", name: "Tigrou", image: "/tigre.webp", date: "08/07/2023" },
        { id: 4, race: "Perroquet", name: "Rio", image: "/perroquet.webp", date: "06/03/2020" }
    ] },

    { id: 3, name: "Désert", description: "Lieu aride pour les serpents et lézards.", image: "/désert.webp", animals: [
        { id: 5, race: "Serpent", name: "Snake", image: "/serpent.webp", date: "24/06/2024" },
        { id: 6, race: "Lezard", name: "Turbo", image: "/lezard.webp", date: "01/01/2022" }
    ] },

    { id: 4, name: "Forêt tropicale", description: "Espace pour les singes et paresseux.", image: "/foret-tropicale.webp", animals: [
        { id: 7, race: "Singe", name: "Jungo", image: "/singe.webp", date: "06/04/2022" },
        { id: 8, race: "Paresseux", name: "Lento", image:"/paresseux.webp", date: "07/09/2024" }
    ] },
  ];

  return NextResponse.json(habitats);
}
