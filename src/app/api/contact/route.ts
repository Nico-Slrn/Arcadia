import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Récupérer les données du formulaire
    const { name, email, message } = body;

    // Validation des champs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Simuler l'enregistrement ou l'envoi de l'email
    console.log("Nouvelle demande de contact reçue :", { name, email, message });

    // Répondre avec un message de succès
    return NextResponse.json({
      message: "Votre demande de contact a été envoyée avec succès. Nous vous répondrons sous peu.",
    });
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
    return NextResponse.json(
      { error: "Erreur lors de la soumission du formulaire. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
