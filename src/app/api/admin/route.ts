import { NextResponse } from "next/server";

// Définition des interfaces
interface User {
  id: number;
  email: string;
  role: "employé" | "vétérinaire";
  password: string;
}

interface Report {
  id: number;
  animalId: number;
  description: string;
  date: string;
}

interface Stat {
  animalId: number;
  consultationCount: number;
}

// Simule une base de données en mémoire
const users: User[] = [
  { id: 1, email: "admin@example.com", role: "vétérinaire", password: "admin123" },
  { id: 2, email: "user@example.com", role: "employé", password: "user123" },
];

const reports: Report[] = [];
const stats: Stat[] = [];

// Gestion des requêtes GET
export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  switch (type) {
    case "users":
      return NextResponse.json(users);

    case "reports": {
      const animalId = url.searchParams.get("animalId");
      const date = url.searchParams.get("date");

      let filteredReports = reports;

      if (animalId) {
        filteredReports = filteredReports.filter((report) => report.animalId === parseInt(animalId, 10));
      }

      if (date) {
        filteredReports = filteredReports.filter((report) => report.date.startsWith(date));
      }

      return NextResponse.json(filteredReports);
    }

    case "stats":
      return NextResponse.json(stats);

    default:
      return NextResponse.json({ error: "Type non valide." }, { status: 400 });
  }
}

// Gestion des requêtes POST
export async function POST(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const body = await req.json();

  switch (type) {
    case "users": {
      const { email, role } = body;

      if (!email || !["employé", "vétérinaire"].includes(role)) {
        return NextResponse.json({ error: "Données utilisateur invalides." }, { status: 400 });
      }

      const newUser: User = {
        id: users.length + 1,
        email,
        role,
        password: Math.random().toString(36).slice(-8), // Mot de passe aléatoire
      };

      users.push(newUser);

      console.log(`Email envoyé à ${email} avec le mot de passe généré : ${newUser.password}.`);

      return NextResponse.json({
        message: "Utilisateur créé avec succès. Un email a été envoyé.",
        user: { id: newUser.id, email: newUser.email, role: newUser.role },
      });
    }

    case "reports": {
      const { animalId, description } = body;

      if (!animalId || !description) {
        return NextResponse.json({ error: "Données de rapport invalides." }, { status: 400 });
      }

      const newReport: Report = {
        id: reports.length + 1,
        animalId,
        description,
        date: new Date().toISOString(),
      };

      reports.push(newReport);

      return NextResponse.json({ message: "Rapport ajouté avec succès.", report: newReport });
    }

    default:
      return NextResponse.json({ error: "Type non valide." }, { status: 400 });
  }
}

// Gestion des requêtes DELETE
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const body = await req.json();

  switch (type) {
    case "users": {
      const { id } = body;

      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 });
      }

      users.splice(userIndex, 1);

      return NextResponse.json({ message: "Utilisateur supprimé avec succès." });
    }

    case "reports": {
      const { id } = body;

      const reportIndex = reports.findIndex((report) => report.id === id);
      if (reportIndex === -1) {
        return NextResponse.json({ error: "Rapport non trouvé." }, { status: 404 });
      }

      reports.splice(reportIndex, 1);

      return NextResponse.json({ message: "Rapport supprimé avec succès." });
    }

    default:
      return NextResponse.json({ error: "Type non valide." }, { status: 400 });
  }
}

// Gestion des requêtes PUT
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const body = await req.json();

  switch (type) {
    case "users": {
      const { id, email, role } = body;

      const user = users.find((u) => u.id === id);
      if (!user) {
        return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 });
      }

      if (email) user.email = email;
      if (role && ["employé", "vétérinaire"].includes(role)) user.role = role;

      return NextResponse.json({ message: "Utilisateur mis à jour avec succès.", user });
    }

    default:
      return NextResponse.json({ error: "Type non valide." }, { status: 400 });
  }
}
