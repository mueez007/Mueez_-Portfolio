import { useEffect, useRef, useState } from "react";
import ShinyText from "./ShinyText";
import "../styles/Contact.css";

/* ── contact info items ─────────────────────────────────────── */
const INFO = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M22 7l-10 7L2 7" />
            </svg>
        ),
        label: "Email",
        value: "mueezmueez9@gmail.com",
        href: "mailto:mueezmueez9@gmail.com",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        label: "WhatsApp",
        value: "+91 8660755789",
        href: "https://wa.me/918660755789",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Location",
        value: "Mysore, India",
        href: null,
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 6.5a2.44 2.44 0 110-4.88 2.44 2.44 0 010 4.88zM4.5 8.5h4.88V20H4.5zM9.75 8.5h4.68v1.56h.07c.65-1.23 2.24-2.52 4.62-2.52 4.94 0 5.86 3.25 5.86 7.47V20h-4.88v-4.9c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V20H9.75z" />
            </svg>
        ),
        label: "LinkedIn",
        value: "Mohammed Huzaif Mueez",
        href: "https://www.linkedin.com/in/mohammed-huzaif-mueez-5bb7892b2/",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.31 1.07 2.87.82.09-.64.34-1.07.62-1.31-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.8c.85 0 1.71.11 2.5.33 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.82-2.33 4.66-4.55 4.92.35.3.67.89.67 1.79v2.65c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
        ),
        label: "GitHub",
        value: "mueez007",
        href: "https://github.com/mueez007",
    },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Contact() {
    const sectionRef = useRef(null);
    const [sent, setSent] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <section className="contact-section" id="contact" ref={sectionRef}>
            <div className="contact-glow" />

            <h2 className="contact-heading">
                <ShinyText text="Get In Touch" speed={1} shineColor="#fff" color="#555" />
            </h2>

            <p className="contact-sub">
                Have a project in mind or want to collaborate? Let&apos;s talk.
            </p>

            <div className="contact-body">
                {/* ── LEFT: info cards ──────────────────── */}
                <div className="contact-info">
                    {INFO.map((item) => {
                        const Tag = item.href ? "a" : "div";
                        const linkProps = item.href
                            ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                            : {};
                        return (
                            <Tag key={item.label} className="info-card" {...linkProps}>
                                <span className="info-icon">{item.icon}</span>
                                <div>
                                    <span className="info-label">{item.label}</span>
                                    <span className="info-value">{item.value}</span>
                                </div>
                            </Tag>
                        );
                    })}
                </div>

                {/* ── RIGHT: form ──────────────────────── */}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Your Email" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Subject" />
                    </div>

                    <div className="form-group">
                        <textarea rows="5" placeholder="Your Message..." required />
                    </div>

                    <button type="submit" className="send-btn" disabled={sent}>
                        {sent ? (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Sent!
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                                Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* footer */}
            <footer className="site-footer">
                <p>© 2026 Mohammed Huzaif Mueez — Built with 🤍</p>
            </footer>
        </section>
    );
}
