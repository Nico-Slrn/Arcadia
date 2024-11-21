import { NextResponse } from "next/server";

const users = [
  { email: "admin@example.com", password: "Admin@2024!", role: "admin", mustChangePassword: false },
  { email: "user@example.com", password: "User@2024!", role: "employé", mustChangePassword: false },
];


export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
  }

  return NextResponse.json({ role: user.role });
}

  