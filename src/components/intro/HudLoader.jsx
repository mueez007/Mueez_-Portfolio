import { useEffect, useRef, useState } from "react";
import "../../styles/intro/hud-loader.css";

export default function HudLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    const DURATION = 5500;

    const loop = (t) => {
      if (!startRef.current) startRef.current = t;

      const elapsed = t - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);

      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(loop);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(loop);
  }, [onComplete]);

  return (
    <div className="hud-root">
      <div className="hud-center">

        {/* RADIAL PROGRESS */}
        <svg className="hud-progress" viewBox="0 0 200 200">
          <circle className="progress-bg" cx="100" cy="100" r="86" />
          <circle
            className="progress-bar"
            cx="100"
            cy="100"
            r="86"
            style={{
              strokeDashoffset: 540 - (540 * progress) / 100,
            }}
          />
        </svg>

        {/* HUD DIAL */}
        <div className="hud-dial">
          <div className="dial-ring ticks" />
          <div className="dial-ring sweep" />
          <div className="dial-ring micro" />

          {/* NEON RED CORE */}
          <div className="hud-core" />
        </div>

        {/* % */}
        <div className="hud-percent">
          {Math.floor(progress)}%
        </div>

        {/* SEGMENTED BARS */}
        <div className="hud-bars">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={
                progress >= (i + 1) * (100 / 28)
                  ? "bar active"
                  : "bar"
              }
            />
          ))}
        </div>

        {/* MICRO TEXT */}
        <div className="hud-micro">
          <span>SYS.BOOT</span>
          <span>ID 78421</span>
          <span>CORE LINK</span>
        </div>

      </div>
    </div>
  );
}
