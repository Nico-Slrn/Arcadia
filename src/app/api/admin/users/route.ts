export {};

import { NextResponse } from "next/server";

interface User {
  id: number;
  email: string;
  role: "employé" | "vétérinaire";
}

const users: User[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { email, role } = await req.json();

  if (!email || !["employé", "vétérinaire"].includes(role)) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const newUser = { id: users.length + 1, email, role };
  users.push(newUser);
  return NextResponse.json(newUser);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 });
  }
  users.splice(index, 1);
  return NextResponse.json({ message: "Utilisateur supprimé." });
}
