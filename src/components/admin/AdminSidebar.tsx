'use client';
import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import {
  HomeIcon, UserGroupIcon, ChatBubbleLeftIcon, ChartBarIcon,
  BriefcaseIcon, DocumentTextIcon, StarIcon, EnvelopeIcon, ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { id: 'overview', label: 'Dashboard', icon: HomeIcon },
  { id: 'clients', label: 'Clients', icon: UserGroupIcon },
  { id: 'testimonials', label: 'Testimonials', icon: ChatBubbleLeftIcon },
  { id: 'case_studies', label: 'Case Studies', icon: ChartBarIcon },
  { id: 'services', label: 'Services', icon: BriefcaseIcon },
  { id: 'blog', label: 'Blog Posts', icon: DocumentTextIcon },
  { id: 'stats', label: 'Stats', icon: StarIcon },
  { id: 'submissions', label: 'Submissions', icon: EnvelopeIcon },
];

interface AdminSidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export function AdminSidebar({ active, onSelect }: AdminSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(getFirebaseAuth());
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <span className="font-heading text-2xl font-bold text-gold tracking-widest">STYL</span>
        <p className="font-body text-xs text-text-secondary mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all duration-200 text-left',
                active === item.id
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
