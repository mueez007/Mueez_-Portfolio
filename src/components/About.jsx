import { useEffect, useRef } from "react";
import "../styles/About.css";
import ShinyText from "./ShinyText";

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
          I'm Mohammed Huzaif Mueez, an AI/ML developer and full-stack builder.
        </p>

        <p>
          I blend AI with modern UI to build premium experiences.
        </p>
      </div>
    </section>
  );
}
