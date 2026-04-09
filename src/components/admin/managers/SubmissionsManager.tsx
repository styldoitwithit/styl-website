'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { getContactSubmissions, deleteDocument } from '@/lib/firestore';
import { ContactSubmission } from '@/types';
import { Spinner } from '@/components/ui/Spinner';

function formatDate(ts: { seconds: number }) {
  return new Date(ts.seconds * 1000).toLocaleString('en-IN');
}

export function SubmissionsManager() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    try { setItems(await getContactSubmissions() as ContactSubmission[]); } catch { toast.error('Load failed'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    try { await deleteDocument('contact_submissions', id); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-white">Contact Submissions</h2>
        <span className="font-body text-xs text-text-secondary">{items.length} total</span>
      </div>

      {items.length === 0 ? (
        <p className="text-center py-20 font-body text-sm text-text-secondary">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((sub) => (
            <div key={sub.id} className="bg-surface border border-border rounded-xl overflow-hidden">
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/2"
                onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-body text-sm text-white font-medium">{sub.name}</span>
                  <span className="font-body text-sm text-text-secondary">{sub.email}</span>
                  <span className="font-body text-xs text-text-secondary">{formatDate(sub.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }} className="text-text-secondary hover:text-red-400 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  {expanded === sub.id ? <ChevronUpIcon className="w-4 h-4 text-text-secondary" /> : <ChevronDownIcon className="w-4 h-4 text-text-secondary" />}
                </div>
              </div>
              {expanded === sub.id && (
                <div className="border-t border-border px-5 py-4 bg-background/40">
                  <p className="font-body text-xs text-gold uppercase tracking-wider mb-2">Subject: {sub.subject}</p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
