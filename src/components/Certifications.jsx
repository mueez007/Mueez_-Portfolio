import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import "../styles/Certifications.css";

/* ── certification data (from resume) ──────────────────────── */
const CERTIFICATIONS = [
    {
        id: "oci-gen-ai-2025",
        title: "Oracle Cloud Infrastructure 2025 – Generative AI Professional",
        issuer: "Oracle University",
        image: "/certs/Oracle Cloud Infrastructure 2025 – Generative AI Professional.png",
        color: "#f80000",
    },
    {
        id: "oci-ai-foundations",
        title: "Oracle Cloud Infrastructure – AI Foundations Associate",
        issuer: "Oracle University",
        image: "/certs/Oracle Cloud Infrastructure – AI Foundations Associate.png",
        color: "#f80000",
    },
    {
        id: "ibm-data-science",
        title: "IBM Data Science Fundamentals with Python and SQL",
        issuer: "IBM",
        image: "/certs/IBM Data Science Fundamentals with Python and SQL Specialization.png",
        color: "#054ada",
    },
    {
        id: "ibm-ml-python",
        title: "Machine Learning with Python",
        issuer: "IBM",
        image: "/certs/Machine Learning with Python (IBM).png",
        color: "#054ada",
    },
    {
        id: "math-ml-linear-algebra",
        title: "Mathematics for Machine Learning (Linear Algebra)",
        issuer: "Coursera",
        image: "/certs/Mathematics for Machine Learning (Linear Algebra).png",
        color: "#0056d2",
    },
    {
        id: "math-ml-multivariate-calculus",
        title: "Mathematics for Machine Learning (Multivariate Calculus)",
        issuer: "Coursera",
        image: "/certs/Mathematics for Machine Learning ( Multivariate Calculus).png",
        color: "#0056d2",
    },
    {
        id: "intro-gen-ai",
        title: "Introduction to Generative AI",
        issuer: "Duke University",
        image: "/certs/Introduction to Generative AI (Duke University).png",
        color: "#0056d2",
    },
    {
        id: "tensorflow-advanced",
        title: "TensorFlow & Advanced Techniques",
        issuer: "Coursera",
        image: "/certs/TensorFlow & Advanced Techniques.png",
        color: "#ff6f00",
    },
    {
        id: "aws-cloud-practitioner",
        title: "AWS Cloud Practitioner Essentials",
        issuer: "Amazon Web Services",
        image: "/certs/AWS Cloud Practitioner Essentials.png",
        color: "#ff9900",
    },
    {
        id: "ms-ai-ml-algorithms",
        title: "AI and Machine Learning Algorithms and Techniques",
        issuer: "Microsoft",
        image: "/certs/AI and Machine Learning Algorithms and Techniques (Microsoft).png",
        color: "#00a4ef",
    },
    {
        id: "infosys-llmops",
        title: "Getting Started with Large Language Model Operations (LLMOps)",
        issuer: "Infosys",
        image: "/certs/Getting Started with Large Language Model Operations (LLMOps) – Infosys.png",
        color: "#007cc3",
    },
    {
        id: "agentic-ai",
        title: "Agentic AI and AI Agents",
        issuer: "Coursera",
        image: "/certs/Agentic AI and AI Agents.png",
        color: "#7c3aed",
    },
];

export default function Certifications() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const [activeCert, setActiveCert] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("show");
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        cardRefs.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    /* lock body scroll when modal is open */
    useEffect(() => {
        if (activeCert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [activeCert]);

    return (
        <>
            <section className="cert-section" id="certifications" ref={sectionRef}>
                <div className="cert-glow" />

                <h2 className="cert-heading">
                    <ShinyText text="Certifications" speed={1.5} shineColor="#c084fc" color="#555" />
                </h2>

                <p className="cert-sub">
                    Professional certifications and courses I&apos;ve completed.
                </p>

                <div className="cert-grid">
                    {CERTIFICATIONS.map((cert, i) => (
                        <div
                            key={cert.id}
                            className="cert-card reveal-cert"
                            ref={(el) => (cardRefs.current[i] = el)}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                            onClick={() => cert.image && setActiveCert(cert)}
                        >
                            {/* Neon accent line */}
                            <div
                                className="cert-accent-line"
                                style={{
                                    background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88, transparent)`,
                                }}
                            />

                            {/* Image or placeholder */}
                            <div className="cert-image-area">
                                {cert.image ? (
                                    <img src={cert.image} alt={cert.title} />
                                ) : (
                                    <div className="cert-placeholder">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <path d="M9 12l2 2 4-4" />
                                        </svg>
                                        <span>Certificate</span>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="cert-info">
                                <h3 className="cert-title">{cert.title}</h3>
                                <span className="cert-issuer">{cert.issuer}</span>
                            </div>

                            {/* Neon border */}
                            <span className="cert-neon-border" />
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <a
                    href="https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-more-certs-btn"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.94 6.5a2.44 2.44 0 110-4.88 2.44 2.44 0 010 4.88zM4.5 8.5h4.88V20H4.5zM9.75 8.5h4.68v1.56h.07c.65-1.23 2.24-2.52 4.62-2.52 4.94 0 5.86 3.25 5.86 7.47V20h-4.88v-4.9c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V20H9.75z" />
                    </svg>
                    View more certificates on LinkedIn
                </a>
            </section>

            {/* Certificate image modal */}
            {activeCert && (
                <div className="cert-modal-overlay" onClick={() => setActiveCert(null)}>
                    <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="cert-modal-close" onClick={() => setActiveCert(null)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <img src={activeCert.image} alt={activeCert.title} className="cert-modal-img" />
                        <h3>{activeCert.title}</h3>
                        <p>{activeCert.issuer}</p>
                    </div>
                </div>
            )}
        </>
    );
}
