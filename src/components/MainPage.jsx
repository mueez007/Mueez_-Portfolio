import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SplashCursor from "./SplashCursor";
import ShinyText from "./ShinyText";
import "../styles/MainPage.css";
import Spline from "@splinetool/react-spline";

import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import CurvedLoop from "./CurvedLoop";

export default function MainPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 400);
  }, []);

  return (
    <>
      <Navbar />

      {/* Splash cursor */}
      <SplashCursor />

      {/* HERO */}
      <section className="main-page" id="home">
        <div className="spline-bg">
          <Spline scene="https://prod.spline.design/1a6tyLU2Fu3yb4WQ/scene.splinecode" />
        </div>

        <div className={`hero-content ${show ? "show" : ""}`}>
          <h1 className="main-title">
            <ShinyText
              text="Mohammed Huzaif Mueez"
              speed={2}
              shineColor="#fff"
              color="#555"
            />
          </h1>

          <p className="main-subtitle">
            AI/ML Developer • Full-Stack Builder
          </p>

          <p className="main-desc">
            I design and build intelligent systems,
            futuristic interfaces, and AI-powered
            digital experiences.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() =>
                document.getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </button>

            <button
              className="btn-outline"
              onClick={() =>
                document.getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </button>

            <a
              href="/resume.pdf"
              download
              className="btn-download"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mueez007"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.31 1.07 2.87.82.09-.64.34-1.07.62-1.31-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.8c.85 0 1.71.11 2.5.33 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.82-2.33 4.66-4.55 4.92.35.3.67.89.67 1.79v2.65c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 6.5a2.44 2.44 0 110-4.88 2.44 2.44 0 010 4.88zM4.5 8.5h4.88V20H4.5zM9.75 8.5h4.68v1.56h.07c.65-1.23 2.24-2.52 4.62-2.52 4.94 0 5.86 3.25 5.86 7.47V20h-4.88v-4.9c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V20H9.75z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator"
          onClick={() =>
            document.getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="scroll-dot"></div>
        </div>
      </section>

      {/* Curved Loop */}
      <CurvedLoop marqueeText="AI ✦ ML ✦ FUTURE ✦ INNOVATION ✦" />

      <About />

      <Skills />

      <Projects />

      <Contact />
    </>
  );
}
