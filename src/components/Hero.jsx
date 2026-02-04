import { useEffect, useState } from "react";
import "../styles/Hero.css";

export default function Hero() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    return (
        <section className="hero">

            <div className={`hero-content ${show ? "show" : ""}`}>

                <p className="hero-tag">
                    PORTFOLIO 2026
                </p>

                <h1 className="hero-title">
                    Mohammed Huzaif Mueez
                </h1>

                <h2 className="hero-sub">
                    AI Developer & Creative Engineer
                </h2>

                <p className="hero-desc">
                    Building intelligent systems, cinematic experiences,
                    and next-gen digital products.
                </p>

                <div className="hero-actions">
                    <button className="hero-btn primary">
                        View Projects
                    </button>

                    <button className="hero-btn ghost">
                        Contact Me
                    </button>
                </div>

            </div>

        </section>
    );
}
