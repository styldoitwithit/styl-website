'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/outline';
import { getServices, setDocument } from '@/lib/firestore';
import { Service } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface ServiceFormData {
  title: string;
  summary: string;
  bulletsText: string;
}

const FALLBACK_SERVICES: Service[] = [
  { id:'social-media',     slug:'social-media',     title:'Social Media Marketing',    icon:'megaphone', summary:'Strategic social media presence that builds trust, engages patients, and grows your healthcare brand.',                      bullets:['Platform-optimised healthcare content','Active social media communication','Strategic brand storytelling','Patient education content creation','Community engagement and reputation management'],           order:1 },
  { id:'seo',              slug:'seo',              title:'Search Engine Optimisation', icon:'search',    summary:'Comprehensive SEO strategy tailored for healthcare providers to dominate local and national search results.',              bullets:['Technical SEO for better visibility','Organic traffic from healthcare searches','Google Business Profile optimisation','Local SEO for clinic/hospital discovery','Healthcare keyword research and content strategy'], order:2 },
  { id:'content-creation', slug:'content-creation', title:'Content Creation',           icon:'search',    summary:'Healthcare-compliant content that earns patient trust and Google rankings simultaneously.',                               bullets:['SEO-rich medical articles and blog posts','Procedure and condition explainer pages','Doctor biography and expertise profiles','Patient education content for social media','Monthly content performance reporting'],           order:3 },
  { id:'branding',         slug:'branding',         title:'Brand Consulting',           icon:'star',      summary:'Build a healthcare brand that patients trust before they even walk through your doors.',                                  bullets:['Brand strategy, positioning and promise','Logo design and full visual identity system','Tone of voice and patient communication guidelines','Brand rollout across all touchpoints','Patient journey touchpoint branding'],     order:4 },
  { id:'ad-production',    slug:'ad-production',    title:'Ad Production',              icon:'video',     summary:'Cinematic healthcare creatives — from doctor reels to patient testimonials — built to perform on every platform.',         bullets:['Doctor introduction and testimonial videos','Procedure explainer and facility tour content','Short-form reels for Instagram and YouTube Shorts','Ad creatives for Google and Meta campaigns','Multi-format delivery for all platforms'], order:5 },
  { id:'web-design',       slug:'web-design',       title:'Web Development',            icon:'globe',     summary:'Fast, beautiful, patient-friendly websites that rank on Google and convert visitors into appointments.',                  bullets:['Fast, mobile-friendly patient websites','SEO-ready structure for search visibility','Seamless appointment booking flow','Patient portal integration','CMS training for your team'],                                            order:6 },
  { id:'paid-ads',         slug:'paid-ads',         title:'Ads Management',             icon:'chart',     summary:'Google and Meta ad campaigns managed with surgical precision — every rupee tracked, every patient lead accounted for.',  bullets:['Google Search and Display campaign management','Meta Ads for awareness and patient lead generation','Dedicated conversion-optimised landing pages','Real-time optimisation and monthly ROI reports','Full budget transparency'], order:7 },
  { id:'video-production', slug:'video-production', title:'Video Production',           icon:'video',     summary:'Professional healthcare video content that educates patients, builds authority, and drives engagement.',                  bullets:['Patient treatment explainer videos','High-quality medical visual content','Video for website and social media','Doctor introduction and testimonial videos','Procedure walkthrough animations'],                            order:8 },
];

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const { register, handleSubmit, setValue } = useForm<ServiceFormData>();

  const load = async () => {
    try {
      const fsServices = await getServices() as Service[];
      const fsMap = new Map(fsServices.map(s => [s.slug, s]));
      const merged = FALLBACK_SERVICES.map(fb => fsMap.get(fb.slug) ?? fb);
      setServices(merged);
    } catch {
      setServices(FALLBACK_SERVICES);
    }
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
      await setDocument('services', editing.slug, {
        slug: editing.slug,
        title: data.title,
        summary: data.summary,
        bullets,
        icon: editing.icon,
        order: editing.order,
      });
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
              <tr key={s.slug} className="hover:bg-white/2">
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
