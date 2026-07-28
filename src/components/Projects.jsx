import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import "../styles/Projects.css";

/* ── project data (from resume) ────────────────────────────── */
const PROJECTS = [
    {
        id: "krishi-sakhi",
        title: "Krishi Sakhi V2.0",
        subtitle: "AI-Powered Digital Farming Assistant",
        year: "2025",
        desc: "Full-stack AI platform for crop recommendation, plant disease detection, and farmer assistance using Django, React.js, and TensorFlow.",
        longDesc: "Built a full-stack AI platform for crop recommendation, plant disease detection, and farmer assistance using Django, React.js, and TensorFlow. Developed a CNN-based disease detection model achieving 81% test accuracy and integrated Random Forest-based crop recommendation using soil and weather data with geolocation-based recommendations. Integrated a Gemini-powered agriculture chatbot and secure REST APIs with JWT authentication for intelligent farmer support.",
        tags: ["Python", "Django", "DRF", "React.js", "TensorFlow/Keras", "Scikit-learn", "Gemini API"],
        images: ["/projects/agriassist.png", "/projects/agriassist.png", "/projects/agriassist.png"],
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "carpulse-ai",
        title: "CarPulse AI",
        subtitle: "Agentic Vehicle Service Management System",
        year: "2025",
        desc: "AI-powered vehicle service management platform with automated logging, analytics, and interactive dashboards.",
        longDesc: "Developed an AI-powered vehicle service management platform with automated logging, analytics, and interactive dashboards. Built an agentic AI system capable of executing backend tools through natural language commands and voice-based logging. Implemented ML-based service cost prediction with secure JWT authentication using FastAPI and React.js.",
        tags: ["FastAPI", "React.js", "PostgreSQL", "Scikit-learn", "Docker"],
        images: ["/projects/portfolio.png", "/projects/portfolio.png", "/projects/portfolio.png"],
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "edutrack",
        title: "EduTrack",
        subtitle: "College ERP & Academic Management System",
        year: "2025",
        desc: "Multi-role college ERP application for students, teachers, and administrators with secure role-based authentication.",
        longDesc: "Developed a multi-role college ERP application for students, teachers, and administrators with secure role-based authentication. Implemented attendance tracking, marks management, and automated academic performance calculation systems. Built dashboard interfaces and scalable backend APIs for efficient academic data management and analytics.",
        tags: ["Flutter", "Dart", "Firebase"],
        images: ["/projects/chat-app.png", "/projects/chat-app.png", "/projects/chat-app.png"],
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "aerioai-drone",
        title: "AerioAI Drone",
        subtitle: "AI-Powered Autonomous Delivery & Surveillance UAV",
        year: "2026",
        desc: "AI-powered autonomous drone for intelligent aerial surveillance, object detection, classification, and smart payload delivery.",
        longDesc: "Developed an AI-powered autonomous drone for intelligent aerial surveillance, object detection, object classification, smart payload delivery, and emergency response applications. Integrated Raspberry Pi 4, SpeedyBee F405 V5 Flight Controller, BN-880 GPS Module, 55A 4-in-1 ESC, 4114-11 320KV Brushless Motors, telemetry systems, and onboard vision pipelines for autonomous navigation and real-time decision-making. Built computer vision and AI workflows using OpenCV, Raspberry Pi Camera, and Gemini API, enabling real-time aerial scene understanding, object detection, classification, AI-generated scene summarization, and dashboard-based mission monitoring. Implemented GPS-based waypoint navigation, Return-to-Home (RTH), autonomous flight control, and intelligent mission execution through INAV-compatible flight systems.",
        tags: ["Python", "Raspberry Pi", "OpenCV", "SpeedyBee F405 V5", "BN-880 GPS", "Gemini API", "INAV"],
        images: ["/projects/neural-style.png", "/projects/neural-style.png", "/projects/neural-style.png"],
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
];

/* ═══════════════════════════════════════════════════════════════
   IMAGE CAROUSEL COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function ImageCarousel({ images, title }) {
    const [current, setCurrent] = useState(0);

    const prev = (e) => {
        e.stopPropagation();
        setCurrent((c) => (c - 1 + images.length) % images.length);
    };

    const next = (e) => {
        e.stopPropagation();
        setCurrent((c) => (c + 1) % images.length);
    };

    return (
        <div className="carousel-container">
            <img
                src={images[current]}
                alt={`${title} - ${current + 1}`}
                className="carousel-image"
            />

            {images.length > 1 && (
                <>
                    <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button className="carousel-btn carousel-next" onClick={next} aria-label="Next image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>

                    <div className="carousel-dots">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`carousel-dot ${i === current ? "active" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrent(i);
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Projects() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("show");
                });
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        cardRefs.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    /* lock body scroll when modal is open */
    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [activeProject]);

    const openProject = (p) => setActiveProject(p);
    const closeProject = () => setActiveProject(null);

    return (
        <>
            <section className="projects-section" id="projects" ref={sectionRef}>
                {/* ambient glow */}
                <div className="projects-glow" />

                <h2 className="projects-heading">
                    <ShinyText text="Projects" speed={1.5} shineColor="#c084fc" color="#555" />
                </h2>

                <p className="projects-sub">
                    A selection of things I&apos;ve built — click any card to explore.
                </p>

                {/* card grid */}
                <div className="projects-grid">
                    {PROJECTS.map((p, i) => (
                        <div
                            key={p.id}
                            className="project-card reveal-card"
                            ref={(el) => (cardRefs.current[i] = el)}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                            onClick={() => openProject(p)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && openProject(p)}
                        >
                            {/* thumbnail */}
                            <div className="card-thumb">
                                <img src={p.images[0]} alt={p.title} loading="lazy" />
                            </div>

                            {/* accent bar */}
                            <span className="card-accent" />

                            {/* neon border effect */}
                            <span className="card-neon-border" />

                            <div className="card-year">{p.year}</div>
                            <h3 className="card-title">{p.title}</h3>
                            <p className="card-subtitle">{p.subtitle}</p>
                            <p className="card-desc">{p.desc}</p>

                            <div className="card-tags">
                                {p.tags.map((t) => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>

                            <span className="card-link-label">
                                View Details →
                            </span>
                        </div>
                    ))}
                </div>

                {/* LinkedIn CTA */}
                <a
                    href="https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-cta"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M6.94 6.5a2.44 2.44 0 110-4.88 2.44 2.44 0 010 4.88zM4.5 8.5h4.88V20H4.5zM9.75 8.5h4.68v1.56h.07c.65-1.23 2.24-2.52 4.62-2.52 4.94 0 5.86 3.25 5.86 7.47V20h-4.88v-4.9c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V20H9.75z" />
                    </svg>
                    See more on LinkedIn
                </a>
            </section>

            {/* ══════════════════════════════════════════════════════════
         PROJECT DETAIL MODAL
         ══════════════════════════════════════════════════════════ */}
            {activeProject && (
                <div className="project-modal-overlay" onClick={closeProject}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        {/* close button */}
                        <button className="modal-close" onClick={closeProject}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-body">
                            {/* LEFT: image carousel */}
                            <div className="modal-image">
                                <ImageCarousel images={activeProject.images} title={activeProject.title} />
                            </div>

                            {/* RIGHT: info */}
                            <div className="modal-info">
                                <span className="modal-year">{activeProject.year}</span>
                                <h2 className="modal-title">{activeProject.title}</h2>
                                <p className="modal-subtitle-text">{activeProject.subtitle}</p>

                                <div className="modal-tags">
                                    {activeProject.tags.map((t) => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>

                                <p className="modal-desc">{activeProject.longDesc}</p>

                                <div className="modal-buttons">
                                    <a
                                        href={activeProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-btn github-btn"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.31 1.07 2.87.82.09-.64.34-1.07.62-1.31-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.8c.85 0 1.71.11 2.5.33 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.82-2.33 4.66-4.55 4.92.35.3.67.89.67 1.79v2.65c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
                                        </svg>
                                        View on GitHub
                                    </a>
                                    <a
                                        href={activeProject.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-btn linkedin-btn"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                            <path d="M6.94 6.5a2.44 2.44 0 110-4.88 2.44 2.44 0 010 4.88zM4.5 8.5h4.88V20H4.5zM9.75 8.5h4.68v1.56h.07c.65-1.23 2.24-2.52 4.62-2.52 4.94 0 5.86 3.25 5.86 7.47V20h-4.88v-4.9c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V20H9.75z" />
                                        </svg>
                                        View on LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
