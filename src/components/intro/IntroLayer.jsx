import { useState } from "react";
import HudLoader from "./HudLoader";
import EnterScreen from "./EnterScreen";
import WelcomeOverlay from "./WelcomeOverlay";
import MainPage from "../MainPage";

export default function IntroLayer() {
  const [stage, setStage] = useState("hud");
  // stages: hud → enter → welcome → main

  return (
    <>
      {stage === "hud" && (
        <HudLoader
          duration={5000}
          onComplete={() => setStage("enter")}
        />
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
