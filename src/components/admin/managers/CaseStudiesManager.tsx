'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getCaseStudies, createDocument, updateDocument, deleteDocument } from '@/lib/firestore';
import { CaseStudy } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface CaseStudyFormData {
  client: string;
  logo: string;
  category: string;
  challenge: string;
  strategy: string;
  result: string;
  metricsText: string;
  order: number;
}

export function CaseStudiesManager() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<CaseStudyFormData>();

  const load = async () => {
    try { setItems(await getCaseStudies() as CaseStudy[]); } catch { toast.error('Load failed'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    reset({ client: '', logo: '', category: 'Healthcare', challenge: '', strategy: '', result: '', metricsText: 'ROI: 300% (up)\nLeads: 100+ (up)', order: items.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (cs: CaseStudy) => {
    setEditing(cs);
    setValue('client', cs.client); setValue('logo', cs.logo); setValue('category', cs.category);
    setValue('challenge', cs.challenge); setValue('strategy', cs.strategy); setValue('result', cs.result);
    setValue('order', cs.order);
    setValue('metricsText', cs.metrics.map(m => `${m.label}: ${m.value} (${m.direction})`).join('\n'));
    setModalOpen(true);
  };

  const parseMetrics = (text: string) => {
    return text.split('\n').filter(Boolean).map(line => {
      const match = line.match(/^(.+?):\s*(.+?)\s*\((up|down)\)$/);
      if (!match) return { label: line, value: '', direction: 'up' as const };
      return { label: match[1].trim(), value: match[2].trim(), direction: match[3] as 'up' | 'down' };
    });
  };

  const onSubmit = async (data: CaseStudyFormData) => {
    try {
      const { metricsText, ...rest } = data;
      const metrics = parseMetrics(metricsText);
      const payload = { ...rest, metrics };
      editing ? await updateDocument('case_studies', editing.id, payload) : await createDocument('case_studies', payload);
      toast.success(editing ? 'Updated' : 'Created');
      setModalOpen(false); load();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await deleteDocument('case_studies', id); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-white">Case Studies</h2>
        <Button size="sm" onClick={openAdd}><PlusIcon className="w-4 h-4 mr-1" /> Add</Button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-right font-body text-xs text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((cs) => (
              <tr key={cs.id} className="hover:bg-white/2">
                <td className="px-4 py-3 font-body text-sm text-white">{cs.client}</td>
                <td className="px-4 py-3 font-body text-sm text-text-secondary">{cs.category}</td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <button onClick={() => openEdit(cs)} className="text-text-secondary hover:text-gold transition-colors"><PencilIcon className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(cs.id)} className="text-text-secondary hover:text-red-400 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center py-10 font-body text-sm text-text-secondary">No case studies yet.</p>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Case Study' : 'Add Case Study'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { f: 'client', label: 'Client Name', required: true },
            { f: 'logo', label: 'Logo URL' },
            { f: 'category', label: 'Category' },
          ].map(({ f, label, required }) => (
            <div key={f}>
              <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">{label}</label>
              <input {...register(f as keyof CaseStudyFormData, { required })} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors" />
            </div>
          ))}
          {[{ f: 'challenge', label: 'Challenge' }, { f: 'strategy', label: 'Strategy' }, { f: 'result', label: 'Result' }].map(({ f, label }) => (
            <div key={f}>
              <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">{label}</label>
              <textarea {...register(f as keyof CaseStudyFormData)} rows={2} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none" />
            </div>
          ))}
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">
              Metrics (one per line: Label: Value (up/down))
            </label>
            <textarea {...register('metricsText')} rows={4} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-xs text-white focus:outline-none focus:border-gold transition-colors resize-none font-mono" placeholder="ROI: 320% (up)&#10;Leads: 250+ (up)" />
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
