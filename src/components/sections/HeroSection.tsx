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
          <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
            Healthcare Digital Marketing
          </span>

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

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: '150+', label: 'Clients Served' },
            { value: '15X', label: 'Average ROI' },
            { value: '15+', label: 'Years Experience' },
            { value: '45%', label: 'Lower Cost Per Lead' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 border border-border rounded-lg bg-surface/50 backdrop-blur-sm">
              <div className="font-heading text-3xl font-bold text-gold">{stat.value}</div>
              <div className="font-body text-xs text-text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary">
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-secondary to-transparent" />
      </div>
    </section>
  );
}
