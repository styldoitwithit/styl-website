'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { getStats, setDocument } from '@/lib/firestore';
import { Stats } from '@/types';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

type StatsFormData = Omit<Stats, 'id'>;

const fields: { field: keyof StatsFormData; label: string }[] = [
  { field: 'clients_served', label: 'Clients Served' },
  { field: 'average_roi', label: 'Average ROI' },
  { field: 'video_hours', label: 'Video Hours Produced' },
  { field: 'years_experience', label: 'Years of Experience' },
  { field: 'cost_per_lead_reduction', label: 'Cost Per Lead Reduction' },
];

export function StatsManager() {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<StatsFormData>();

  useEffect(() => {
    getStats().then((data) => {
      if (data) reset(data as unknown as StatsFormData);
    }).catch(() => toast.error('Load failed')).finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: StatsFormData) => {
    try {
      await setDocument('stats', 'main', data);
      toast.success('Stats updated');
    } catch { toast.error('Update failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <h2 className="font-heading text-2xl text-white mb-6">Stats</h2>
      <div className="bg-surface border border-border rounded-xl p-8 max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map(({ field, label }) => (
            <div key={field}>
              <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">{label}</label>
              <input
                {...register(field, { required: true })}
                className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. 150+"
              />
            </div>
          ))}
          <Button type="submit" size="md" className="mt-4">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
