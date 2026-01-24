import { useState } from "react";
import HudLoader from "./components/HudLoader";
import EnterScreen from "./components/EnterScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import MainPage from "./components/MainPage";

export default function App() {
  const [stage, setStage] = useState("loader");

  return (
    <>
      {stage === "loader" && (
        <HudLoader onFinish={() => setStage("enter")} />
      )}
      {stage === "enter" && (
        <EnterScreen onEnter={() => setStage("welcome")} />
      )}
      {stage === "welcome" && (
        <WelcomeScreen onDone={() => setStage("main")} />
      )}
      {stage === "main" && <MainPage />}
    </>
  );
}
