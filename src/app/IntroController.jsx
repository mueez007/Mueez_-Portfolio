import { useState } from "react";
import HudLoader from "../components/intro/HudLoader";
import EnterScreen from "../components/intro/EnterScreen";
import WelcomeOverlay from "../components/intro/WelcomeOverlay";
import MainPage from "../MainPage";

export default function IntroController() {
  const [stage, setStage] = useState("hud");

  return (
    <>
      {stage === "hud" && (
        <HudLoader onComplete={() => setStage("enter")} />
      )}

      {stage === "enter" && (
        <EnterScreen onEnter={() => setStage("welcome")} />
      )}

      {stage === "welcome" && (
        <WelcomeOverlay onComplete={() => setStage("main")} />
      )}

      {stage === "main" && <MainPage />}
    </>
  );
}
