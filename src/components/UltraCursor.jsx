import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SIZE = 42;

export default function UltraCursor() {
  const blob = useRef(null);
  const dot = useRef(null);
  const text = useRef(null);
  const shock = useRef(null);

  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ ...pos.current });

  const labelRef = useRef("");

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const el = e.target.closest("[data-cursor]");

      if (el) {
        const rect = el.getBoundingClientRect();

        mouse.current.x = rect.left + rect.width / 2;
        mouse.current.y = rect.top + rect.height / 2;

        const label = el.dataset.cursor;

        if (labelRef.current !== label) {
          labelRef.current = label;
          text.current.innerText = label;

          gsap.to(text.current, { opacity: 1, scale: 1, duration: 0.2 });

          gsap.to(blob.current, {
            width: rect.width + 24,
            height: rect.height + 24,
            borderRadius: 16,
            duration: 0.3,
          });
        }
      } else {
        labelRef.current = "";

        gsap.to(text.current, { opacity: 0, scale: 0.6 });

        gsap.to(blob.current, {
          width: SIZE,
          height: SIZE,
          borderRadius: "50%",
        });
      }
    };

    const click = () => {
      gsap.fromTo(
        shock.current,
        { scale: 0, opacity: 0.7 },
        { scale: 4, opacity: 0, duration: 0.6, ease: "power2.out" }
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);

    const setX = gsap.quickSetter(blob.current, "x", "px");
    const setY = gsap.quickSetter(blob.current, "y", "px");
    const setR = gsap.quickSetter(blob.current, "rotate", "deg");
    const setSX = gsap.quickSetter(blob.current, "scaleX");
    const setSY = gsap.quickSetter(blob.current, "scaleY");

    gsap.ticker.add(() => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      pos.current.x += dx * 0.18;
      pos.current.y += dy * 0.18;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const scale = Math.min(dist / 220, 0.45);

      setX(pos.current.x);
      setY(pos.current.y);
      setR(angle);
      setSX(1 + scale);
      setSY(1 - scale * 1.3);

      gsap.set(dot.current, {
        x: mouse.current.x,
        y: mouse.current.y,
      });

      gsap.set(text.current, {
        x: pos.current.x,
        y: pos.current.y,
      });

      gsap.set(shock.current, {
        x: mouse.current.x,
        y: mouse.current.y,
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      gsap.ticker.remove();
    };
  }, []);

  return (
    <>
      {/* LIQUID BLOB */}
      <div
        ref={blob}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIZE,
          height: SIZE,
          borderRadius: "50%",
          border: "2px solid white",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          backdropFilter: "invert(100%)",
          mixBlendMode: "difference",
          boxShadow: "0 0 35px rgba(255,255,255,0.6)",
        }}
      />

      {/* CENTER DOT */}
      <div
        ref={dot}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          zIndex: 10000,
        }}
      />

      {/* SHOCKWAVE */}
      <div
        ref={shock}
        style={{
          position: "fixed",
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "2px solid white",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 9998,
        }}
      />

      {/* TEXT */}
      <div
        ref={text}
        style={{
          position: "fixed",
          color: "white",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 1,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 10001,
        }}
      />
    </>
  );
}
