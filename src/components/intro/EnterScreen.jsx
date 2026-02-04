import { useState } from "react";
import "../../styles/intro/enter-screen.css";
import "../../styles/intro/fade.css";
import Particles from "../Particles";

export default function EnterScreen({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);

    setTimeout(() => {
      onEnter();
    }, 800); // match fade duration
  };

  return (
    <div
      className={`enter-screen fade-layer ${fadeOut ? "fade-out" : ""}`}
      onClick={handleClick}
    >
      {/* Particle Background */}
      <div className="enter-particles">
        <Particles />
      </div>

      {/* ENTER UI */}
      <div className="enter-content">
        <div className="enter-text">ENTER</div>

        <div className="enter-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="enter-subtext">
          Tap anywhere to continue
        </div>
      </div>
    </div>
  );
}
