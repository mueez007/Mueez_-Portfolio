import { useEffect, useRef } from "react";
import * as THREE from "three";
import ShinyText from "./ShinyText";
import "../styles/Skills.css";

/* ── skill data ─────────────────────────────────────────────── */
const SKILLS = [
  { name: "JavaScript", color: "#f7df1e" },
  { name: "HTML", color: "#e34f26" },
  { name: "CSS", color: "#264de4" },
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#3776ab" },
  { name: "Git", color: "#f05032" },
  { name: "MongoDB", color: "#47a248" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Figma", color: "#a259ff" },
  { name: "Java", color: "#ed8b00" },
  { name: "C++", color: "#00599c" },
  { name: "TensorFlow", color: "#ff6f00" },
  { name: "Docker", color: "#2496ed" },
  { name: "SQL", color: "#4479a1" },
];

/* ── helper: create a text-label billboard sprite ───────────── */
function makeLabel(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 32);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(1.4, 0.35, 1);
  return spr;
}

/* ── fibonacci sphere: uniform point distribution ───────────── */
function fibonacciSphere(n, radius) {
  const pts = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius
      )
    );
  }
  return pts;
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const mountRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    /* ── scene ─────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    /* ── lighting (makes the meshes look 3D) ──── */
    const ambient = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 2.5, 20);
    pointLight1.position.set(-4, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x61dafb, 1.5, 20);
    pointLight2.position.set(4, -2, 4);
    scene.add(pointLight2);

    /* ── sphere group ─────────────────────────── */
    const group = new THREE.Group();
    scene.add(group);

    const RADIUS = 3.4;
    const positions = fibonacciSphere(SKILLS.length, RADIUS);

    SKILLS.forEach((skill, i) => {
      /* ── 3D ball mesh ─────────────────────── */
      const ballGeo = new THREE.SphereGeometry(0.35, 32, 32);
      const ballMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(skill.color),
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.92,
      });
      const ball = new THREE.Mesh(ballGeo, ballMat);
      ball.position.copy(positions[i]);
      group.add(ball);

      /* ── glow halo around ball ────────────── */
      const glowGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(positions[i]);
      group.add(glow);

      /* ── text label floating above ball ──── */
      const label = makeLabel(skill.name);
      label.position.copy(positions[i]);
      label.position.y += 0.55;
      group.add(label);
    });

    /* ── wireframe outer sphere (subtle) ──────── */
    const wireGeo = new THREE.IcosahedronGeometry(RADIUS + 0.6, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    group.add(new THREE.Mesh(wireGeo, wireMat));

    /* ── floating particles throughout scene ──── */
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSizes = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 24;
      pSizes[i] = Math.random() * 0.06 + 0.01;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── tiny orbiting mini-spheres ────────────── */
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const miniCount = 30;
    const miniGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const miniMeshes = [];
    for (let i = 0; i < miniCount; i++) {
      const miniMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        transparent: true,
        opacity: 0.6,
      });
      const mini = new THREE.Mesh(miniGeo, miniMat);
      const angle = Math.random() * Math.PI * 2;
      const dist = RADIUS + 1.2 + Math.random() * 2;
      const yOff = (Math.random() - 0.5) * 6;
      mini.userData = { angle, dist, yOff, speed: 0.002 + Math.random() * 0.004 };
      orbitGroup.add(mini);
      miniMeshes.push(mini);
    }

    /* ── mouse tracking ───────────────────────── */
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("mousemove", onMouseMove);

    /* ── resize ────────────────────────────────── */
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── animation loop ───────────────────────── */
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* smooth mouse follow */
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      /* auto-rotate + mouse */
      group.rotation.y += 0.002;
      group.rotation.x += 0.0005;
      group.rotation.y += target.x * 0.012;
      group.rotation.x += target.y * 0.008;

      /* animate point lights */
      pointLight1.position.x = Math.sin(t * 0.5) * 5;
      pointLight1.position.z = Math.cos(t * 0.5) * 5;
      pointLight2.position.x = Math.cos(t * 0.3) * 4;
      pointLight2.position.z = Math.sin(t * 0.3) * 4;

      /* particles drift */
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      /* orbiting minis */
      miniMeshes.forEach((m) => {
        m.userData.angle += m.userData.speed;
        m.position.x = Math.cos(m.userData.angle) * m.userData.dist;
        m.position.z = Math.sin(m.userData.angle) * m.userData.dist;
        m.position.y = m.userData.yOff + Math.sin(t + m.userData.angle) * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── scroll reveal ─────────────────────────── */
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.1 }
    );
    if (section) observer.observe(section);

    /* ── cleanup ───────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-glow" />

      <h2 className="skills-heading">
        <ShinyText text="Skills" speed={1} shineColor="#fff" color="#555" />
      </h2>

      <p className="skills-sub">
        Hover &amp; explore — these are the tools I craft with.
      </p>

      <div className="skills-canvas-wrap" ref={mountRef} />
    </section>
  );
}
