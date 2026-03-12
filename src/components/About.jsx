import { useEffect, useRef } from "react";
import "../styles/About.css";
import ShinyText from "./ShinyText";
import CircularText from "./CircularText";

export default function About() {
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.classList.add("show");
      });
    }, { threshold: 0.3 });

    if (imgRef.current) observer.observe(imgRef.current);
    if (textRef.current) observer.observe(textRef.current);
  }, []);

  return (
    <section className="about-section" id="about">

      <div className="about-photo" ref={imgRef}>
        <div className="photo-ring"></div>
        <img src="/profile.png" alt="profile" />
        <CircularText
          text="MOHAMMED*HUZAIF*MUEEZ*"
          onHover="speedUp"
          spinDuration={15}
        />
      </div>

      <div className="about-text" ref={textRef}>
        <h2>
          <ShinyText
            text="About Me"
            speed={1}
            shineColor="#fff"
            color="#555"
          />
        </h2>

        <p>
          I'm Mohammed Huzaif Mueez — an AI/ML developer and full-stack builder
          with a passion for turning ideas into intelligent, production-ready
          applications.
        </p>

        <p>
          From deep-learning models to sleek React interfaces, I love working
          across the entire stack. I specialise in Python, JavaScript, and modern
          frameworks like TensorFlow, Node.js, and React to craft experiences
          that feel both powerful and effortless.
        </p>

        <p>
          When I'm not coding, you'll find me exploring the latest in generative
          AI, contributing to open-source, or designing cinematic UI concepts
          that push creative boundaries.
        </p>
      </div>
    </section>
  );
}
