'use client';
import { useState } from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { ClientsManager } from '@/components/admin/managers/ClientsManager';
import { TestimonialsManager } from '@/components/admin/managers/TestimonialsManager';
import { CaseStudiesManager } from '@/components/admin/managers/CaseStudiesManager';
import { ServicesManager } from '@/components/admin/managers/ServicesManager';
import { BlogManager } from '@/components/admin/managers/BlogManager';
import { StatsManager } from '@/components/admin/managers/StatsManager';
import { SubmissionsManager } from '@/components/admin/managers/SubmissionsManager';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const sections: Record<string, React.ReactNode> = {};

function AdminContent({ section }: { section: string }) {
  switch (section) {
    case 'overview': return <DashboardOverview />;
    case 'clients': return <ClientsManager />;
    case 'testimonials': return <TestimonialsManager />;
    case 'case_studies': return <CaseStudiesManager />;
    case 'services': return <ServicesManager />;
    case 'blog': return <BlogManager />;
    case 'stats': return <StatsManager />;
    case 'submissions': return <SubmissionsManager />;
    default: return <DashboardOverview />;
  }
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <AdminSidebar active={activeSection} onSelect={(id) => { setActiveSection(id); }} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10">
              <AdminSidebar active={activeSection} onSelect={(id) => { setActiveSection(id); setSidebarOpen(false); }} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center gap-4 md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="text-text-secondary hover:text-white">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <span className="font-heading text-xl text-gold tracking-widest">STYL Admin</span>
          </div>

          <main className="flex-1 p-6 md:p-8">
            <AdminContent section={activeSection} />
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
