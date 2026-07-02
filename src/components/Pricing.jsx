import React, { useEffect, useRef, useState } from "react";
import "./Pricing.css";

/* ------------------------------------------------------------------
   Reveal-on-scroll hook — adds "is-visible" to any ".reveal" element
   inside the page once it enters the viewport.
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
   Animated counter — counts up to a target value once it scrolls
   into view. Supports an optional prefix/suffix (e.g. "₹", "+").
------------------------------------------------------------------- */
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1400 }) {
  const [display, setDisplay] = useState(0);
  const spanRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();

            const step = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(value * eased));
              if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={spanRef} className="counter">
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Presentational sub-components
------------------------------------------------------------------- */

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

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading reveal">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function HeroIllustration() {
  return (
    <svg
      className="hero-illustration-svg"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Education and software engineering illustration"
    >
      <defs>
        <linearGradient id="capGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A1432" />
          <stop offset="100%" stopColor="#5B0F24" />
        </linearGradient>
        <linearGradient id="capGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="220" rx="80" ry="12" fill="#7A1432" opacity="0.08" />

      {/* orbiting code brackets */}
      <g className="orbit-ring" opacity="0.35">
        <circle cx="120" cy="120" r="96" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="4 8" fill="none" />
      </g>

      {/* graduation cap */}
      <g className="cap-float">
        <path d="M120 58 L206 92 L120 126 L34 92 Z" fill="url(#capGradient)" />
        <path d="M120 58 L206 92 L120 126 L34 92 Z" fill="url(#capGlow)" opacity="0.5" />
        <path d="M64 102 V138 C64 150 90 160 120 160 C150 160 176 150 176 138 V102" stroke="#5B0F24" strokeWidth="4" fill="none" opacity="0.5" />
        <line x1="196" y1="98" x2="196" y2="150" stroke="#D4AF37" strokeWidth="3" />
        <circle cx="196" cy="156" r="5" fill="#D4AF37" />
      </g>

      {/* floating code tag */}
      <g className="tag-float-1">
        <rect x="26" y="150" width="54" height="34" rx="8" fill="#ffffff" stroke="#D4AF37" strokeWidth="1.5" />
        <text x="53" y="172" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="#7A1432">&lt;/&gt;</text>
      </g>

      {/* floating check tag */}
      <g className="tag-float-2">
        <circle cx="188" cy="182" r="20" fill="#7A1432" />
        <path d="M179 182 L186 189 L198 173" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function OverviewCard({ icon, label, children }) {
  return (
    <div className="overview-card reveal">
      <span className="overview-icon" aria-hidden="true">
        {icon}
      </span>
      <p className="overview-value">{children}</p>
      <p className="overview-label">{label}</p>
    </div>
  );
}

function FeatureItem({ icon, children }) {
  return (
    <li className="feature-item">
      <span className="feature-icon" aria-hidden="true">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

function PricingCard({
  featured,
  special,
  ribbon,
  goldBadge,
  title,
  price,
  priceNote,
  description,
  highlight,
  features,
  ctaLabel,
}) {
  return (
    <article
      className={
        "pricing-card reveal" +
        (featured ? " pricing-card-featured" : "") +
        (special ? " pricing-card-special" : "")
      }
    >
      {ribbon && <span className="pricing-ribbon">{ribbon}</span>}
      {goldBadge && <span className="pricing-gold-badge">{goldBadge}</span>}

      <h3 className="pricing-card-title">{title}</h3>

      <div className="pricing-card-price">
        <span className="price-amount">{price}</span>
        {priceNote && <span className="price-note">{priceNote}</span>}
      </div>

      {description && <p className="pricing-card-description">{description}</p>}

      {highlight && <div className="pricing-highlight-note">{highlight}</div>}

      <ul className="pricing-feature-list">
        {features.map((f, i) => (
          <FeatureItem icon={f.icon} key={i}>
            {f.text}
          </FeatureItem>
        ))}
      </ul>

      <button type="button" className="pricing-cta-btn">
        {ctaLabel}
      </button>
    </article>
  );
}

function EmiCard({ title, steps }) {
  return (
    <div className="emi-card reveal">
      <h3 className="emi-card-title">{title}</h3>
      <div className="emi-timeline">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="emi-step">
              <span className="emi-step-dot" aria-hidden="true" />
              <div className="emi-step-text">
                <span className="emi-step-amount">{step.amount}</span>
                <span className="emi-step-label">{step.label}</span>
              </div>
            </div>
            {i < steps.length - 1 && <span className="emi-connector" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function NoteCard({ icon, children }) {
  return (
    <div className="note-card reveal">
      <span className="note-icon" aria-hidden="true">
        {icon}
      </span>
      <p>{children}</p>
    </div>
  );
}

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={"faq-item reveal" + (isOpen ? " faq-item-open" : "")}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="faq-icon" aria-hidden="true">
          {isOpen ? "\u2212" : "+"}
        </span>
      </button>
      <div
        className="faq-answer"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="faq-answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
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
   Data
------------------------------------------------------------------- */

const FAQS = [
  {
    q: "Can I reserve my seat?",
    a: "Yes. Under the Reserve Your Seat offer, you can pay the full ₹8,000 upfront or pay ₹5,000 initially to reserve your seat. This offer is available for the first 5 students only.",
  },
  {
    q: "When do I need to pay for Individual Subjects?",
    a: "Payment for an Individual Subject (DSA, OS, or DBMS) is required only when the selected subject begins, giving you flexibility to plan your payment around your schedule.",
  },
  {
    q: "Is EMI available for every course?",
    a: "No. EMI facility is available only for the complete mentorship programs (Reserve Your Seat and Regular Admission). It is not applicable for Individual Subjects or the TOC + Compiler Design Package.",
  },
  {
    q: "How many early reservation seats are available?",
    a: "Early Reservation under the Reserve Your Seat offer is limited to only the first five students.",
  },
  {
    q: "Can I upgrade from an Individual Subject to the complete program?",
    a: "If applicable, students who start with an Individual Subject and wish to continue with the remaining payment plan can do so as per the eligibility described in the Reserve Your Seat plan.",
  },
];

/* ------------------------------------------------------------------
   Main Page Component
------------------------------------------------------------------- */

export default function Pricing({ onEnroll, onContact, onApply }) {
  const revealContainerRef = useRevealOnScroll();
  const [openFaq, setOpenFaq] = useState(0);

  const handleEnroll = () => {
    if (typeof onEnroll === "function") onEnroll();
  };

  const handleContact = () => {
    if (typeof onContact === "function") onContact();
  };

  const handleApply = () => {
    if (typeof onApply === "function") onApply();
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="pricing-page" ref={revealContainerRef}>
      {/* Floating ambient background shapes */}
      <div className="bg-shapes" aria-hidden="true">
        <span className="floating-shape shape-1" />
        <span className="floating-shape shape-2" />
        <span className="floating-shape shape-3" />
        <span className="floating-shape shape-4" />
      </div>

      {/* ================= HERO ================= */}
      <header className="pricing-hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">CS Labs &middot; Pricing</p>
            <h1 className="hero-title">
              Choose Your <span className="hero-title-accent">Learning Path</span>
            </h1>
            <p className="hero-subtitle">
              Flexible pricing designed for ambitious Computer Science
              students preparing for GATE and building strong technical
              foundations.
            </p>
            <p className="hero-updated">Last Updated: July 2026</p>

            <div className="trust-badges">
              <TrustBadge icon="&#128176;" label="Affordable Learning" />
              <TrustBadge icon="&#9203;" label="Limited Seats" />
              <TrustBadge icon="&#128179;" label="Flexible Payments" />
              <TrustBadge icon="&#127942;" label="Premium Mentorship" />
            </div>

            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={handleEnroll}>
                Enroll Now
              </button>
              <button type="button" className="btn-secondary" onClick={handleContact}>
                Contact Us
              </button>
            </div>
          </div>

          <div className="hero-illustration">
            <div className="illustration-glow" aria-hidden="true" />
            <HeroIllustration />
          </div>
        </div>
      </header>

      <main>
        {/* ================= PRICING OVERVIEW ================= */}
        <section className="pricing-overview">
          <div className="overview-grid">
            <OverviewCard icon="&#8377;" label="Starting From">
              <AnimatedCounter value={3000} prefix="\u20B9" />
            </OverviewCard>
            <OverviewCard icon="&#128101;" label="Limited Batch Size">
              Small Cohorts
            </OverviewCard>
            <OverviewCard icon="&#128197;" label="Flexible EMI Available">
              2-Step Plans
            </OverviewCard>
            <OverviewCard icon="&#127891;" label="Premium Mentorship Program">
              1:1 Guidance
            </OverviewCard>
          </div>
        </section>

        <div className="content-shell">
          <SectionDivider />

          {/* ================= PRICING PLANS ================= */}
          <section aria-labelledby="plans-heading">
            <SectionHeading
              eyebrow="Pricing Plans"
              title="Featured Pricing Plans"
              subtitle="Pick the path that fits your goals — from a fully reserved mentorship seat to focused individual subjects."
            />

            <div className="pricing-grid">
              <PricingCard
                featured
                ribbon="Limited Seat Offer"
                title="Reserve Your Seat"
                price="8,000"
                priceNote="Upfront"
                description="For students who genuinely want to secure the opportunity — pay in full or reserve now."
                highlight="Available for the first 5 students only."
                features={[
                  { icon: "\u2713", text: "Pay the full 8,000 upfront, or 5,000 initially to reserve your seat" },
                  { icon: "\u2713", text: "Priority seat reservation" },
                  { icon: "\u2713", text: "Access to the mentorship program" },
                  { icon: "\u2713", text: "Eligibility to continue with the remaining payment plan, if applicable" },
                ]}
                ctaLabel="Apply Now"
              />

              <PricingCard
                title="Regular Admission"
                price="10,000"
                description="The standard fee for students joining after the early reservation seats are filled."
                features={[
                  { icon: "\u2713", text: "Full mentorship access" },
                  { icon: "\u2713", text: "Structured learning path" },
                  { icon: "\u2713", text: "Doubt support" },
                  { icon: "\u2713", text: "Complete program participation" },
                ]}
                ctaLabel="Enroll Now"
              />

              <PricingCard
                title="Individual Subject"
                price="3,000"
                description="Enroll in one individual subject and pay only when that subject begins."
                features={[
                  { icon: "\u2699", text: "Data Structures & Algorithms (DSA)" },
                  { icon: "\u2699", text: "Operating Systems (OS)" },
                  { icon: "\u2699", text: "Database Management Systems (DBMS)" },
                  { icon: "\u2717", text: "EMI is not available for individual subject enrollment" },
                ]}
                ctaLabel="Enroll Now"
              />

              <PricingCard
                special
                goldBadge="Most Recommended"
                title="TOC + Compiler Design Package"
                price="5,000"
                description="Learn Theory of Computation and Compiler Design together, with a \u20B91,000 discount compared to the normal combined pricing."
                features={[
                  { icon: "\u2713", text: "\u20B91,000 discount vs. normal combined pricing" },
                  { icon: "\u2713", text: "Pay when this subject package begins" },
                  { icon: "\u2713", text: "Theory of Computation, taught alongside Compiler Design for stronger conceptual links" },
                  { icon: "\u2717", text: "EMI is not available for this package" },
                ]}
                ctaLabel="Enroll Now"
              />
            </div>
          </section>

          <SectionDivider />

          {/* ================= EMI OPTIONS ================= */}
          <section aria-labelledby="emi-heading">
            <SectionHeading
              eyebrow="Payment Flexibility"
              title="EMI Options"
              subtitle="Split your mentorship program fee into two simple payments."
            />

            <div className="emi-grid">
              <EmiCard
                title="\u20B98,000 Plan"
                steps={[
                  { amount: "\u20B95,000", label: "Initial payment" },
                  { amount: "\u20B93,000", label: "Second installment" },
                ]}
              />
              <EmiCard
                title="\u20B910,000 Plan"
                steps={[
                  { amount: "\u20B95,000", label: "Initial payment" },
                  { amount: "\u20B95,000", label: "Second installment" },
                ]}
              />
            </div>

            <div className="emi-info-card reveal">
              <span className="emi-info-icon" aria-hidden="true">&#8505;</span>
              <p>
                EMI facility is available only for the complete mentorship
                programs and is not applicable for Individual Subjects or
                the TOC + Compiler Design Package.
              </p>
            </div>
          </section>

          <SectionDivider />

          {/* ================= IMPORTANT NOTES ================= */}
          <section aria-labelledby="notes-heading">
            <SectionHeading eyebrow="Good to Know" title="Important Notes" />

            <div className="notes-grid">
              <NoteCard icon="&#9200;">
                Early Reservation is limited to only the first five students.
              </NoteCard>
              <NoteCard icon="&#128203;">
                Individual Subject fees become payable when that subject begins.
              </NoteCard>
              <NoteCard icon="&#128218;">
                TOC + Compiler Design Package also becomes payable when the course starts.
              </NoteCard>
              <NoteCard icon="&#8377;">
                Regular Admission Fee is {"\u20B9"}10,000.
              </NoteCard>
              <NoteCard icon="&#128179;">
                EMI options are available only where specifically mentioned.
              </NoteCard>
            </div>
          </section>

          <SectionDivider />

          {/* ================= FAQ ================= */}
          <section aria-labelledby="faq-heading">
            <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />

            <div className="faq-list">
              {FAQS.map((item, i) => (
                <FaqItem
                  key={i}
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => toggleFaq(i)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* ================= CTA ================= */}
        <section className="cta-section">
          <div className="cta-inner reveal">
            <h2 className="cta-title">Start Your Journey with CS Labs Today</h2>
            <p className="cta-subtitle">
              Seats are limited — reserve yours before the batch fills up
              and take the first step toward mastering your Computer
              Science fundamentals.
            </p>
            <div className="cta-actions">
              <button type="button" className="btn-primary btn-on-dark" onClick={handleApply}>
                Apply Now
              </button>
              <button type="button" className="btn-secondary btn-on-dark" onClick={handleContact}>
                Contact Support
              </button>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <div className="content-shell">
          <section className="contact-card reveal" aria-labelledby="contact-heading">
            <div className="contact-card-inner">
              <h2 id="contact-heading" className="contact-heading">
                Contact Information
              </h2>
              <p className="contact-subheading">
                Have a question about pricing or enrollment? Reach out to us anytime.
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
                <ContactRow icon="&#128205;" label="Address" value="Your Business Address" />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="pricing-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            &copy; 2026 CS Labs | Learn &bull; Practice &bull; Master
          </p>
        </div>
      </footer>
    </div>
  );
}
