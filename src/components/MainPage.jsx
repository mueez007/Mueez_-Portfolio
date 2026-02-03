import "../styles/MainPage.css";
import useGsapReveal from "../hooks/useGsapReveal";

export default function MainPage() {
  useGsapReveal();

  return (
    <main className="main-page">
      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title reveal delay-1">Your Name</h1>
        <p className="hero-subtitle reveal delay-2">
          AI / ML Student · Developer · Creator
        </p>
      </section>

      {/* ABOUT */}
      <section className="section gsap-reveal">
        <h2>About</h2>
        <p>
          I’m an AI/ML student focused on intelligent systems, modern web
          experiences, and creative engineering.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="section gsap-reveal">
        <h2>Projects</h2>
        <p>Selected works and experiments.</p>
      </section>
    </main>
  );
}
