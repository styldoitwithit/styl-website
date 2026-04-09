'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Blog', href: '/blog' },
  { label: 'Process', href: '/process' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-body text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-gold'
                    : 'text-text-secondary hover:text-white'
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
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'font-body text-base font-medium transition-colors duration-200',
                  pathname === link.href ? 'text-gold' : 'text-text-secondary hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={contactHref}
              onClick={() => setMenuOpen(false)}
              className="font-body text-base font-medium px-5 py-2.5 border border-gold text-gold rounded-md text-center hover:bg-gold hover:text-black transition-all duration-200"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
