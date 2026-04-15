'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Place your video file in public/assets/ with this exact filename.
// It is gitignored so it won't be pushed to GitHub.
// For production, swap this for a Firebase Storage or CDN URL.
const VIDEO_SRC = '/assets/hero-bg.mp4';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Video background ──────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Dark overlay for text legibility ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,10,15,0.65) 0%, rgba(10,10,15,0.55) 60%, rgba(10,10,15,0.85) 100%)',
        }}
      />

      {/* ── Gold gradient accents ─────────────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: 'none' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(26,26,46,0.4)_0%,transparent_60%)]" />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-[1.1] text-white mb-6">
            India&apos;s No.1{' '}
            <span className="text-gold italic">Healthcare</span>
            <br />
            Branding Expert for
            <br />
            Hospitals &amp; Doctors
          </h1>

          <p className="font-body text-base md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            We help healthcare brands grow with precision-targeted digital marketing, brand strategy,
            and patient acquisition campaigns that deliver measurable ROI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200 text-base"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="font-body font-medium px-8 py-4 border border-white/20 text-white rounded-md hover:border-gold hover:text-gold transition-all duration-200 text-base"
            >
              Our Services
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
