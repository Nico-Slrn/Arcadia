// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Métadonnées pour le site
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Layout global pour l'application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <div className="content">{children} 
          </div>
        <Footer />
      </body>
    </html>
  );
}
