'use client';
import Image from 'next/image';
import { Client } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';

function ClientLogo({ client }: { client: Client }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-48 h-20 mx-4 bg-surface border border-border rounded-lg px-6">
      {client.logo ? (
        <div className="relative w-full h-full">
          <Image
            src={client.logo}
            alt={client.name}
            fill
            className="object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <span className="font-body text-xs font-medium text-text-secondary text-center leading-tight">
          {client.name}
        </span>
      )}
    </div>
  );
}

export function ClientCarousel({ clients }: { clients: Client[] }) {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-20 bg-surface border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeading title="Our Clients" subtitle="Trusted by leading healthcare institutions across India" />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[scroll-left_30s_linear_infinite]">
          {doubled.map((client, i) => (
            <ClientLogo key={`${client.id}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
