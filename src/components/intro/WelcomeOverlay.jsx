import { useEffect, useRef, useState } from "react";
import "../../styles/intro/welcome-overlay.css";
import "../../styles/intro/fade.css";
import LightRays from "../LightRays";
import welcomeSound from "../../assets/sounds/welcome.mp3";

export default function WelcomeOverlay({ onComplete }) {
  const audioRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const audio = new Audio(welcomeSound);
    audioRef.current = audio;

    audio.volume = 1;
    audio.play().catch(() => { });

    const timer = setTimeout(() => {
      // start fade out
      setFadeOut(true);

      // wait for fade animation
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 4000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onComplete]);

  return (
    <div className={`welcome-overlay fade-layer ${fadeOut ? "fade-out" : ""}`}>

      {/* LIGHT RAYS BACKGROUND */}
      <div className="welcome-rays">
        <LightRays />
      </div>

      {/* FOREGROUND UI */}
      <div className="welcome-content">
        <h1 className="welcome-text">WELCOME</h1>
      </div>

    </div>
  );
}
