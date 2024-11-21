import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Récupère le cookie utilisateur
  const userCookie = req.cookies.get("user");

  // Parse le cookie pour récupérer les informations
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  // Vérifie si l'utilisateur est authentifié et admin pour accéder à /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!user || user.role !== "admin") {
      // Redirige les utilisateurs non autorisés vers la page de connexion
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Permet le passage si aucune condition n'est violée
  return NextResponse.next();
}

// Applique le middleware uniquement sur les routes protégées
export const config = {
  matcher: ["/admin/:path*", "/other-protected-routes/:path*"], // Routes à protéger
};
