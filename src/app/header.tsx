import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <Image
          src="/logo3.jpeg"
          alt="Logo du Zoo"
          width={100} 
          height={60} 
          className="logo"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/service/">Services</Link>
          </li>
          <li>
            <Link href="/habitat/">Habitats</Link>
          </li>
          <li>
            <Link href="/contact/">Contact</Link>
          </li>
          <li>
            <Link href="/login/">Connexion</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
