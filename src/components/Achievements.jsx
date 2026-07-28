import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import "../styles/Achievements.css";

/* ── achievement data (from resume) ────────────────────────── */
const ACHIEVEMENTS = [
    {
        id: "ml-quiz",
        title: "First Place – Machine Learning Quiz Competition",
        org: "Unstop",
        year: "2025",
        description:
            "Secured 1st place in the Machine Learning Quiz Competition at Maharaja Institute of Technology Mysore (Aug 2025), organized by the Unstop Campus Ambassador Program.",
        images: ["/projects/agriassist.png", "/projects/portfolio.png", "/projects/neural-style.png"],
        link: null,
        color: "#f59e0b",
        icon: "🥇",
    },
    {
        id: "conference",
        title: "National-Level Conference Presentation",
        org: "MIT First Grade College",
        year: "2026",
        description:
            'Authored and presented a research paper titled "CarPulse Agent" at the National-Level Conference on Frontiers in AI-Based Applications.',
        images: ["/projects/portfolio.png", "/projects/chat-app.png", "/projects/agriassist.png"],
        link: null,
        color: "#3b82f6",
        icon: "📄",
    },
    {
        id: "dronex",
        title: "Third Place – INNOVOTSAVA'S DRONEX",
        org: "Stack Forge",
        year: "2026",
        description:
            "Secured 3rd place in the DroneX, Drone Technology Challenge at INNOVOTSAVA 2026 (June 2026), organized by the Stack Forge Club, Maharaja Institute of Technology Mysore.",
        images: ["/projects/neural-style.png", "/projects/agriassist.png", "/projects/portfolio.png"],
        link: null,
        color: "#10b981",
        icon: "🥉",
    },
];

/* ═══════════════════════════════════════════════════════════════
   ACHIEVEMENT CARD (used in marquee)
   ═══════════════════════════════════════════════════════════════ */
function AchievementCard({ achievement, onClick }) {
    const validImages = achievement.images.filter(Boolean);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (validImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((c) => (c + 1) % validImages.length);
        }, 2000 + Math.random() * 1000);
        return () => clearInterval(interval);
    }, [validImages.length]);

    return (
        <div
            className="achievement-card"
            onClick={() => onClick(achievement)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick(achievement)}
        >
            {/* Colored top accent */}
            <div
                className="achievement-accent"
                style={{
                    background: `linear-gradient(90deg, ${achievement.color}, ${achievement.color}88, transparent)`,
                }}
            />

            {validImages.length > 0 ? (
                <div className="achievement-card-image">
                    <img src={validImages[current]} alt={achievement.title} />
                </div>
            ) : (
                <div className="achievement-icon">{achievement.icon}</div>
            )}

            <div className="achievement-card-body">
                <span className="achievement-year">{achievement.year}</span>
                <h3 className="achievement-title">{achievement.title}</h3>
                <span className="achievement-org">{achievement.org}</span>
            </div>

            <span className="achievement-view-btn">
                View Details →
            </span>

            {/* Neon border */}
            <span className="achievement-neon-border" />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   IMAGE CAROUSEL FOR MODAL
   ═══════════════════════════════════════════════════════════════ */
function AchievementCarousel({ images, title }) {
    const validImages = images.filter(Boolean);
    const [current, setCurrent] = useState(0);

    if (validImages.length === 0) {
        return (
            <div className="achievement-no-images">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>Photos coming soon</span>
            </div>
        );
    }

    return (
        <div className="achievement-carousel">
            <img
                src={validImages[current]}
                alt={`${title} - ${current + 1}`}
                className="achievement-carousel-img"
            />
            {validImages.length > 1 && (
                <>
                    <button
                        className="ach-carousel-btn ach-prev"
                        onClick={() => setCurrent((c) => (c - 1 + validImages.length) % validImages.length)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        className="ach-carousel-btn ach-next"
                        onClick={() => setCurrent((c) => (c + 1) % validImages.length)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
                    <div className="ach-carousel-counter">
                        {current + 1} / {validImages.length}
                    </div>
                </>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ACHIEVEMENTS SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function Achievements() {
    const sectionRef = useRef(null);
    const [activeAchievement, setActiveAchievement] = useState(null);

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
        return () => observer.disconnect();
    }, []);

    /* lock body scroll when modal is open */
    useEffect(() => {
        if (activeAchievement) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [activeAchievement]);

    /* Double the items for seamless marquee */
    const marqueeItems = [...ACHIEVEMENTS, ...ACHIEVEMENTS, ...ACHIEVEMENTS];

    return (
        <>
            <section className="achievements-section" id="achievements" ref={sectionRef}>
                <div className="achievements-glow" />

                <h2 className="achievements-heading">
                    <ShinyText text="Achievements" speed={1.5} shineColor="#c084fc" color="#555" />
                </h2>

                <p className="achievements-sub">
                    Competitions, conferences, and milestones — click to see details.
                </p>

                {/* Infinite scrolling marquee */}
                <div className="achievements-marquee-wrapper">
                    <div className="achievements-marquee-track">
                        {marqueeItems.map((ach, i) => (
                            <AchievementCard
                                key={`${ach.id}-${i}`}
                                achievement={ach}
                                onClick={setActiveAchievement}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
             ACHIEVEMENT DETAIL MODAL
             ══════════════════════════════════════════════════════════ */}
            {activeAchievement && (
                <div className="achievement-modal-overlay" onClick={() => setActiveAchievement(null)}>
                    <div className="achievement-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="achievement-modal-close" onClick={() => setActiveAchievement(null)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="achievement-modal-body">
                            {/* Images */}
                            <div className="achievement-modal-images">
                                <AchievementCarousel
                                    images={activeAchievement.images}
                                    title={activeAchievement.title}
                                />
                            </div>

                            {/* Info */}
                            <div className="achievement-modal-info">
                                <div className="achievement-modal-icon">{activeAchievement.icon}</div>
                                <span className="achievement-modal-year">{activeAchievement.year}</span>
                                <h2 className="achievement-modal-title">{activeAchievement.title}</h2>
                                <span className="achievement-modal-org">{activeAchievement.org}</span>
                                <p className="achievement-modal-desc">{activeAchievement.description}</p>

                                {activeAchievement.link && (
                                    <a
                                        href={activeAchievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="achievement-view-link"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                        View Certificate / Link
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
