import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import "../styles/Projects.css";

/* ── project data ───────────────────────────────────────────── */
const PROJECTS = [
    {
        id: "agriassist",
        title: "AgriAssist AI",
        desc: "AI-powered agriculture chatbot with Gemini API integration, providing crop analysis and smart farming recommendations.",
        longDesc: "AgriAssist AI is a full-stack intelligent agriculture assistant that leverages Google's Gemini API to provide real-time crop analysis, disease detection, and smart farming recommendations. The system features a conversational chatbot interface, support for image-based crop health analysis, and personalized farming schedules based on local weather and soil data. Built with a React frontend and Node.js/Express backend with MongoDB for persistent user data and conversation history.",
        tags: ["React", "Node.js", "Gemini API", "MongoDB"],
        image: "/projects/agriassist.png",
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "portfolio",
        title: "Portfolio 2026",
        desc: "Cinematic portfolio featuring Spline 3D scenes, GSAP animations, and interactive particle effects.",
        longDesc: "A premium cinematic portfolio built with React and cutting-edge web technologies. Features immersive Spline 3D scenes as hero backgrounds, GSAP-powered scroll animations, Three.js interactive skill spheres, and custom WebGL particle effects. The design follows a dark luxury aesthetic with purple accent lighting, glassmorphism cards, and smooth micro-interactions throughout. Every element is craft-animated to create a premium digital experience.",
        tags: ["React", "Spline", "GSAP", "Three.js"],
        image: "/projects/portfolio.png",
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "neural-style",
        title: "Neural Style Transfer",
        desc: "Deep learning application that applies artistic styles to photographs using convolutional neural networks.",
        longDesc: "A deep learning application that implements neural style transfer using VGG-19 convolutional neural networks. Users can upload any photograph and apply the artistic style of famous paintings — from Van Gogh's Starry Night to Picasso's cubist works. The system uses iterative optimization to blend content and style features at multiple network layers. Built with TensorFlow and OpenCV, featuring a web-based UI for real-time style preview and parameter tuning.",
        tags: ["Python", "TensorFlow", "CNN", "OpenCV"],
        image: "/projects/neural-style.png",
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "chat-app",
        title: "Real-Time Chat App",
        desc: "Full-stack chat application with WebSocket support, message history, and user authentication.",
        longDesc: "A production-grade real-time messaging application with WebSocket-powered instant messaging, typing indicators, read receipts, and online presence tracking. Features include end-to-end encrypted message storage, JWT-based authentication, file/image sharing, and conversation history with infinite scroll. The backend uses Express with Socket.io for real-time events and MongoDB for persistent message storage.",
        tags: ["React", "Socket.io", "Express", "JWT"],
        image: "/projects/chat-app.png",
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "task-manager",
        title: "Smart Task Manager",
        desc: "AI-enhanced task management tool with priority suggestions and auto-scheduling powered by ML models.",
        longDesc: "An intelligent task management platform that uses machine learning to automatically prioritize tasks, suggest optimal scheduling, and predict completion times. Features a Kanban board interface with drag-and-drop, burn-up charts, AI-generated daily plans, and team collaboration tools. The ML models are trained on user behavior patterns to provide increasingly accurate task duration estimates and priority recommendations.",
        tags: ["TypeScript", "Next.js", "Python", "FastAPI"],
        image: "/projects/task-manager.png",
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        id: "blockchain",
        title: "Blockchain Wallet",
        desc: "Decentralised crypto wallet with transaction tracking, QR payments, and multi-chain support.",
        longDesc: "A decentralised cryptocurrency wallet application supporting multiple blockchain networks including Ethereum, Polygon, and BSC. Features include QR code-based payments, detailed transaction history with gas analytics, portfolio tracking with real-time price charts, and secure private key management using hardware encryption. Built with React and Web3.js/Ethers.js for blockchain interactions, with Solidity smart contracts for custom token operations.",
        tags: ["React", "Solidity", "Web3.js", "Ethers"],
        image: "/projects/blockchain.png",
        github: "https://github.com/mueez007",
        linkedin: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
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
                    <ShinyText text="Projects" speed={1} shineColor="#fff" color="#555" />
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
                            style={{ transitionDelay: `${i * 0.1}s` }}
                            onClick={() => openProject(p)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && openProject(p)}
                        >
                            {/* thumbnail */}
                            <div className="card-thumb">
                                <img src={p.image} alt={p.title} loading="lazy" />
                            </div>

                            {/* accent bar */}
                            <span className="card-accent" />

                            <h3 className="card-title">{p.title}</h3>
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
                            {/* LEFT: image */}
                            <div className="modal-image">
                                <img src={activeProject.image} alt={activeProject.title} />
                            </div>

                            {/* RIGHT: info */}
                            <div className="modal-info">
                                <h2 className="modal-title">{activeProject.title}</h2>

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
