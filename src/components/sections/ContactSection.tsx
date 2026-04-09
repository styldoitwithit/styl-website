'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { submitContactForm } from '@/lib/firestore';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success('Message sent! We\'ll be in touch soon.');
      reset();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Let's Talk About What You Need"
          subtitle="Ready to grow your healthcare brand? Get in touch and let's build something great together."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-heading text-2xl text-white mb-6">Get in Touch</h3>
              <div className="space-y-5">
                <a href="mailto:styldoitwithit@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-text-secondary uppercase tracking-wider">Email</p>
                    <p className="font-body text-sm text-white group-hover:text-gold transition-colors">styldoitwithit@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+919150088334" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <PhoneIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-text-secondary uppercase tracking-wider">Phone</p>
                    <p className="font-body text-sm text-white group-hover:text-gold transition-colors">+91 91500 88334</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-text-secondary uppercase tracking-wider">Address</p>
                    <p className="font-body text-sm text-white leading-relaxed">
                      Mount Towers, Mount Poonamallee Rd,<br />
                      Sathya Nagar, Ramapuram,<br />
                      Chennai, Tamil Nadu 600089
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Dr. Anil Kumar"
                  />
                  {errors.name && <p className="mt-1 font-body text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    type="email"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                    placeholder="doctor@hospital.com"
                  />
                  {errors.email && <p className="mt-1 font-body text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder="I want to grow my hospital's online presence"
                />
                {errors.subject && <p className="mt-1 font-body text-xs text-red-400">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-body text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us about your hospital and what you're looking to achieve..."
                />
                {errors.message && <p className="mt-1 font-body text-xs text-red-400">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
