import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="nav">
            <div className="nav-logo">MUEEZ</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <a href="#home" onClick={closeMenu}>Home</a>
                <a href="#about" onClick={closeMenu}>About</a>
                <a href="#skills" onClick={closeMenu}>Skills</a>
                <a href="#projects" onClick={closeMenu}>Projects</a>
                <a href="#certifications" onClick={closeMenu}>Certs</a>
                <a href="#achievements" onClick={closeMenu}>Achievements</a>
                <a href="#contact" onClick={closeMenu}>Contact</a>
            </div>

            <div
                className={`nav-toggle ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span />
                <span />
                <span />
            </div>
        </nav>
    );
}
