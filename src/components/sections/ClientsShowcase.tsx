"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Metric {
  label: string;
  value: string;
  arrow?: "↑" | "↓";
}

interface CaseStudy {
  challenge: string;
  strategy: string;
  result: string;
  metrics: Metric[];
}

interface Slide {
  name: string;
  logo: string | null;
  logoInitials?: string;
  quote: string;
  caseStudy: CaseStudy;
}

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    name: "ATLAS HOSPITALS",
    logo: "/assets/ATLAS.jpeg",
    quote:
      "As a doctor, I was looking for a reliable digital marketing team to grow my hospital's online presence. This team did an excellent job with Google Ads, social media marketing, and patient engagement. I've seen a noticeable increase in appointments and inquiries. Highly recommended for healthcare marketing!",
    caseStudy: {
      challenge:
        "Low patient acquisition rate and declining referral numbers across outpatient departments.",
      strategy:
        "Deployed a targeted paid ads campaign combined with a referral incentive programme across key catchment areas.",
      result:
        "Significant growth in new patient registrations within the first 60 days of the campaign.",
      metrics: [
        { label: "ROI", value: "320%", arrow: "↑" },
        { label: "Leads Generated", value: "250+", arrow: "↑" },
        { label: "Growth Rate", value: "40%", arrow: "↑" },
        { label: "Cost Per Lead", value: "60%", arrow: "↓" },
      ],
    },
  },
  {
    name: "DR ANILKUMAR EYE HOSPITAL",
    logo: "/assets/DR ANILKUMAR EYE HOSPITAL.jpg",
    quote:
      "Great team to work with! They understood our hospital needs perfectly and delivered good results. Our online visibility has improved a lot, and we are getting more patient inquiries now.",
    caseStudy: {
      challenge:
        "Struggling to convert online enquiries into booked appointments despite high website traffic.",
      strategy:
        "Redesigned the enquiry funnel and introduced automated follow-up sequences to nurture leads effectively.",
      result:
        "Conversion rate tripled within 45 days, with a measurable drop in enquiry response time.",
      metrics: [
        { label: "Conversion Rate", value: "3×", arrow: "↑" },
        { label: "Appointments Booked", value: "180+", arrow: "↑" },
        { label: "Faster Response", value: "55%", arrow: "↑" },
        { label: "Revenue Growth", value: "28%", arrow: "↑" },
      ],
    },
  },
  {
    name: "MUKESH ARTHRO CARE HOSPITAL",
    logo: "/assets/MAC.jpg",
    quote:
      "Exceptional insight. Our partnership has been one of the best decisions we have made as an organisation. The team truly understands healthcare marketing in the Indian market.",
    caseStudy: {
      challenge:
        "Lack of brand visibility in a competitive regional market with multiple established providers.",
      strategy:
        "Executed a brand awareness campaign including content marketing, local SEO, and community events.",
      result:
        "Brand recall improved substantially and organic search traffic increased month on month.",
      metrics: [
        { label: "Search Visibility", value: "5×", arrow: "↑" },
        { label: "New Patients", value: "400+", arrow: "↑" },
        { label: "Organic Traffic", value: "70%", arrow: "↑" },
        { label: "Brand Recall", value: "45%", arrow: "↑" },
      ],
    },
  },
  {
    name: "SRI RAMAKRISHNA SPECIALTY HOSPITALS",
    logo: "/assets/SRI RAMAKRISHNA SPECIALTY HOSPITALS.jpg",
    quote:
      "We partnered with this digital marketing team to enhance our hospital's online reach. Their strategies in SEO, Google Ads, and social media have significantly improved our patient inflow.",
    caseStudy: {
      challenge:
        "High staff turnover and inconsistent service delivery impacting patient satisfaction scores.",
      strategy:
        "Introduced a structured training programme and internal performance framework across all departments.",
      result:
        "Staff retention improved significantly and patient satisfaction scores reached an all-time high.",
      metrics: [
        { label: "Staff Turnover", value: "35%", arrow: "↓" },
        { label: "Patient Satisfaction", value: "92%", arrow: "↑" },
        { label: "Training Completion", value: "60%", arrow: "↑" },
        { label: "Team Performance", value: "30%", arrow: "↑" },
      ],
    },
  },
  {
    name: "SHREE CLINIC",
    logo: "/assets/SHREE-FAWC.jpeg",
    logoInitials: "SC",
    quote:
      "Their team is reliable, responsive, and understanding of the sensitivity of healthcare communication. Their approach has genuinely helped us expand our reach and build stronger patient engagement.",
    caseStudy: {
      challenge:
        "Limited digital presence in a competitive fertility care market with strong word-of-mouth dependency.",
      strategy:
        "Developed a comprehensive SEO and social media content strategy emphasising patient education and trust-building.",
      result:
        "Online enquiries grew substantially within 90 days, establishing a strong digital brand in fertility care.",
      metrics: [
        { label: "Online Enquiries", value: "200+", arrow: "↑" },
        { label: "Social Reach", value: "3×", arrow: "↑" },
        { label: "Website Traffic", value: "65%", arrow: "↑" },
        { label: "Appointment Rate", value: "40%", arrow: "↑" },
      ],
    },
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const COUNT = SLIDES.length;
const LOOPED = [...SLIDES, ...SLIDES, ...SLIDES];
const START = COUNT; // start in middle set

const CARD_W = 380;
const CARD_GAP = 24;

// ─── Logo box (shared between card & panel) ───────────────────────────────────

function LogoBox({ slide, size }: { slide: Slide; size: 48 | 64 }) {
  // Card logo (sm): wide rectangular display — 220×50
  // Panel logo (lg): compact square — 64×64
  const w = size === 64 ? 64 : 220;
  const h = size === 64 ? 64 : 50;

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: size === 64 ? 8 : 10,
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {slide.logo ? (
        <Image
          src={slide.logo}
          alt={slide.name}
          fill
          style={{ objectFit: "contain" }}
          sizes={`${w}px`}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: size === 64 ? "1.5rem" : "1.2rem",
              fontWeight: 700,
              color: "#c9a84c",
            }}
          >
            {slide.logoInitials ?? slide.name.slice(0, 2)}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ClientsShowcase() {
  const [pos, setPos] = useState(START);
  const [smooth, setSmooth] = useState(true);
  const [paused, setPaused] = useState(false);
  const [containerW, setContainerW] = useState(0);
  const [ready, setReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Measure carousel viewport
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setContainerW(e.contentRect.width);
      setReady(true);
    });
    ro.observe(el);
    setContainerW(el.clientWidth);
    setReady(true);
    return () => ro.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => setPos((p) => p + 1), 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  // Re-enable smooth on next frame after a silent snap
  useEffect(() => {
    if (!smooth) {
      const id = requestAnimationFrame(() => setSmooth(true));
      return () => cancelAnimationFrame(id);
    }
  }, [smooth]);

  // Infinite-loop snap after transition ends
  const onTransitionEnd = useCallback(() => {
    if (pos < COUNT) {
      setSmooth(false);
      setPos(pos + COUNT);
    } else if (pos >= COUNT * 2) {
      setSmooth(false);
      setPos(pos - COUNT);
    }
  }, [pos]);

  const handlePrev = () => setPos((p) => p - 1);
  const handleNext = () => setPos((p) => p + 1);
  const goToDot = (i: number) => {
    setSmooth(true);
    setPos(COUNT + i);
  };
  const goToCard = (loopIdx: number) => {
    setSmooth(true);
    setPos(COUNT + (loopIdx % COUNT));
  };

  const activeIdx = ((pos % COUNT) + COUNT) % COUNT;
  const trackOffset = containerW
    ? containerW / 2 - CARD_W / 2 - pos * (CARD_W + CARD_GAP)
    : 0;

  // Arrow button styles
  const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    [side]: 12,
    top: "50%",
    transform: "translateY(-60%)",
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    transition: "background 250ms ease",
  });

  return (
    <section
      style={{
        background: "#0a0a0f",
        paddingTop: 30,
        paddingBottom: 30,
        overflow: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Heading ─────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", paddingBottom: 0 }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: 0,
          }}
        >
          Our Clients
        </h2>
      </div>

      {/* ── TOP: Carousel ───────────────────────────────────────── */}
      <div style={{ position: "relative", paddingBottom: 48 }}>
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous"
          style={arrowStyle("left")}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "#c9a84c")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.08)")
          }
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          aria-label="Next"
          style={arrowStyle("right")}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "#c9a84c")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.08)")
          }
        >
          ›
        </button>

        {/* Viewport — full width, overflow hidden */}
        <div
          ref={viewportRef}
          style={{
            overflow: "hidden",
            width: "100%",
            cursor: "grab",
            opacity: ready ? 1 : 0,
            transition: "opacity 200ms",
          }}
        >
          <div
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: CARD_GAP,
              transform: `translateX(${trackOffset}px)`,
              transition: smooth
                ? "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)"
                : "none",
              willChange: "transform",
              padding: "20px 0",
            }}
          >
            {LOOPED.map((slide, idx) => {
              const isActive = idx === pos;
              return (
                <div
                  key={idx}
                  onClick={() => goToCard(idx)}
                  style={{
                    flex: `0 0 ${CARD_W}px`,
                    background: isActive
                      ? "#111124"
                      : "linear-gradient(145deg, #111118, #0d0d16)",
                    border: `1.5px solid ${isActive ? "rgba(255,255,255,0.3)" : "#1e1e2e"}`,
                    borderRadius: 16,
                    padding: 28,
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    cursor: isActive ? "default" : "pointer",
                    transform: isActive ? "scale(1)" : "scale(0.93)",
                    transition:
                      "background 400ms ease, border-color 400ms ease, transform 400ms ease",
                    userSelect: "none",
                  }}
                >
                  {/* 1. Logo — 48×48 */}
                  <LogoBox slide={slide} size={48} />

                  {/* 2. Hospital name */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      margin: 0,
                    }}
                  >
                    {slide.name}
                  </p>

                  {/* 3. Review */}
                  <p
                    style={
                      {
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.88rem",
                        color: "#a0aec0",
                        lineHeight: 1.7,
                        margin: 0,
                        flex: 1,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                      } as React.CSSProperties
                    }
                  >
                    {slide.quote}
                  </p>

                  {/* 4. Stars */}
                  <div
                    style={{
                      color: "#f6c90e",
                      fontSize: "1.1rem",
                      letterSpacing: 2,
                    }}
                  >
                    ★★★★★
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            position: "absolute",
            bottom: 12,
            left: 0,
            right: 0,
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  i === activeIdx ? "#c9a84c" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transform: i === activeIdx ? "scale(1.35)" : "scale(1)",
                transition: "background 300ms ease, transform 300ms ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Case study panels (cross-fade) ──────────────── */}
      <div style={{ position: "relative", margin: "0 40px", minHeight: 220 }}>
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(145deg, #111118, #0d0d16)",
              border: "1.5px solid #1e1e2e",
              borderRadius: 16,
              padding: "28px 40px",
              display: "flex",
              gap: 36,
              opacity: idx === activeIdx ? 1 : 0,
              pointerEvents: idx === activeIdx ? "auto" : "none",
              transition: "opacity 400ms ease",
              minHeight: 200,
            }}
          >
            {/* Left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 10,
                minWidth: 140,
                maxWidth: 160,
              }}
            >
              <LogoBox slide={slide} size={64} />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {slide.name}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#c9a84c",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                Healthcare
              </p>
            </div>

            {/* Right */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Challenge / Strategy / Result */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { heading: "Challenge", body: slide.caseStudy.challenge },
                  { heading: "Strategy", body: slide.caseStudy.strategy },
                  { heading: "Result", body: slide.caseStudy.result },
                ].map(({ heading, body }) => (
                  <div key={heading} style={{ flex: 1, minWidth: 160 }}>
                    <h4
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#c9a84c",
                        margin: "0 0 6px 0",
                      }}
                    >
                      {heading}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.88rem",
                        color: "#a0aec0",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Metrics row */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: 20,
                  flexWrap: "wrap",
                }}
              >
                {slide.caseStudy.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      minWidth: 100,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "baseline",
                        gap: 3,
                      }}
                    >
                      {m.arrow && (
                        <span
                          style={{
                            fontSize: "1rem",
                            color: m.arrow === "↑" ? "#4ade80" : "#fbbf24",
                          }}
                        >
                          {m.arrow}
                        </span>
                      )}
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
