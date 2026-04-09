'use client';
import { useEffect, useState } from 'react';
import { getCollectionCount } from '@/lib/firestore';
import { Spinner } from '@/components/ui/Spinner';
import { UserGroupIcon, ChatBubbleLeftIcon, ChartBarIcon, BriefcaseIcon, DocumentTextIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const collections = [
  { name: 'clients', label: 'Clients', icon: UserGroupIcon },
  { name: 'testimonials', label: 'Testimonials', icon: ChatBubbleLeftIcon },
  { name: 'case_studies', label: 'Case Studies', icon: ChartBarIcon },
  { name: 'services', label: 'Services', icon: BriefcaseIcon },
  { name: 'blog_posts', label: 'Blog Posts', icon: DocumentTextIcon },
  { name: 'contact_submissions', label: 'Submissions', icon: EnvelopeIcon },
];

export function DashboardOverview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      collections.map(c => getCollectionCount(c.name).then(n => [c.name, n] as [string, number]))
    ).then(results => {
      setCounts(Object.fromEntries(results));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <h2 className="font-heading text-2xl text-white mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {collections.map(({ name, label, icon: Icon }) => (
          <div key={name} className="bg-surface border border-border rounded-xl p-6 hover:border-gold/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <span className="font-body text-sm text-text-secondary">{label}</span>
            </div>
            <p className="font-heading text-4xl font-bold text-white">{counts[name] ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
