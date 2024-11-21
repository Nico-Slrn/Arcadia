import { NextResponse } from "next/server";

export async function GET() {
  const animals = [
    { id: 1, race: "Lion", name: "Symba", image: "/lion.webp"},
    { id: 2, race: "Girafe", name: "Zara", image: "/girafe.webp"},
    { id: 3, race: "Tigre", name: "Tigrou", image: "/tigre.webp"},
    { id: 4, race: "Perroquet", name: "Rio", image: "/perroquet.webp"},
    { id: 5, race: "Serpent", name: "Snake", image: "/serpent.webp"},
    { id: 6, race: "Lezard", name: "Turbo", image: "/lezard.webp"},
    { id: 7, race: "Singe", name: "Jungo", image: "/singe.webp"},
    { id: 8, race: "Paresseux", name: "Lento", image:"/paresseux.webp"}
  ];

  return NextResponse.json(animals);
}
