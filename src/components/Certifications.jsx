import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import "../styles/Certifications.css";

/* ── certification data (from resume) ──────────────────────── */
const CERTIFICATIONS = [
    {
        id: "oci-gen-ai",
        title: "Oracle Cloud Infrastructure 2025 – Generative AI Professional",
        issuer: "Oracle University",
        image: null, // User will add certificate photo later
        color: "#f80000",
    },
    {
        id: "oci-ai-foundations",
        title: "Oracle Cloud Infrastructure – AI Foundations Associate",
        issuer: "Oracle University",
        image: null,
        color: "#f80000",
    },
    {
        id: "ibm-ai",
        title: "IBM Artificial Intelligence Fundamentals",
        issuer: "IBM SkillsBuild",
        image: null,
        color: "#054ada",
    },
    {
        id: "ibm-data-science",
        title: "IBM Data Science Fundamentals with Python & SQL",
        issuer: "Coursera",
        image: null,
        color: "#0056d2",
    },
    {
        id: "math-ml",
        title: "Mathematics for Machine Learning – Imperial College London",
        issuer: "Coursera",
        image: null,
        color: "#003e74",
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
