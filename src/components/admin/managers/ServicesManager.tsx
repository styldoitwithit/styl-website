'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/outline';
import { getServices, updateDocument } from '@/lib/firestore';
import { Service } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface ServiceFormData {
  title: string;
  summary: string;
  bulletsText: string;
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const { register, handleSubmit, setValue } = useForm<ServiceFormData>();

  const load = async () => {
    try { setServices(await getServices() as Service[]); } catch { toast.error('Load failed'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openEdit = (s: Service) => {
    setEditing(s);
    setValue('title', s.title);
    setValue('summary', s.summary);
    setValue('bulletsText', s.bullets.join('\n'));
    setModalOpen(true);
  };

  const onSubmit = async (data: ServiceFormData) => {
    if (!editing) return;
    try {
      const bullets = data.bulletsText.split('\n').map(b => b.trim()).filter(Boolean);
      await updateDocument('services', editing.id, { title: data.title, summary: data.summary, bullets });
      toast.success('Service updated');
      setModalOpen(false); load();
    } catch { toast.error('Update failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-white">Services</h2>
        <span className="font-body text-xs text-text-secondary">Edit content only (slug is locked)</span>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Slug</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-right font-body text-xs text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-white/2">
                <td className="px-4 py-3 font-body text-sm text-gold">{s.slug}</td>
                <td className="px-4 py-3 font-body text-sm text-white">{s.title}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(s)} className="text-text-secondary hover:text-gold transition-colors"><PencilIcon className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit Service">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Title</label>
            <input {...register('title', { required: true })} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors" />
          </div>
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Summary</label>
            <textarea {...register('summary')} rows={2} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none" />
          </div>
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Bullets (one per line)</label>
            <textarea {...register('bulletsText')} rows={5} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
