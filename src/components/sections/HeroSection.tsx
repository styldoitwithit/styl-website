'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(26,26,46,0.6)_0%,transparent_60%)]" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-navy/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
