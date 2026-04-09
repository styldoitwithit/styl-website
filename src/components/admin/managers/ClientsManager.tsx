'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getClients, createDocument, updateDocument, deleteDocument } from '@/lib/firestore';
import { Client } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

type ClientFormData = Omit<Client, 'id'>;

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<ClientFormData>();

  const load = async () => {
    try {
      const data = await getClients();
      setClients(data as Client[]);
    } catch { toast.error('Failed to load clients'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); reset({ name: '', logo: '', category: 'Healthcare', order: clients.length + 1 }); setModalOpen(true); };
  const openEdit = (c: Client) => {
    setEditing(c);
    setValue('name', c.name); setValue('logo', c.logo); setValue('category', c.category); setValue('order', c.order);
    setModalOpen(true);
  };

  const onSubmit = async (data: ClientFormData) => {
    try {
      if (editing) {
        await updateDocument('clients', editing.id, data);
        toast.success('Client updated');
      } else {
        await createDocument('clients', data);
        toast.success('Client added');
      }
      setModalOpen(false);
      load();
    } catch { toast.error('Operation failed'); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteDocument('clients', id);
      toast.success('Deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-white">Clients</h2>
        <Button size="sm" onClick={openAdd}><PlusIcon className="w-4 h-4 mr-1" /> Add Client</Button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Order</th>
              <th className="px-4 py-3 text-right font-body text-xs text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-white/2">
                <td className="px-4 py-3 font-body text-sm text-white">{c.name}</td>
                <td className="px-4 py-3 font-body text-sm text-text-secondary">{c.category}</td>
                <td className="px-4 py-3 font-body text-sm text-text-secondary">{c.order}</td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <button onClick={() => openEdit(c)} className="text-text-secondary hover:text-gold transition-colors"><PencilIcon className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(c.id, c.name)} className="text-text-secondary hover:text-red-400 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && <p className="text-center py-10 font-body text-sm text-text-secondary">No clients yet.</p>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Client' : 'Add Client'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { label: 'Name', field: 'name' as const, required: true },
            { label: 'Logo URL', field: 'logo' as const },
            { label: 'Category', field: 'category' as const },
          ].map(({ label, field, required }) => (
            <div key={field}>
              <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">{label}</label>
              <input {...register(field, { required })} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors" />
            </div>
          ))}
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
