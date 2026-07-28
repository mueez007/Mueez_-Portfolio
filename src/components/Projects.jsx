import { useEffect, useRef, useState, useCallback } from "react";
import ShinyText from "./ShinyText";
import "../styles/Projects.css";

/* ── project data ────────────────────────────────────────── */
const PROJECTS = [
    {
        id: "krishi-sakhi",
        title: "Krishi Sakhi V2.0",
        subtitle: "AI-Powered Digital Farming Assistant",
        year: "2025",
        desc: "Full-stack AI platform for crop recommendation, plant disease detection, and farmer assistance using Django, React.js, and TensorFlow.",
        longDesc: "Built a full-stack AI platform for crop recommendation, plant disease detection, and farmer assistance using Django, React.js, and TensorFlow. Developed a CNN-based disease detection model achieving 81% test accuracy and integrated Random Forest-based crop recommendation using soil and weather data with geolocation-based recommendations. Integrated a Gemini-powered agriculture chatbot and secure REST APIs with JWT authentication for intelligent farmer support.",
        tags: ["Python", "Django", "DRF", "React.js", "TensorFlow/Keras", "Scikit-learn", "Gemini API"],
        frontpage: "/projects/krishi-sakhi/frontpage.jpg",
        images: ["/projects/krishi-sakhi/frontpage.jpg", "/projects/krishi-sakhi/1.jpg", "/projects/krishi-sakhi/2.jpg", "/projects/krishi-sakhi/3.jpg", "/projects/krishi-sakhi/4.jpg"],
        github: "https://github.com/mueez007/krishi-sakhi-ai-assistant.git",
    },
    {
        id: "carpulse-ai",
        title: "CarPulse AI",
        subtitle: "Agentic Vehicle Service Management System",
        year: "2025",
        desc: "AI-powered vehicle service management platform with automated logging, analytics, and interactive dashboards.",
        longDesc: "Developed an AI-powered vehicle service management platform with automated logging, analytics, and interactive dashboards. Built an agentic AI system capable of executing backend tools through natural language commands and voice-based logging. Implemented ML-based service cost prediction with secure JWT authentication using FastAPI and React.js.",
        tags: ["FastAPI", "React.js", "PostgreSQL", "Scikit-learn", "Docker"],
        frontpage: "/projects/carpulse-ai/frontpage.jpg",
        images: ["/projects/carpulse-ai/frontpage.jpg", "/projects/carpulse-ai/1.jpg", "/projects/carpulse-ai/2.jpg", "/projects/carpulse-ai/3.jpg", "/projects/carpulse-ai/4.jpg", "/projects/carpulse-ai/5.jpg", "/projects/carpulse-ai/6.jpg", "/projects/carpulse-ai/7.jpg"],
        github: "https://github.com/mueez007/Carpulse-Ai.git",
    },
    {
        id: "carepulse-ai",
        title: "CarePulse AI",
        subtitle: "AI-Powered Healthcare Companion — SparkVerse+ 2026",
        year: "2026",
        desc: "AI-powered healthcare companion with intelligent health monitoring, medication management, food safety analysis, symptom assessment, and emotional well-being assistance.",
        longDesc: "Developed CarePulse AI at SparkVerse+ 2026, a Health Innovation Ideathon organized by the Department of Computer Engineering, MIT Mysore. Built an AI-powered healthcare companion designed to support individuals through intelligent health monitoring, medication management, food safety analysis, symptom assessment, and emotional well-being assistance. Key features include an AI-powered symptom checker and health risk assessment, smart medication reminders with voice assistance, AI food scanner for nutritional and food safety insights, emotional wellness companion with conversational AI support, personalized health dashboard and progress tracking, and emergency-focused healthcare assistance and recommendations.",
        tags: ["Python", "AI/ML", "React.js", "Health Tech", "Conversational AI", "Voice Assistant"],
        frontpage: "/projects/carepulse-ai/frontpage.jpg",
        images: ["/projects/carepulse-ai/frontpage.jpg", "/projects/carepulse-ai/1.jpg", "/projects/carepulse-ai/2.jpg", "/projects/carepulse-ai/3.jpg", "/projects/carepulse-ai/4.jpg", "/projects/carepulse-ai/5.jpg", "/projects/carepulse-ai/6.jpg", "/projects/carepulse-ai/7.jpg", "/projects/carepulse-ai/8.jpg"],
        github: "https://github.com/mueez007/CarePluse-Ai.git",
    },
    {
        id: "edutrack",
        title: "EduTrack",
        subtitle: "College ERP & Academic Management System",
        year: "2025",
        desc: "Multi-role college ERP application for students, teachers, and administrators with secure role-based authentication.",
        longDesc: "Developed a multi-role college ERP application for students, teachers, and administrators with secure role-based authentication. Implemented attendance tracking, marks management, and automated academic performance calculation systems. Built dashboard interfaces and scalable backend APIs for efficient academic data management and analytics.",
        tags: ["Flutter", "Dart", "Firebase"],
        frontpage: "/projects/edutrack/frontpage.jpg",
        images: ["/projects/edutrack/frontpage.jpg", "/projects/edutrack/1.jpg", "/projects/edutrack/2.jpg", "/projects/edutrack/3.jpg", "/projects/edutrack/4.jpg", "/projects/edutrack/5.jpg", "/projects/edutrack/6.jpg", "/projects/edutrack/7.jpg", "/projects/edutrack/8.jpg", "/projects/edutrack/9.jpg", "/projects/edutrack/10.jpg", "/projects/edutrack/11.jpg", "/projects/edutrack/12.jpg"],
        github: "https://github.com/mueez007/EduTrack-College-Marks.git",
    },
    {
        id: "aerioai-drone",
        title: "AerioAI Drone",
        subtitle: "AI-Powered Autonomous Delivery & Surveillance UAV",
        year: "2026",
        desc: "AI-powered autonomous drone for intelligent aerial surveillance, object detection, classification, and smart payload delivery.",
        longDesc: "Developed an AI-powered autonomous drone for intelligent aerial surveillance, object detection, object classification, smart payload delivery, and emergency response applications. Integrated Raspberry Pi 4, SpeedyBee F405 V5 Flight Controller, BN-880 GPS Module, 55A 4-in-1 ESC, 4114-11 320KV Brushless Motors, telemetry systems, and onboard vision pipelines for autonomous navigation and real-time decision-making. Built computer vision and AI workflows using OpenCV, Raspberry Pi Camera, and Gemini API, enabling real-time aerial scene understanding, object detection, classification, AI-generated scene summarization, and dashboard-based mission monitoring. Implemented GPS-based waypoint navigation, Return-to-Home (RTH), autonomous flight control, and intelligent mission execution through INAV-compatible flight systems.",
        tags: ["Python", "Raspberry Pi", "OpenCV", "SpeedyBee F405 V5", "BN-880 GPS", "Gemini API", "INAV"],
        frontpage: "/projects/aerioai-drone/frontpage.png",
        images: ["/projects/aerioai-drone/frontpage.png", "/projects/aerioai-drone/1.jpg", "/projects/aerioai-drone/2.jpg", "/projects/aerioai-drone/3.jpg", "/projects/aerioai-drone/4.png", "/projects/aerioai-drone/5.png", "/projects/aerioai-drone/6.png", "/projects/aerioai-drone/7.png", "/projects/aerioai-drone/8.png"],
        github: "https://github.com/mueez007/AERIOAI-Drone.git",
    },
];

const AUTOPLAY_MS = 3000;

/* ═══════════════════════════════════════════════════════════════
   IMAGE CAROUSEL COMPONENT (for modal)
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
   PROJECTS COMPONENT — ONE-AT-A-TIME SLIDER
   ═══════════════════════════════════════════════════════════════ */
export default function Projects() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slideState, setSlideState] = useState("visible"); // "visible" | "exit-left" | "exit-right" | "enter-left" | "enter-right"
    const [activeProject, setActiveProject] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef(null);
    const isTransitioning = useRef(false);

    /* scroll-reveal for section */
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
        return () => observer.disconnect();
    }, []);

    /* transition to a specific slide */
    const transitionTo = useCallback((newIndex, direction) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        // Phase 1: exit current slide
        setSlideState(direction === "right" ? "exit-left" : "exit-right");

        setTimeout(() => {
            // Phase 2: swap content instantly while hidden
            setActiveIndex(newIndex);
            setSlideState(direction === "right" ? "enter-right" : "enter-left");

            // Phase 3: animate in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setSlideState("visible");
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 500);
                });
            });
        }, 450);
    }, []);

    const goNext = useCallback(() => {
        const nextIdx = (activeIndex + 1) % PROJECTS.length;
        transitionTo(nextIdx, "right");
    }, [activeIndex, transitionTo]);

    const goPrev = useCallback(() => {
        const prevIdx = (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
        transitionTo(prevIdx, "left");
    }, [activeIndex, transitionTo]);

    /* autoplay */
    useEffect(() => {
        if (isPaused || activeProject) {
            clearInterval(autoplayRef.current);
            return;
        }

        autoplayRef.current = setInterval(() => {
            goNext();
        }, AUTOPLAY_MS);

        return () => clearInterval(autoplayRef.current);
    }, [isPaused, activeProject, goNext]);

    /* lock body scroll when modal is open */
    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [activeProject]);

    const openProject = (p) => {
        setActiveProject(p);
        setIsPaused(true);
    };

    const closeProject = () => {
        setActiveProject(null);
        setIsPaused(false);
    };

    const currentProject = PROJECTS[activeIndex];

    /* compute slide class */
    const getSlideClass = () => {
        switch (slideState) {
            case "exit-left": return "showcase-slide slide-exit-left";
            case "exit-right": return "showcase-slide slide-exit-right";
            case "enter-right": return "showcase-slide slide-enter-right";
            case "enter-left": return "showcase-slide slide-enter-left";
            default: return "showcase-slide slide-visible";
        }
    };

    return (
        <>
            <section className="projects-section" id="projects" ref={sectionRef}>
                {/* ambient glow */}
                <div className="projects-glow" />

                <h2 className="projects-heading">
                    <ShinyText text="Projects" speed={1.5} shineColor="#c084fc" color="#555" />
                </h2>

                <p className="projects-sub">
                    A selection of things I&apos;ve built — click to explore.
                </p>

                {/* ── MAIN SHOWCASE ── */}
                <div
                    className="showcase-wrapper"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => { if (!activeProject) setIsPaused(false); }}
                >
                    {/* Progress bar */}
                    <div className="showcase-progress-track">
                        <div
                            className={`showcase-progress-bar ${isPaused || activeProject ? "paused" : ""}`}
                            key={`progress-${activeIndex}-${isPaused}`}
                            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                        />
                    </div>

                    {/* Slide container */}
                    <div className={getSlideClass()}>
                        <div className="showcase-card" onClick={() => openProject(currentProject)}>
                            {/* Big preview image */}
                            <div className="showcase-image">
                                <img src={currentProject.frontpage} alt={currentProject.title} />
                                <div className="showcase-image-overlay">
                                    <span className="showcase-view-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            <line x1="11" y1="8" x2="11" y2="14" />
                                            <line x1="8" y1="11" x2="14" y2="11" />
                                        </svg>
                                        View Project
                                    </span>
                                </div>
                            </div>

                            {/* Info panel */}
                            <div className="showcase-info">
                                <div className="showcase-info-header">
                                    <span className="showcase-year">{currentProject.year}</span>
                                    <span className="showcase-project-num">
                                        Project {String(activeIndex + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="showcase-title">{currentProject.title}</h3>
                                <p className="showcase-subtitle">{currentProject.subtitle}</p>

                                <div className="showcase-divider" />

                                <p className="showcase-desc">{currentProject.desc}</p>
                                <div className="showcase-tags">
                                    {currentProject.tags.map((t) => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>

                                <div className="showcase-actions">
                                    <span className="showcase-cta">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <path d="M15 3h6v6M14 10l6.1-6.1M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
                                        </svg>
                                        View Details
                                    </span>
                                    <a
                                        href={currentProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="showcase-github-link"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.31 1.07 2.87.82.09-.64.34-1.07.62-1.31-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.8c.85 0 1.71.11 2.5.33 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.82-2.33 4.66-4.55 4.92.35.3.67.89.67 1.79v2.65c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
                                        </svg>
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        className="showcase-nav showcase-nav-prev"
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        aria-label="Previous project"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        className="showcase-nav showcase-nav-next"
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        aria-label="Next project"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>

                    {/* Slide indicator dots */}
                    <div className="showcase-dots">
                        {PROJECTS.map((p, i) => (
                            <button
                                key={p.id}
                                className={`showcase-dot ${i === activeIndex ? "active" : ""}`}
                                onClick={() => transitionTo(i, i > activeIndex ? "right" : "left")}
                                aria-label={`Go to ${p.title}`}
                            >
                                <span className="showcase-dot-label">{p.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="showcase-counter">
                        <span className="showcase-counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
                        <span className="showcase-counter-sep">/</span>
                        <span className="showcase-counter-total">{String(PROJECTS.length).padStart(2, "0")}</span>
                    </div>
                </div>

                {/* GitHub CTA */}
                <a
                    href="https://github.com/mueez007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-cta"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.31 1.07 2.87.82.09-.64.34-1.07.62-1.31-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.8c.85 0 1.71.11 2.5.33 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.82-2.33 4.66-4.55 4.92.35.3.67.89.67 1.79v2.65c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                    See more projects on GitHub
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
