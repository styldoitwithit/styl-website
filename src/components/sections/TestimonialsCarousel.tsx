'use client';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { Testimonial } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  const initials = t.author
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <section className="pt-10 pb-24 bg-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Client Voices" goldAccent />

        <div className="mt-16 relative">
          <div className="bg-background/60 border border-gold/20 rounded-2xl p-10 md:p-14">
            <ChatBubbleLeftEllipsisIcon className="w-12 h-12 text-gold/30 mb-6" />

            <blockquote className="font-heading text-xl md:text-2xl text-white leading-relaxed italic mb-10">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shrink-0">
                <span className="font-heading text-base font-bold text-black">{initials}</span>
              </div>
              <div>
                <p className="font-body font-semibold text-white">{t.author}</p>
                <p className="font-body text-sm text-text-secondary">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-gold' : 'w-3 bg-border'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border text-text-secondary hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border text-text-secondary hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-200"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
