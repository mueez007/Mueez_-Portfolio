import { useEffect, useState } from "react";
import gsap from "gsap";
import "../styles/hud.css";

export default function HudLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.to(".ring-outer", {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
    gsap.to(".ring-middle", {
      rotate: -360,
      duration: 14,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
    gsap.to(".ring-inner", {
      rotate: 360,
      duration: 8,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 : 100));
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      onFinish();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hud-wrapper">
      <div className="hud-container">
        <svg viewBox="0 0 200 200" className="hud-svg">
          <circle cx="100" cy="100" r="90" className="ring ring-outer" />
          <circle cx="100" cy="100" r="70" className="ring ring-middle" />
          <circle cx="100" cy="100" r="50" className="ring ring-inner" />
          <circle cx="100" cy="100" r="6" className="core" />
        </svg>

        <div className="hud-percent">{progress}%</div>
        <div className="hud-text">SYSTEM INITIALIZING</div>
      </div>
    </div>
  );
}
