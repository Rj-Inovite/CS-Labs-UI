import React, { useEffect, useRef } from "react";
import "./Policy.css";

/* ------------------------------------------------------------------
   Small reusable hook: adds a "visible" class to an element when it
   scrolls into the viewport, powering the fade-up reveal animations.
------------------------------------------------------------------- */
function useRevealOnScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/* ------------------------------------------------------------------
   Presentational sub-components
------------------------------------------------------------------- */

function ShieldIllustration() {
  return (
    <svg
      className="shield-illustration"
      viewBox="0 0 220 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Security shield illustration"
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A1432" />
          <stop offset="100%" stopColor="#5B0F24" />
        </linearGradient>
        <linearGradient id="shieldGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="215" rx="70" ry="12" fill="#7A1432" opacity="0.08" />

      <path
        d="M110 8 L200 42 V110 C200 165 163 205 110 232 C57 205 20 165 20 110 V42 Z"
        fill="url(#shieldGradient)"
        className="shield-body"
      />
      <path
        d="M110 8 L200 42 V110 C200 165 163 205 110 232 C57 205 20 165 20 110 V42 Z"
        fill="url(#shieldGlow)"
        opacity="0.5"
      />
      <path
        d="M110 26 L184 54 V110 C184 155 154 189 110 212 C66 189 36 155 36 110 V54 Z"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1.5"
        opacity="0.55"
      />

      <g className="shield-check">
        <path
          d="M76 116 L100 140 L146 90"
          stroke="#D4AF37"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

function TrustBadge({ icon, label }) {
  return (
    <div className="trust-badge reveal">
      <span className="trust-badge-icon" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="divider-line" />
      <span className="divider-diamond" />
      <span className="divider-line" />
    </div>
  );
}

function PolicyCard({ index, icon, title, children }) {
  return (
    <article className="policy-card reveal">
      <div className="policy-card-header">
        <span className="policy-card-icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <span className="policy-card-eyebrow">Section {index}</span>
          <h2 className="policy-card-title">{title}</h2>
        </div>
      </div>
      <div className="policy-card-body">{children}</div>
    </article>
  );
}

function ContactRow({ icon, label, value, href }) {
  const content = (
    <>
      <span className="contact-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact-text">
        <span className="contact-label">{label}</span>
        <span className="contact-value">{value}</span>
      </span>
    </>
  );

  return href ? (
    <a className="contact-row contact-row-link" href={href}>
      {content}
    </a>
  ) : (
    <div className="contact-row">{content}</div>
  );
}

/* ------------------------------------------------------------------
   Main Page Component
------------------------------------------------------------------- */

export default function Policy({ onBackHome }) {
  const revealContainerRef = useRevealOnScroll();

  const handleBackHome = () => {
    if (typeof onBackHome === "function") {
      onBackHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="policy-page" ref={revealContainerRef}>
      {/* Floating ambient background shapes */}
      <div className="bg-shapes" aria-hidden="true">
        <span className="floating-shape shape-1" />
        <span className="floating-shape shape-2" />
        <span className="floating-shape shape-3" />
        <span className="floating-shape shape-4" />
      </div>

      {/* ---------------- HERO SECTION ---------------- */}
      <header className="policy-hero">
        <button className="back-home-btn" onClick={handleBackHome} type="button">
          <span className="back-home-arrow" aria-hidden="true">
            &#8592;
          </span>
          Back to Home
        </button>

        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">CS Labs &middot; Legal &amp; Trust</p>
            <h1 className="hero-title">
              Privacy <span className="hero-title-accent">Policy</span>
            </h1>
            <p className="hero-subtitle">
              CS Labs is committed to protecting your personal information and
              maintaining complete transparency in how we collect, use, and
              safeguard it across our learning platform.
            </p>
            <p className="hero-updated">Last Updated: July 2026</p>

            <div className="trust-badges">
              <TrustBadge icon="&#128274;" label="Secure Platform" />
              <TrustBadge icon="&#128737;" label="Privacy Protected" />
              <TrustBadge icon="&#127942;" label="Trusted Learning" />
            </div>
          </div>

          <div className="hero-illustration">
            <div className="illustration-glow" aria-hidden="true" />
            <ShieldIllustration />
          </div>
        </div>
      </header>

      {/* ---------------- CONTENT SECTION ---------------- */}
      <main className="policy-content">
        <SectionDivider />

        <PolicyCard index="01" icon="&#128203;" title="Information We Collect">
          <p>
            When a student registers for a course on CS Labs, we collect
            personal information including the student&rsquo;s name, email
            address, phone number, and payment details. This information is
            gathered directly during the enrollment process to set up and
            manage your learning account.
          </p>
        </PolicyCard>

        <PolicyCard index="02" icon="&#9881;" title="How We Use Your Information">
          <p>The information we collect is used strictly to:</p>
          <ul className="policy-list">
            <li>Process enrollments and payments</li>
            <li>
              Provide access to course materials, live classes, and developer
              repositories
            </li>
            <li>
              Send important administrative messages such as EMI reminders
              and class schedules
            </li>
            <li>Provide customer support</li>
          </ul>
        </PolicyCard>

        <PolicyCard index="03" icon="&#128274;" title="Data Protection">
          <p>
            All payments are securely processed through recognized
            third-party payment gateways such as Razorpay. CS Labs does not
            store any credit card information or sensitive banking
            information on its own servers.
          </p>
        </PolicyCard>

        <PolicyCard index="04" icon="&#129309;" title="Sharing of Information">
          <p>
            CS Labs does not sell, trade, or rent your personal information
            to third parties. Information is shared only with trusted
            service providers, such as payment gateways and communication
            APIs, whenever necessary to operate the educational platform.
          </p>
        </PolicyCard>

        <SectionDivider />

        {/* ---------------- CONTACT CARD ---------------- */}
        <section className="contact-card reveal" aria-labelledby="contact-heading">
          <div className="contact-card-inner">
            <h2 id="contact-heading" className="contact-heading">
              Contact Information
            </h2>
            <p className="contact-subheading">
              Have a question about your privacy? Reach out to us anytime.
            </p>

            <div className="contact-rows">
              <ContactRow
                icon="&#9993;"
                label="Email"
                value="support@cslabs.in"
                href="mailto:support@cslabs.in"
              />
              <ContactRow
                icon="&#128222;"
                label="Phone"
                value="+91 99220 18908"
                href="tel:+919922018908"
              />
              <ContactRow
                icon="&#128205;"
                label="Address"
                value="Your Business Address"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="policy-footer">
        <div className="footer-inner">
          <p className="footer-brand">CS Labs</p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} CS Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
