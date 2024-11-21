import { NextResponse } from "next/server";

interface Report {
  id: number;
  animalId: number;
  description: string;
  date: string;
}

const reports: Report[] = [];

export async function GET() {
  return NextResponse.json(reports);
}

export async function POST(req: Request) {
  const { animalId, description } = await req.json();

  if (!animalId || !description) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const newReport = {
    id: reports.length + 1,
    animalId,
    description,
    date: new Date().toISOString(),
  };

  reports.push(newReport);
  return NextResponse.json(newReport);
}

