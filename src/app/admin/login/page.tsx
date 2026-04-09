'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), data.email, data.password);
      toast.success('Logged in successfully');
      router.push('/admin');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="font-heading text-4xl font-bold text-gold tracking-widest">STYL</span>
          <p className="font-body text-sm text-text-secondary mt-2">Admin Dashboard</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-10">
          <h1 className="font-heading text-2xl text-white mb-8 text-center">Sign In</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                autoComplete="email"
                className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors"
                placeholder="admin@styl.com"
              />
              {errors.email && <p className="mt-1 font-body text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                autoComplete="current-password"
                className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 font-body text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black font-body font-medium py-3 rounded-md hover:bg-gold-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
