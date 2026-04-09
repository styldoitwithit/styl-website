'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CaseStudy } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';

export function CaseStudySlider({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [current, setCurrent] = useState(0);

  if (!caseStudies.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? caseStudies.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === caseStudies.length - 1 ? 0 : c + 1));

  const study = caseStudies[current];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Client Success Stories" subtitle="Real results for real healthcare brands" />

        <div className="mt-16 relative">
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: client info */}
              <div className="md:w-1/3 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  {study.logo ? (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image src={study.logo} alt={study.client} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center">
                      <span className="font-body text-xs text-gold font-bold text-center leading-tight px-1">
                        {study.client.slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading text-xl text-white">{study.client}</h3>
                    <Badge variant="gold">{study.category}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-body text-xs font-medium text-gold uppercase tracking-wider mb-2">Challenge</p>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium text-gold uppercase tracking-wider mb-2">Strategy</p>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{study.strategy}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium text-gold uppercase tracking-wider mb-2">Result</p>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{study.result}</p>
                  </div>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="md:w-2/3 flex flex-col justify-center">
                <p className="font-body text-xs font-medium text-gold uppercase tracking-wider mb-6">Key Metrics</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {study.metrics.map((metric, i) => (
                    <MetricCard
                      key={i}
                      value={metric.value}
                      label={metric.label}
                      direction={metric.direction}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {caseStudies.map((_, i) => (
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
