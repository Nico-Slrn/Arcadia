import { NextResponse } from 'next/server';

export async function GET() {
  const services = [
    { id: 1, title: "Visites guidées" },
    { id: 2, title: "Visites du Zoo en petit train" },
    { id: 3, title: "Restaurant sur place" },
    { id: 4, title: "Magasin de souvenirs" },
  ];

  return NextResponse.json(services);
}