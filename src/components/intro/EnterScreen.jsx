import "../../styles/intro/enter-screen.css";
import Particles from "../Particles";

export default function EnterScreen({ onEnter }) {
  return (
    <div className="enter-screen" onClick={onEnter}>
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
