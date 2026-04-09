import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
              Get In Touch
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
              Start Your{' '}
              <span className="text-gold italic">Growth Journey</span>
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Tell us about your hospital and what you want to achieve. We&apos;ll come back with a clear strategy.
            </p>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
