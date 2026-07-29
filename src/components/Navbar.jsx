import { useState, useCallback } from "react";
import "../styles/navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollTo = useCallback((e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
        // Clear any hash from the URL to prevent browser auto-scrolling
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    return (
        <nav className="nav">
            <div className="nav-logo">MUEEZ</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <a href="#home" onClick={(e) => scrollTo(e, "home")}>Home</a>
                <a href="#about" onClick={(e) => scrollTo(e, "about")}>About</a>
                <a href="#skills" onClick={(e) => scrollTo(e, "skills")}>Skills</a>
                <a href="#projects" onClick={(e) => scrollTo(e, "projects")}>Projects</a>
                <a href="#certifications" onClick={(e) => scrollTo(e, "certifications")}>Certs</a>
                <a href="#achievements" onClick={(e) => scrollTo(e, "achievements")}>Achievements</a>
                <a href="#contact" onClick={(e) => scrollTo(e, "contact")}>Contact</a>
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
