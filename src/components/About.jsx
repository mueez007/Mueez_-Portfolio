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
            speed={1.5}
            shineColor="#c084fc"
            color="#555"
          />
        </h2>

        <p>
          I'm Mohammed Huzaif Mueez — a B.E. student in Computer Science
          (Artificial Intelligence &amp; Machine Learning) at Maharaja Institute
          of Technology, Mysore with hands-on experience in Generative AI,
          Computer Vision, Robotics, and Autonomous Systems.
        </p>

        <p>
          Skilled in PyTorch, Large Language Models (LLMs), Agentic AI,
          Explainable AI, and Retrieval-Augmented Generation (RAG). I build
          full-stack AI-powered applications using Python, Django, FastAPI,
          React.js, and modern ML/DL frameworks like TensorFlow, Keras, and
          Scikit-learn.
        </p>

        <p>
          Passionate about building intelligent systems and autonomous
          technologies that solve real-world problems — from AI-powered farming
          assistants to autonomous delivery drones.
        </p>
      </div>
    </section>
  );
}
