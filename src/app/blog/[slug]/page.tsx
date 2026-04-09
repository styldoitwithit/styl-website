export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/firestore';
import { BlogPost } from '@/types';
import Link from 'next/link';

const fallbackPosts: Record<string, BlogPost> = {
  '5-strategies-increase-patient-footfall': {
    id: '1', title: '5 Proven Strategies to Increase Hospital Patient Footfall', slug: '5-strategies-increase-patient-footfall',
    excerpt: 'Discover the data-backed strategies top hospitals use to consistently attract new patients and retain existing ones.',
    content: `<p>Increasing patient footfall is the primary goal for most hospital marketing teams. Yet many healthcare providers rely on outdated strategies — print ads, word of mouth, and the occasional health camp — while their competitors are using precision digital marketing to attract patients 24/7.</p>

<h2>1. Optimise Your Google Business Profile</h2>
<p>Your Google Business Profile is often the first thing a potential patient sees. An incomplete or unoptimised profile loses you patients before they even visit your website. Ensure your profile has: accurate hours, all services listed, professional photos, and regular posts.</p>

<h2>2. Run Location-Based Google Ads</h2>
<p>Target patients within a specific radius of your hospital with highly relevant ad copy. Use ad extensions to include your phone number, address, and a direct link to book appointments.</p>

<h2>3. Build a Patient Referral Programme</h2>
<p>Your existing patients are your best advocates. A structured referral programme with clear incentives can dramatically increase word-of-mouth referrals from happy patients.</p>

<h2>4. Create Educational Content</h2>
<p>Publish regular blog posts, videos, and social media content that answers common patient questions. This builds trust, improves SEO, and keeps your brand top of mind.</p>

<h2>5. Implement Automated Follow-Up Sequences</h2>
<p>Most leads don't convert on the first contact. Set up automated SMS and email sequences to nurture enquiries until they're ready to book.</p>`,
    published: true, createdAt: { seconds: 1700000000, nanoseconds: 0 },
  },
};

export function generateStaticParams() {
  return Object.keys(fallbackPosts).map((slug) => ({ slug }));
}

function formatDate(ts: { seconds: number }) {
  return new Date(ts.seconds * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  try {
    post = await getBlogPostBySlug(slug) as BlogPost | null;
  } catch { /* use fallback */ }

  if (!post) post = fallbackPosts[slug] ?? null;
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-gold transition-colors mb-8">
              ← Back to Blog
            </Link>

            <div className="mb-6">
              <span className="font-body text-xs text-gold uppercase tracking-wider">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-white leading-tight mb-8">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-body text-lg text-text-secondary leading-relaxed mb-12 pb-12 border-b border-border">
                {post.excerpt}
              </p>
            )}

            {post.content ? (
              <div
                className="prose prose-invert prose-gold max-w-none font-body text-text-secondary leading-relaxed
                  [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4
                  [&_p]:mb-4 [&_p]:text-text-secondary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="font-body text-text-secondary">Content coming soon.</p>
            )}
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
