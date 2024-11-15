import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <Link href="/">
            <img src="/logo3.jpeg" alt="Logo du Zoo" className="logo" />
            </Link>
            <nav>
                <ul>    
                
            <li>
                <Link href="/service">Services</Link>
            </li>
            <li>
                <Link href="/habitat">Habitats</Link>
            </li>
            <li>
                <Link href="/contact">Contact</Link>
            </li>
                <li>
                <Link href="/login">Connexion</Link>
                </li>
         
                </ul>
            </nav>
        </header>
    )
}