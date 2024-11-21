"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Zoo Arcadia. Tous droits réservés.</p>
      <ul className="icons">
        <li>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram.png"
              alt="Logo Instagram"
              width={24} // Définir la largeur de l'icône
              height={24} // Définir la hauteur de l'icône
              className="social-icon"
            />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/facebook.png"
              alt="Logo Facebook"
              width={24}
              height={24}
              className="social-icon"
            />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/?lang=fr" target="_blank" rel="noopener noreferrer">
            <Image
              src="/twitter.png"
              alt="Logo X"
              width={24}
              height={24}
              className="social-icon"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}
