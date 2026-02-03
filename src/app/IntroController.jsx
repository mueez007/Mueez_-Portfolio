import { useEffect, useState } from "react";
import IntroVideo from "../components/intro/IntroVideo";
import EnterScreen from "../components/intro/EnterScreen";
import WelcomeOverlay from "../components/intro/WelcomeOverlay";
import MainPage from "../components/MainPage";

export default function IntroController() {
  // intro flow states
  // "video" → "enter" → "welcome" → "main"
  const [stage, setStage] = useState("video");

  // detect device ONCE
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
  }, []);

  // handlers
  const handleVideoEnd = () => {
    setStage("enter");
  };

  const handleEnter = () => {
    setStage("welcome");
  };

  const handleWelcomeFinish = () => {
    setStage("main");
  };

  return (
    <>
      {stage === "video" && (
        <IntroVideo isMobile={isMobile} onEnd={handleVideoEnd} />
      )}

      {stage === "enter" && (
        <EnterScreen onEnter={handleEnter} />
      )}

      {stage === "welcome" && (
        <WelcomeOverlay onFinish={handleWelcomeFinish} />
      )}

      {stage === "main" && <MainPage />}
    </>
  );
}
