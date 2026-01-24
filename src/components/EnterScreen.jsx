import "../styles/enter.css";
import Particles from "./Particles";

export default function EnterScreen({ onEnter }) {
  return (
    <div className="enter-wrapper" onClick={onEnter}>
      <Particles />
      <div className="enter-content">
        <h1>Enter?</h1>
        <p>Tap anywhere to continue</p>
      </div>
    </div>
  );
}
