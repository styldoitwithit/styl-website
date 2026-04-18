'use client';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { PlusIcon, TrashIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { getPageContent, setPageContent } from '@/lib/firestore';
import { serviceContent } from '@/lib/serviceDefaults';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';

// ─── Shared field components ──────────────────────────────────────────────────

function Field({ label, value, onChange, multiline = false, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const cls = 'w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors';
  return (
    <div>
      <label className="block font-body text-xs text-text-secondary uppercase tracking-wider mb-1">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className={`${cls} resize-none`} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

// ─── Page / section registry ──────────────────────────────────────────────────

type SectionType = 'problems' | 'solutions' | 'video_items' | 'values_list' | 'team_list' | 'process_steps' | 'about_story' | 'service_page';

interface SectionDef { key: string; label: string; type: SectionType; }

const PAGES: { id: string; label: string; sections: SectionDef[] }[] = [
  {
    id: 'home', label: 'Home',
    sections: [
      { key: 'home_problems',            label: 'Problems Section',    type: 'problems' },
      { key: 'home_solutions',           label: 'Solutions Section',   type: 'solutions' },
      { key: 'home_video_testimonials',  label: 'Video Testimonials',  type: 'video_items' },
    ],
  },
  {
    id: 'about', label: 'About',
    sections: [
      { key: 'about_story',  label: 'Our Story',     type: 'about_story' },
      { key: 'about_values', label: 'Our Values',    type: 'values_list' },
      { key: 'about_team',   label: 'Team Members',  type: 'team_list' },
    ],
  },
  {
    id: 'process', label: 'Process',
    sections: [
      { key: 'process_steps', label: 'Process Steps', type: 'process_steps' },
    ],
  },
  {
    id: 'services', label: 'Services',
    sections: [
      { key: 'service_social-media',     label: 'Social Media Marketing',    type: 'service_page' },
      { key: 'service_seo',              label: 'Search Engine Optimisation', type: 'service_page' },
      { key: 'service_content-creation', label: 'Content Creation',           type: 'service_page' },
      { key: 'service_branding',         label: 'Brand Consulting',           type: 'service_page' },
      { key: 'service_ad-production',    label: 'Ad Production',              type: 'service_page' },
      { key: 'service_web-design',       label: 'Web Development',            type: 'service_page' },
      { key: 'service_paid-ads',         label: 'Ads Management',             type: 'service_page' },
      { key: 'service_video-production', label: 'Video Production',           type: 'service_page' },
    ],
  },
];

// ─── Default content (mirrors hardcoded fallbacks) ────────────────────────────

const DEFAULTS: Record<string, Record<string, unknown>> = {
  home_problems: {
    badge: 'The Problems',
    heading: "What's Holding Your Business Back?",
    problems: [
      { title: 'Low Online Visibility',    desc: "Patients can't find you online. They're landing on your competitors instead of your doorstep." },
      { title: 'Poor Patient Acquisition', desc: "Ad spend keeps rising but booked appointments stay flat. Leads come in and go cold." },
      { title: 'Weak Brand Perception',    desc: "No consistent identity means patients don't trust you before they even walk through the door." },
      { title: 'Inefficient Ad Spend',     desc: "Generic campaigns burn your budget targeting the wrong people at the wrong time." },
    ],
    rightText: 'We solve all of this — so you can focus on what you do best.',
    ctaText: "Let's Talk",
  },
  home_solutions: {
    heading: 'We Got Your Back',
    subtitle: 'Our healthcare marketing expertise turns your challenges into competitive advantages.',
    solutions: [
      { number: '01', title: 'Data-Driven Patient Targeting',  desc: 'We use location, demographics, and search intent data to reach the exact patients who need your services right now.' },
      { number: '02', title: 'Full-Funnel Lead Conversion',    desc: 'From first click to confirmed appointment — our funnels nurture every lead with precision follow-up sequences.' },
      { number: '03', title: 'Premium Healthcare Branding',    desc: 'We build trust at every touchpoint with a brand that reflects your expertise and resonates with patients.' },
      { number: '04', title: 'Transparent ROI Tracking',       desc: 'No guesswork. Every campaign is tracked, measured, and optimised with monthly performance reports.' },
    ],
  },
  home_video_testimonials: {
    heading: 'Real Results, Real Voices',
    subtitle: "Don't take our word for it — hear directly from our clients",
    items: [
      { title: 'Dr. Jaikish — ATLAS Hospitals',    subtitle: 'How we grew patient acquisition by 40%' },
      { title: 'Dr. Madhupriya — Shree Clinic',    subtitle: 'Building trust in fertility care online' },
      { title: 'Dr. Vijayanad — Sri Ramakrishna',  subtitle: 'Scaling a specialty hospital brand' },
      { title: 'See All Testimonials',             subtitle: 'Follow us on Instagram' },
    ],
  },
  about_story: {
    paragraphs: [
      "Founded over 15 years ago, STYL started as a boutique marketing consultancy in Chennai. We quickly discovered that the healthcare sector had a massive gap — brilliant doctors and hospital administrators who were world-class at medicine, but struggled to communicate their expertise to the patients who needed them most.",
      "We filled that gap. Today, we work with hospitals, specialist clinics, and individual practitioners across India, delivering campaigns that don't just look good — they drive real patient footfall and measurable revenue growth.",
      "With over 150 healthcare clients served, 1,250+ hours of video content produced, and an average campaign ROI of 15X, STYL is the partner healthcare brands turn to when they're serious about growth.",
    ],
    stats: [
      { value: '150+', label: 'Healthcare Clients' },
      { value: '15X',  label: 'Average Campaign ROI' },
      { value: '15+',  label: 'Years of Experience' },
      { value: '45%',  label: 'Lower Cost Per Lead' },
    ],
  },
  about_values: {
    values: [
      { title: 'Healthcare First',          desc: 'We understand that healthcare marketing carries a unique responsibility. Every campaign is crafted with patient safety, ethics, and trust at the forefront.' },
      { title: 'Results Driven',            desc: "We obsess over metrics. From cost per lead to appointment conversion rates — if it can be measured, we're tracking it and optimising it." },
      { title: 'Long-Term Partnerships',    desc: "We don't do one-off campaigns. We build lasting relationships with our healthcare clients, growing alongside them year after year." },
      { title: 'Transparent Communication', desc: 'No jargon, no vanity metrics. Monthly clear reports that show exactly where your budget went and what it achieved.' },
    ],
  },
  about_team: {
    members: [
      { name: 'Shailesh Kumar', role: 'Founder & Strategy Lead', desc: '15+ years in digital marketing, specialised in healthcare brand building and patient acquisition campaigns.' },
      { name: 'Priya Ramesh',   role: 'Creative Director',       desc: 'Expert in healthcare visual communication — from brand identity systems to patient-facing video content.' },
      { name: 'Arjun Nair',     role: 'Performance Marketing',   desc: 'Google & Meta certified specialist managing millions in ad spend for hospitals and medical clinics.' },
    ],
  },
  process_steps: {
    steps: [
      { number: '01', title: 'Discovery & Audit',    duration: 'Week 1',       desc: 'We start by deeply understanding your hospital, your patients, and your competitors. We audit your existing digital presence — website, social media, SEO, and ads — to identify the gaps and opportunities.', deliverables: ['Full digital audit report', 'Competitor analysis', 'Target patient persona development', 'Current performance baseline'] },
      { number: '02', title: 'Strategy & Planning',  duration: 'Week 2',       desc: "Based on the audit, we build a custom 90-day marketing strategy tailored specifically to your hospital's goals, budget, and patient demographics. No generic templates — every strategy is bespoke.", deliverables: ['90-day marketing roadmap', 'Channel selection & budget allocation', 'Content calendar', 'KPIs and success metrics'] },
      { number: '03', title: 'Brand & Creative',     duration: 'Week 2–3',     desc: 'We develop or refresh your brand identity, create all creative assets, and set up the technical infrastructure needed for campaigns — landing pages, tracking, ad accounts, and content.', deliverables: ['Brand guidelines', 'Ad creatives & copy', 'Landing pages', 'Tracking & analytics setup'] },
      { number: '04', title: 'Launch & Optimise',    duration: 'Week 3 onwards', desc: "Campaigns go live. We monitor performance daily, optimise in real-time, and make data-driven adjustments to continuously improve results. You'll see leads coming in within the first week.", deliverables: ['Campaign launch', 'Daily performance monitoring', 'Weekly optimisation', 'A/B testing'] },
      { number: '05', title: 'Reporting & Scale',    duration: 'Monthly',      desc: 'Every month, you receive a clear performance report showing exactly what your investment achieved — new patients, cost per lead, ROI, and next month\'s plan. When results are strong, we scale up.', deliverables: ['Monthly performance report', 'ROI analysis', 'Next month strategy', 'Scaling recommendations'] },
    ],
  },
};

// ─── Section-specific editors ─────────────────────────────────────────────────

function ProblemsEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const problems = (data.problems as { title: string; desc: string }[]) || [];
  const update = (field: string, val: unknown) => onChange({ ...data, [field]: val });
  const updateItem = (i: number, field: string, val: string) => {
    const next = problems.map((p, idx) => idx === i ? { ...p, [field]: val } : p);
    update('problems', next);
  };
  const addItem = () => update('problems', [...problems, { title: '', desc: '' }]);
  const removeItem = (i: number) => update('problems', problems.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <Field label="Badge Text" value={(data.badge as string) || ''} onChange={v => update('badge', v)} />
      <Field label="Heading" value={(data.heading as string) || ''} onChange={v => update('heading', v)} />
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Problems List</label>
          <button onClick={addItem} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {problems.map((p, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gold">Problem {i + 1}</span>
                <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-4 h-4" /></button>
              </div>
              <Field label="Title" value={p.title} onChange={v => updateItem(i, 'title', v)} />
              <Field label="Description" value={p.desc} onChange={v => updateItem(i, 'desc', v)} multiline />
            </div>
          ))}
        </div>
      </div>
      <Field label="Right Column Text" value={(data.rightText as string) || ''} onChange={v => update('rightText', v)} multiline />
      <Field label="CTA Button Text" value={(data.ctaText as string) || ''} onChange={v => update('ctaText', v)} />
    </div>
  );
}

function SolutionsEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const solutions = (data.solutions as { number: string; title: string; desc: string }[]) || [];
  const update = (field: string, val: unknown) => onChange({ ...data, [field]: val });
  const updateItem = (i: number, field: string, val: string) => {
    const next = solutions.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    update('solutions', next);
  };
  const addItem = () => update('solutions', [...solutions, { number: String(solutions.length + 1).padStart(2, '0'), title: '', desc: '' }]);
  const removeItem = (i: number) => update('solutions', solutions.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <Field label="Section Heading" value={(data.heading as string) || ''} onChange={v => update('heading', v)} />
      <Field label="Subtitle" value={(data.subtitle as string) || ''} onChange={v => update('subtitle', v)} />
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Solutions</label>
          <button onClick={addItem} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {solutions.map((s, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gold">Solution {s.number}</span>
                <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Number" value={s.number} onChange={v => updateItem(i, 'number', v)} />
                <Field label="Title" value={s.title} onChange={v => updateItem(i, 'title', v)} />
              </div>
              <Field label="Description" value={s.desc} onChange={v => updateItem(i, 'desc', v)} multiline />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoItemsEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const items = (data.items as { title: string; subtitle: string }[]) || [];
  const update = (field: string, val: unknown) => onChange({ ...data, [field]: val });
  const updateItem = (i: number, field: string, val: string) => {
    update('items', items.map((it, idx) => idx === i ? { ...it, [field]: val } : it));
  };
  const addItem = () => update('items', [...items, { title: '', subtitle: '' }]);
  const removeItem = (i: number) => update('items', items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <Field label="Section Heading" value={(data.heading as string) || ''} onChange={v => update('heading', v)} />
      <Field label="Subtitle" value={(data.subtitle as string) || ''} onChange={v => update('subtitle', v)} />
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Video Cards</label>
          <button onClick={addItem} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gold">Card {i + 1}</span>
                <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-4 h-4" /></button>
              </div>
              <Field label="Title" value={it.title} onChange={v => updateItem(i, 'title', v)} />
              <Field label="Subtitle" value={it.subtitle} onChange={v => updateItem(i, 'subtitle', v)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutStoryEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const paragraphs = (data.paragraphs as string[]) || [];
  const stats = (data.stats as { value: string; label: string }[]) || [];
  const update = (field: string, val: unknown) => onChange({ ...data, [field]: val });

  const updatePara = (i: number, val: string) => update('paragraphs', paragraphs.map((p, idx) => idx === i ? val : p));
  const addPara = () => update('paragraphs', [...paragraphs, '']);
  const removePara = (i: number) => update('paragraphs', paragraphs.filter((_, idx) => idx !== i));

  const updateStat = (i: number, field: string, val: string) => update('stats', stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  const addStat = () => update('stats', [...stats, { value: '', label: '' }]);
  const removeStat = (i: number) => update('stats', stats.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Story Paragraphs</label>
          <button onClick={addPara} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea value={p} onChange={e => updatePara(i, e.target.value)} rows={3}
                className="flex-1 bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none" />
              <button onClick={() => removePara(i)} className="text-red-400 hover:text-red-300 transition-colors self-start mt-2"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Stats</label>
          <button onClick={addStat} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {stats.map((s, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1"><Field label="Value" value={s.value} onChange={v => updateStat(i, 'value', v)} /></div>
              <div className="flex-1"><Field label="Label" value={s.label} onChange={v => updateStat(i, 'label', v)} /></div>
              <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300 transition-colors mb-1"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValuesEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const values = (data.values as { title: string; desc: string }[]) || [];
  const update = (val: unknown) => onChange({ ...data, values: val });
  const updateItem = (i: number, field: string, val: string) => update(values.map((v, idx) => idx === i ? { ...v, [field]: val } : v));
  const addItem = () => update([...values, { title: '', desc: '' }]);
  const removeItem = (i: number) => update(values.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Values</label>
        <button onClick={addItem} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
          <PlusIcon className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {values.map((v, i) => (
        <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-gold">Value {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-4 h-4" /></button>
          </div>
          <Field label="Title" value={v.title} onChange={val => updateItem(i, 'title', val)} />
          <Field label="Description" value={v.desc} onChange={val => updateItem(i, 'desc', val)} multiline />
        </div>
      ))}
    </div>
  );
}

function TeamEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const members = (data.members as { name: string; role: string; desc: string }[]) || [];
  const update = (val: unknown) => onChange({ ...data, members: val });
  const updateItem = (i: number, field: string, val: string) => update(members.map((m, idx) => idx === i ? { ...m, [field]: val } : m));
  const addItem = () => update([...members, { name: '', role: '', desc: '' }]);
  const removeItem = (i: number) => update(members.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Team Members</label>
        <button onClick={addItem} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
          <PlusIcon className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {members.map((m, i) => (
        <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-gold">{m.name || `Member ${i + 1}`}</span>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Name" value={m.name} onChange={v => updateItem(i, 'name', v)} />
            <Field label="Role" value={m.role} onChange={v => updateItem(i, 'role', v)} />
          </div>
          <Field label="Description" value={m.desc} onChange={v => updateItem(i, 'desc', v)} multiline />
        </div>
      ))}
    </div>
  );
}

function ProcessStepsEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  const steps = (data.steps as { number: string; title: string; duration: string; desc: string; deliverables: string[] }[]) || [];
  const update = (val: unknown) => onChange({ ...data, steps: val });
  const updateStep = (i: number, field: string, val: unknown) => update(steps.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  const addStep = () => update([...steps, { number: String(steps.length + 1).padStart(2, '0'), title: '', duration: '', desc: '', deliverables: [] }]);
  const removeStep = (i: number) => update(steps.filter((_, idx) => idx !== i));
  const updateDeliverable = (si: number, di: number, val: string) => {
    const d = [...steps[si].deliverables];
    d[di] = val;
    updateStep(si, 'deliverables', d);
  };
  const addDeliverable = (si: number) => updateStep(si, 'deliverables', [...steps[si].deliverables, '']);
  const removeDeliverable = (si: number, di: number) => updateStep(si, 'deliverables', steps[si].deliverables.filter((_, idx) => idx !== di));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Steps</label>
        <button onClick={addStep} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
          <PlusIcon className="w-3.5 h-3.5" /> Add Step
        </button>
      </div>
      {steps.map((step, i) => (
        <div key={i} className="bg-background border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-semibold text-gold">{step.number} — {step.title || 'Untitled'}</span>
            <button onClick={() => removeStep(i)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Number" value={step.number} onChange={v => updateStep(i, 'number', v)} />
            <div className="col-span-2"><Field label="Title" value={step.title} onChange={v => updateStep(i, 'title', v)} /></div>
          </div>
          <Field label="Duration" value={step.duration} onChange={v => updateStep(i, 'duration', v)} placeholder="e.g. Week 1" />
          <Field label="Description" value={step.desc} onChange={v => updateStep(i, 'desc', v)} multiline />
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Deliverables</label>
              <button onClick={() => addDeliverable(i)} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
                <PlusIcon className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-1">
              {step.deliverables.map((d, di) => (
                <div key={di} className="flex gap-2">
                  <input value={d} onChange={e => updateDeliverable(i, di, e.target.value)}
                    className="flex-1 bg-background/50 border border-border rounded px-2 py-1 font-body text-xs text-white focus:outline-none focus:border-gold transition-colors" />
                  <button onClick={() => removeDeliverable(i, di)} className="text-red-400 hover:text-red-300 transition-colors"><TrashIcon className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicePageEditor({ data, onChange }: { data: Record<string, unknown>; onChange: (d: Record<string, unknown>) => void }) {
  type StatItem     = { value: string; label: string };
  type ProcessItem  = { step: string; title: string; description: string };
  type IncludedItem = { title: string; description: string };
  type FaqItem      = { question: string; answer: string };

  const stats    = (data.stats    as StatItem[])     || [];
  const process  = (data.process  as ProcessItem[])  || [];
  const included = (data.included as IncludedItem[]) || [];
  const faq      = (data.faq      as FaqItem[])      || [];

  const set = (field: string, val: unknown) => onChange({ ...data, [field]: val });

  const updateArr = <T extends object>(arr: T[], i: number, field: keyof T, val: string): T[] =>
    arr.map((item, idx) => idx === i ? { ...item, [field]: val } : item);

  return (
    <div className="space-y-6">
      <Field label="Tagline (italic text under title)" value={(data.tagline as string) || ''} onChange={v => set('tagline', v)} multiline />
      <Field label="Outcome (closing quote)" value={(data.outcome as string) || ''} onChange={v => set('outcome', v)} multiline />

      {/* Stats */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Stats (3 numbers)</label>
          <button onClick={() => set('stats', [...stats, { value: '', label: '' }])} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"><PlusIcon className="w-3.5 h-3.5" /> Add</button>
        </div>
        <div className="space-y-2">
          {stats.map((s, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="w-24"><Field label="Value" value={s.value} onChange={v => set('stats', updateArr(stats, i, 'value', v))} /></div>
              <div className="flex-1"><Field label="Label" value={s.label} onChange={v => set('stats', updateArr(stats, i, 'label', v))} /></div>
              <button onClick={() => set('stats', stats.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 mb-1"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Process Steps (How We Do It)</label>
          <button onClick={() => set('process', [...process, { step: String(process.length + 1).padStart(2,'0'), title: '', description: '' }])} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"><PlusIcon className="w-3.5 h-3.5" /> Add</button>
        </div>
        <div className="space-y-2">
          {process.map((p, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gold">{p.step} — {p.title || 'Untitled'}</span>
                <button onClick={() => set('process', process.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><TrashIcon className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Field label="Step #" value={p.step} onChange={v => set('process', updateArr(process, i, 'step', v))} />
                <div className="col-span-3"><Field label="Title" value={p.title} onChange={v => set('process', updateArr(process, i, 'title', v))} /></div>
              </div>
              <Field label="Description" value={p.description} onChange={v => set('process', updateArr(process, i, 'description', v))} multiline />
            </div>
          ))}
        </div>
      </div>

      {/* Included */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">Everything You Get (Included items)</label>
          <button onClick={() => set('included', [...included, { title: '', description: '' }])} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"><PlusIcon className="w-3.5 h-3.5" /> Add</button>
        </div>
        <div className="space-y-2">
          {included.map((item, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gold">{item.title || `Item ${i + 1}`}</span>
                <button onClick={() => set('included', included.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><TrashIcon className="w-4 h-4" /></button>
              </div>
              <Field label="Title" value={item.title} onChange={v => set('included', updateArr(included, i, 'title', v))} />
              <Field label="Description" value={item.description} onChange={v => set('included', updateArr(included, i, 'description', v))} multiline />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs text-text-secondary uppercase tracking-wider">FAQ</label>
          <button onClick={() => set('faq', [...faq, { question: '', answer: '' }])} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"><PlusIcon className="w-3.5 h-3.5" /> Add</button>
        </div>
        <div className="space-y-2">
          {faq.map((item, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-gold">{item.question || `Question ${i + 1}`}</span>
                <button onClick={() => set('faq', faq.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><TrashIcon className="w-4 h-4" /></button>
              </div>
              <Field label="Question" value={item.question} onChange={v => set('faq', updateArr(faq, i, 'question', v))} />
              <Field label="Answer" value={item.answer} onChange={v => set('faq', updateArr(faq, i, 'answer', v))} multiline />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionEditor({ section, onClose }: { section: SectionDef; onClose: () => void }) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageContent(section.key).then(raw => {
      if (raw) { setData(raw); return; }
      // For service pages, pre-populate from hardcoded defaults
      if (section.type === 'service_page') {
        const slug = section.key.replace('service_', '');
        setData((serviceContent[slug] as unknown as Record<string, unknown>) ?? {});
      } else {
        setData(DEFAULTS[section.key] ?? {});
      }
    }).catch(() => {
      if (section.type === 'service_page') {
        const slug = section.key.replace('service_', '');
        setData((serviceContent[slug] as unknown as Record<string, unknown>) ?? {});
      } else {
        setData(DEFAULTS[section.key] ?? {});
      }
    }).finally(() => setLoading(false));
  }, [section.key, section.type]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setPageContent(section.key, data);
      toast.success('Saved! Refresh the website to see changes.');
    } catch {
      toast.error('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderEditor = () => {
    switch (section.type) {
      case 'problems':        return <ProblemsEditor data={data} onChange={setData} />;
      case 'solutions':       return <SolutionsEditor data={data} onChange={setData} />;
      case 'video_items':     return <VideoItemsEditor data={data} onChange={setData} />;
      case 'about_story':     return <AboutStoryEditor data={data} onChange={setData} />;
      case 'values_list':     return <ValuesEditor data={data} onChange={setData} />;
      case 'team_list':       return <TeamEditor data={data} onChange={setData} />;
      case 'process_steps':   return <ProcessStepsEditor data={data} onChange={setData} />;
      case 'service_page':    return <ServicePageEditor data={data} onChange={setData} />;
      default:                return null;
    }
  };

  return (
    <div className="mt-4 bg-surface border border-gold/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading text-lg text-white">Editing: {section.label}</h3>
        <button onClick={onClose} className="font-body text-xs text-text-secondary hover:text-white transition-colors">✕ Close</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Spinner /></div>
      ) : (
        <>
          {renderEditor()}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
            <Button onClick={handleSave} disabled={saving} size="md">
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
            <button onClick={onClose} className="font-body text-sm text-text-secondary hover:text-white transition-colors">Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PageContentManager() {
  const [activePage, setActivePage] = useState('home');
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const page = PAGES.find(p => p.id === activePage)!;

  const handleEdit = (key: string) => {
    setEditingKey(prev => prev === key ? null : key);
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-white mb-6">Page Content</h2>

      {/* Page selector */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {PAGES.map(p => (
          <button
            key={p.id}
            onClick={() => { setActivePage(p.id); setEditingKey(null); }}
            className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
              activePage === p.id
                ? 'bg-gold text-black font-medium'
                : 'bg-surface border border-border text-text-secondary hover:text-white hover:border-gold/40'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Sections for selected page */}
      <div className="space-y-4">
        {page.sections.map(section => (
          <div key={section.key}>
            <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between hover:border-gold/30 transition-all duration-200">
              <div>
                <h3 className="font-heading text-base text-white">{section.label}</h3>
                <p className="font-body text-xs text-text-secondary mt-0.5">
                  {editingKey === section.key ? 'Currently editing' : 'Click Edit to modify this section'}
                </p>
              </div>
              <button
                onClick={() => handleEdit(section.key)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                  editingKey === section.key
                    ? 'bg-gold/20 border border-gold text-gold'
                    : 'bg-gold text-black hover:bg-gold-light'
                }`}
              >
                {editingKey === section.key ? 'Close' : 'Edit'}
              </button>
            </div>

            {editingKey === section.key && (
              <SectionEditor section={section} onClose={() => setEditingKey(null)} />
            )}
          </div>
        ))}
      </div>

      <p className="font-body text-xs text-text-secondary mt-8">
        * Changes are saved to the database immediately. The live website will reflect changes on the next page load.
      </p>
    </div>
  );
}
