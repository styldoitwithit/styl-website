'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getTestimonials, createDocument, updateDocument, deleteDocument } from '@/lib/firestore';
import { Testimonial } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

type TestimonialFormData = Omit<Testimonial, 'id'>;

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<TestimonialFormData>();

  const load = async () => {
    try { setItems(await getTestimonials() as Testimonial[]); } catch { toast.error('Load failed'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); reset({ author: '', role: '', company: '', quote: '', order: items.length + 1 }); setModalOpen(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    (['author', 'role', 'company', 'quote', 'order'] as (keyof TestimonialFormData)[]).forEach(k => setValue(k, t[k] as never));
    setModalOpen(true);
  };

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      editing ? await updateDocument('testimonials', editing.id, data) : await createDocument('testimonials', data);
      toast.success(editing ? 'Updated' : 'Added');
      setModalOpen(false); load();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await deleteDocument('testimonials', id); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-white">Testimonials</h2>
        <Button size="sm" onClick={openAdd}><PlusIcon className="w-4 h-4 mr-1" /> Add</Button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Author</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-right font-body text-xs text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((t) => (
              <tr key={t.id} className="hover:bg-white/2">
                <td className="px-4 py-3 font-body text-sm text-white">{t.author}</td>
                <td className="px-4 py-3 font-body text-sm text-text-secondary">{t.company}</td>
                <td className="px-4 py-3 font-body text-sm text-text-secondary">{t.role}</td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <button onClick={() => openEdit(t)} className="text-text-secondary hover:text-gold transition-colors"><PencilIcon className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="text-text-secondary hover:text-red-400 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center py-10 font-body text-sm text-text-secondary">No testimonials yet.</p>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {['author', 'role', 'company'].map(f => (
            <div key={f}>
              <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1 capitalize">{f}</label>
              <input {...register(f as keyof TestimonialFormData, { required: true })} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors" />
            </div>
          ))}
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Quote</label>
            <textarea {...register('quote', { required: true })} rows={4} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none" />
          </div>
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Order</label>
            <input type="number" {...register('order', { valueAsNumber: true })} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors" />
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
