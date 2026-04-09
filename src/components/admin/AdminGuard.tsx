'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.replace('/admin/login');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}
