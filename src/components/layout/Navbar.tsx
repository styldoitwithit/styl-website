'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Clients', href: '/clients' },
  { label: 'Blog', href: '/blog' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
];

const serviceLinks = [
  { label: 'SEO & Search Visibility',       slug: 'seo' },
  { label: 'Social Media Marketing',         slug: 'social-media' },
  { label: 'Paid Ads & Lead Generation',     slug: 'paid-ads' },
  { label: 'Video Production',               slug: 'video-production' },
  { label: 'Brand Consulting',               slug: 'branding' },
  { label: 'Hospital Website Design',        slug: 'web-design' },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const dropRef                     = useRef<HTMLDivElement>(null);
  const pathname                    = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isServicesActive = pathname.startsWith('/services');
  const contactHref = pathname === '/' ? '/#contact' : '/contact';

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-3xl font-bold text-gold tracking-widest">STYL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={clsx(
                'font-body text-sm font-medium transition-colors duration-200',
                pathname === '/' ? 'text-gold' : 'text-text-secondary hover:text-white'
              )}
            >
              Home
            </Link>

            {/* Services dropdown */}
            <div
              ref={dropRef}
              className="relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button
                className={clsx(
                  'flex items-center gap-1 font-body text-sm font-medium transition-colors duration-200',
                  isServicesActive ? 'text-gold' : 'text-text-secondary hover:text-white'
                )}
              >
                Services
                <ChevronDownIcon
                  className={clsx('w-3.5 h-3.5 transition-transform duration-200', dropOpen && 'rotate-180')}
                />
              </button>

              {/* Dropdown panel */}
              {dropOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-3">
                <div className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden">
                  {/* "View all" header */}
                  <Link
                    href="/services"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center justify-between px-5 py-3 border-b border-border font-body text-sm font-semibold text-gold hover:bg-gold/5 transition-colors"
                  >
                    All Services
                    <span className="text-xs">→</span>
                  </Link>

                  {/* Individual service links */}
                  <div className="py-1">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setDropOpen(false)}
                        className={clsx(
                          'block px-5 py-2.5 font-body text-sm transition-colors duration-150',
                          pathname === `/services/${s.slug}`
                            ? 'text-gold bg-gold/5'
                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                        )}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-body text-sm font-medium transition-colors duration-200',
                  pathname === link.href ? 'text-gold' : 'text-text-secondary hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={contactHref}
              className="font-body text-sm font-medium px-5 py-2.5 border border-gold text-gold rounded-md hover:bg-gold hover:text-black transition-all duration-200"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-secondary hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'font-body text-base font-medium py-2 transition-colors',
                pathname === '/' ? 'text-gold' : 'text-text-secondary hover:text-white'
              )}
            >
              Home
            </Link>

            {/* Mobile Services accordion */}
            <div>
              <button
                onClick={() => setMobileServOpen((v) => !v)}
                className={clsx(
                  'w-full flex items-center justify-between py-2 font-body text-base font-medium transition-colors',
                  isServicesActive ? 'text-gold' : 'text-text-secondary hover:text-white'
                )}
              >
                Services
                <ChevronDownIcon className={clsx('w-4 h-4 transition-transform', mobileServOpen && 'rotate-180')} />
              </button>
              {mobileServOpen && (
                <div className="pl-4 flex flex-col gap-1 mb-1">
                  <Link
                    href="/services"
                    onClick={() => { setMenuOpen(false); setMobileServOpen(false); }}
                    className="font-body text-sm py-1.5 text-gold"
                  >
                    All Services
                  </Link>
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => { setMenuOpen(false); setMobileServOpen(false); }}
                      className="font-body text-sm py-1.5 text-text-secondary hover:text-white transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'font-body text-base font-medium py-2 transition-colors duration-200',
                  pathname === link.href ? 'text-gold' : 'text-text-secondary hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={contactHref}
              onClick={() => setMenuOpen(false)}
              className="mt-2 font-body text-base font-medium px-5 py-2.5 border border-gold text-gold rounded-md text-center hover:bg-gold hover:text-black transition-all duration-200"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
