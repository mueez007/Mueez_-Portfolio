import { useEffect } from "react";
import { Howl } from "howler";
import LightRays from "./LightRays";
import welcomeSound from "../assets/sounds/welcome.mp3";
import "../styles/welcome.css";

export default function WelcomeScreen({ onDone }) {
  useEffect(() => {
    const sound = new Howl({ src: [welcomeSound], volume: 0.6 });
    sound.play();
    const t = setTimeout(() => onDone(), 4000);
    return () => { sound.stop(); clearTimeout(t); };
  }, []);

  return (
    <div className="welcome-wrapper">
      <LightRays />
      <div className="welcome-content">
        <h1 className="welcome-text">Welcome.</h1>
      </div>
    </div>
  );
}
