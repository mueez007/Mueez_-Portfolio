import Navbar from "./Navbar";
import "../styles/MainPage.css";

export default function MainPage() {
  return (
    <>
      <Navbar />

      <section className="main-page" id="home">
        <div className="hero-content">

          <h1 className="main-title">
            Mohammed Huzaif Mueez
          </h1>

          <p className="main-subtitle">
            AI/ML Developer • Full-Stack Builder
          </p>

          <p className="main-desc">
            I design and build intelligent systems, futuristic interfaces,
            and AI-powered digital experiences that feel premium and human.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              View Projects
            </button>

            <button className="btn-outline">
              Contact Me
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
