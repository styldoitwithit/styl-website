'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getAllBlogPosts, createDocument, updateDocument, deleteDocument } from '@/lib/firestore';
import { BlogPost } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
}

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatDate(ts: { seconds: number }) {
  return new Date(ts.seconds * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<BlogFormData>();

  const load = async () => {
    try { setPosts(await getAllBlogPosts() as BlogPost[]); } catch { toast.error('Load failed'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); reset({ title: '', excerpt: '', content: '', published: false }); setModalOpen(true); };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setValue('title', p.title); setValue('excerpt', p.excerpt); setValue('content', p.content); setValue('published', p.published);
    setModalOpen(true);
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      if (editing) {
        await updateDocument('blog_posts', editing.id, { ...data });
        toast.success('Post updated');
      } else {
        const slug = toSlug(data.title);
        await createDocument('blog_posts', { ...data, slug });
        toast.success('Post created');
      }
      setModalOpen(false); load();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try { await deleteDocument('blog_posts', id); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-white">Blog Posts</h2>
        <Button size="sm" onClick={openAdd}><PlusIcon className="w-4 h-4 mr-1" /> New Post</Button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left font-body text-xs text-text-secondary uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right font-body text-xs text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-white/2">
                <td className="px-4 py-3 font-body text-sm text-white max-w-xs truncate">{p.title}</td>
                <td className="px-4 py-3 font-body text-sm text-text-secondary whitespace-nowrap">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.published ? 'gold' : 'default'}>{p.published ? 'Published' : 'Draft'}</Badge>
                </td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <button onClick={() => openEdit(p)} className="text-text-secondary hover:text-gold transition-colors"><PencilIcon className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-text-secondary hover:text-red-400 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="text-center py-10 font-body text-sm text-text-secondary">No posts yet.</p>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Post' : 'New Blog Post'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Title</label>
            <input {...register('title', { required: true })} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors" />
          </div>
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Excerpt</label>
            <textarea {...register('excerpt')} rows={2} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none" />
          </div>
          <div>
            <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">Content (HTML)</label>
            <textarea {...register('content')} rows={8} className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none font-mono text-xs" />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="published" {...register('published')} className="w-4 h-4 accent-gold" />
            <label htmlFor="published" className="font-body text-sm text-text-secondary cursor-pointer">Published</label>
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
