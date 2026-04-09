import { Stats } from '@/types';

export function StatsBar({ stats }: { stats: Stats | null }) {
  const items = [
    { label: 'Clients Served', value: stats?.clients_served ?? '150+' },
    { label: 'Average ROI', value: stats?.average_roi ?? '15X' },
    { label: 'Video Hours Produced', value: stats?.video_hours ?? '1250+' },
    { label: 'Years Experience', value: stats?.years_experience ?? '15+' },
    { label: 'Cost Per Lead Reduction', value: stats?.cost_per_lead_reduction ?? '45%' },
  ];

  return (
    <section className="py-16 bg-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-heading text-4xl md:text-5xl font-bold text-black">{item.value}</div>
              <div className="font-body text-xs font-medium text-black/70 mt-2 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
