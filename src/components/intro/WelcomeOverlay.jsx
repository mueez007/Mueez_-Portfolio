import { useEffect, useRef } from "react";
import "../../styles/intro/welcome-overlay.css";
import LightRays from "../LightRays";
import welcomeSound from "../../assets/sounds/welcome.mp3";

export default function WelcomeOverlay({ onComplete }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(welcomeSound);
    audioRef.current = audio;

    audio.volume = 1;
    audio.play().catch(() => { });

    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onComplete]);

  return (
    <div className="welcome-overlay">

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
