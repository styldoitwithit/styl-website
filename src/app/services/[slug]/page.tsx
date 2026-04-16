export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import { getServiceBySlug } from '@/lib/firestore';
import { Service } from '@/types';
import Link from 'next/link';
import {
  MagnifyingGlassIcon, MegaphoneIcon, ChartBarIcon,
  VideoCameraIcon, StarIcon, GlobeAltIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  search: MagnifyingGlassIcon, megaphone: MegaphoneIcon, chart: ChartBarIcon,
  video: VideoCameraIcon, star: StarIcon, globe: GlobeAltIcon,
};

// ─── Rich per-service content ─────────────────────────────────────────────────

interface ServiceContent {
  tagline: string;
  stats: { value: string; label: string }[];
  process: { step: string; title: string; description: string }[];
  included: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  outcome: string;
}

const serviceContent: Record<string, ServiceContent> = {
  seo: {
    tagline: 'Be the first hospital patients find — before your competitors.',
    stats: [
      { value: '77%', label: 'of patients search online before booking an appointment' },
      { value: '4×',  label: 'more clicks go to the #1 Google result vs #4' },
      { value: '6mo', label: 'average time to reach page 1 for competitive healthcare keywords' },
    ],
    process: [
      { step: '01', title: 'Technical Audit', description: 'We crawl your website for speed issues, broken links, missing meta tags, and structural problems that are silently hurting your rankings.' },
      { step: '02', title: 'Keyword Research', description: 'We identify the exact terms your target patients type into Google — from "best orthopaedic hospital in Chennai" to "knee replacement cost" — and prioritise by volume and intent.' },
      { step: '03', title: 'On-Page Optimisation', description: 'Every page title, heading, image alt tag, and internal link is aligned with your keyword strategy so Google understands exactly what you offer.' },
      { step: '04', title: 'Local SEO & Google Business', description: 'Your Google Business Profile is fully optimised and kept current. We build local citations and manage reviews to dominate the map pack for nearby searches.' },
      { step: '05', title: 'Content Strategy', description: 'Monthly healthcare articles and service pages targeting high-intent keywords establish you as the trusted authority in your speciality.' },
      { step: '06', title: 'Reporting & Refinement', description: 'Monthly reports track keyword rankings, organic traffic, and appointment-driving conversions. We refine strategy based on real data, not guesses.' },
    ],
    included: [
      { title: 'Technical SEO', description: 'Site speed optimisation, Core Web Vitals improvements, crawl error fixes, schema markup for medical services, and mobile-first indexing compliance.' },
      { title: 'Healthcare Keyword Research', description: 'Deep research into condition-based, procedure-based, and location-based search queries specific to your speciality and geography.' },
      { title: 'On-Page Optimisation', description: 'Title tags, meta descriptions, headers, internal linking, image optimisation, and structured content for every service page.' },
      { title: 'Google Business Profile Management', description: 'Profile setup, regular updates, Q&A management, review response strategy, and photo optimisation to dominate the local map pack.' },
      { title: 'Content Creation', description: 'Monthly SEO-focused blog posts, service page copy, and FAQ content written by healthcare marketing specialists.' },
      { title: 'Monthly Analytics Reports', description: 'Transparent reports showing keyword movements, traffic growth, leads attributed to organic search, and next-month priorities.' },
    ],
    faq: [
      { question: 'How long before we see results from SEO?', answer: 'Most clients begin to see measurable ranking improvements within 90 days. Significant traffic growth typically occurs between months 4–6. SEO is a long-term investment — the results compound over time and are far more durable than paid ads.' },
      { question: 'How is healthcare SEO different from general SEO?', answer: 'Healthcare searches carry extremely high intent — people searching "knee replacement surgeon Chennai" are ready to book. We focus on procedure and condition keywords, comply with medical content guidelines (E-E-A-T), and optimise for the specific trust signals that healthcare patients look for.' },
      { question: 'Do you work with hospitals that already have an agency?', answer: 'Yes. We frequently take over from previous agencies and begin with a full audit to identify what has been done well and where critical opportunities have been missed.' },
      { question: 'Can you guarantee a #1 ranking?', answer: 'No ethical SEO agency can guarantee specific rankings — Google\'s algorithm is always evolving. What we guarantee is a rigorous, proven process and transparent reporting. Our track record speaks: the majority of our healthcare clients rank on page 1 within 6 months for their primary keywords.' },
    ],
    outcome: 'A steady, compounding stream of high-intent patients finding your hospital on Google — without paying for every click.',
  },

  'social-media': {
    tagline: 'Build the kind of trust that turns followers into lifelong patients.',
    stats: [
      { value: '41%', label: 'of patients say social media affects their choice of hospital' },
      { value: '3×',  label: 'higher engagement for healthcare video content vs static posts' },
      { value: '90d', label: 'average time to see measurable follower and enquiry growth' },
    ],
    process: [
      { step: '01', title: 'Brand & Audience Audit', description: 'We analyse your current social presence, audience demographics, competitor activity, and what content resonates most in your speciality.' },
      { step: '02', title: 'Content Strategy', description: 'A monthly calendar is built around patient education, doctor expertise, procedure awareness, testimonials, and trust-building storytelling.' },
      { step: '03', title: 'Content Creation', description: 'Our in-house healthcare copywriters and designers produce every post, reel script, graphic, and caption — nothing is generic or templated.' },
      { step: '04', title: 'Scheduling & Publishing', description: 'Posts go live at optimal times for each platform using data-driven scheduling. Consistency is maintained every single week, without gaps.' },
      { step: '05', title: 'Community Management', description: 'Every comment, DM, and review gets a prompt, professional response. Active engagement signals trust to both patients and platform algorithms.' },
      { step: '06', title: 'Performance Analytics', description: 'Monthly reports cover reach, engagement rate, follower growth, and direct enquiries generated from social channels.' },
    ],
    included: [
      { title: 'Platform Management', description: 'Full management of Instagram, Facebook, and LinkedIn — the three platforms that drive the most healthcare enquiries in India.' },
      { title: 'Healthcare Content Creation', description: 'Monthly posts including educational carousels, doctor spotlight reels, patient awareness campaigns, and procedure explainers — all written and designed by our team.' },
      { title: 'Brand Voice Development', description: 'We establish a consistent tone and visual identity across every post so your brand is immediately recognisable and trustworthy.' },
      { title: 'Community & Reputation Management', description: 'Proactive review management, comment responses, and DM handling to protect and build your online reputation.' },
      { title: 'Reel & Short-form Video Scripts', description: 'Weekly video scripts optimised for Instagram Reels and YouTube Shorts — the fastest-growing content format for healthcare discovery.' },
      { title: 'Monthly Strategy Reports', description: 'Detailed analytics covering impressions, reach, engagement, follower growth, and conversions attributed to social media.' },
    ],
    faq: [
      { question: 'Which platforms do you manage?', answer: 'We primarily manage Instagram, Facebook, and LinkedIn. These three platforms account for over 85% of healthcare social media enquiries in India. We can include YouTube Shorts management as an add-on.' },
      { question: 'How many posts per week do we get?', answer: 'Our standard package includes 5 posts per week across platforms. This includes a mix of static posts, carousels, and reels. Volume can be scaled based on your requirements.' },
      { question: 'Do you handle negative reviews?', answer: 'Yes. We monitor reviews across Google, Facebook, and Practo. Every negative review is handled with a calm, professional response that protects your reputation while addressing patient concerns.' },
      { question: 'Can patients book appointments through social media?', answer: 'Absolutely. We integrate appointment booking links directly into your profiles and posts, and can set up Instagram and Facebook lead forms that funnel directly to your reception team.' },
    ],
    outcome: 'A social media presence that educates patients, showcases your expertise, and consistently drives enquiries — managed entirely by our team.',
  },

  'paid-ads': {
    tagline: 'Qualified patient leads delivered to your door — starting from day one.',
    stats: [
      { value: '320%', label: 'average ROI achieved across our healthcare ad campaigns' },
      { value: '60%',  label: 'reduction in cost-per-lead compared to industry average' },
      { value: '48hr', label: 'from campaign launch to first patient enquiries arriving' },
    ],
    process: [
      { step: '01', title: 'Goal & Budget Planning', description: 'We align ad spend with your specific targets — whether that is new patient registrations, procedure enquiries, or second-opinion appointments.' },
      { step: '02', title: 'Audience & Market Research', description: 'We map out exactly who your ideal patients are, where they live, what they search for, and which competitor hospitals they are considering.' },
      { step: '03', title: 'Campaign Architecture', description: 'Each campaign is structured with tightly themed ad groups, dedicated landing pages, and conversion tracking wired up before a single rupee is spent.' },
      { step: '04', title: 'Ad Creative & Copywriting', description: 'Compelling ad copy and visuals are written by healthcare specialists — messaging that addresses patient fears, answers questions, and drives action.' },
      { step: '05', title: 'Launch & Live Optimisation', description: 'Campaigns launch and are monitored daily in the first two weeks. Bids, audiences, and creatives are optimised aggressively until CPL (cost per lead) is minimised.' },
      { step: '06', title: 'Scaling & Reporting', description: 'Once performance benchmarks are met, we scale winning campaigns. Monthly reports detail spend, leads, CPL, and attributed appointments.' },
    ],
    included: [
      { title: 'Google Search Ads', description: 'High-intent keyword campaigns targeting patients actively searching for your procedures, specialty, or location — the highest-converting ad type in healthcare.' },
      { title: 'Google Display & Remarketing', description: 'Visual ads that follow interested visitors across the web, keeping your hospital top-of-mind until they book.' },
      { title: 'Meta Ads (Facebook & Instagram)', description: 'Awareness and lead generation campaigns on the platforms where your patients spend their time, targeting by age, location, health interests, and behaviour.' },
      { title: 'Dedicated Landing Pages', description: 'Custom-built, conversion-optimised landing pages for each campaign — not generic pages that kill your ad spend.' },
      { title: 'Conversion Tracking & Analytics', description: 'Every call, form fill, and WhatsApp click is tracked back to the exact ad that drove it, so every rupee is accountable.' },
      { title: 'Monthly Performance Reports', description: 'Full transparency on impressions, clicks, leads, cost-per-lead, and return on ad spend — with strategic recommendations each month.' },
    ],
    faq: [
      { question: 'What is a realistic budget to start with?', answer: 'Most of our healthcare clients start with ₹30,000–₹60,000 per month in ad spend. At this level, with effective campaign management, you can expect a consistent flow of qualified enquiries. We scale budget as campaigns prove their returns.' },
      { question: 'How quickly will we get leads?', answer: 'Google Search campaigns can start delivering leads within 24–48 hours of launch. Meta campaigns typically ramp up over 7–10 days as the algorithm learns your audience. You will see results within the first month.' },
      { question: 'Do you charge a management fee on top of ad spend?', answer: 'Yes. We charge a management fee separate from your ad spend budget. The ad spend goes directly to Google and Meta — we never mark it up. Our fee covers strategy, creative, optimisation, and reporting.' },
      { question: 'What if my ads are not performing well?', answer: 'Underperformance in the first 30 days is normal as we gather data and optimise. We set clear KPI benchmarks upfront and actively refine campaigns weekly. If performance does not meet agreed targets after 60 days of optimisation, we restructure the campaign strategy at no extra cost.' },
    ],
    outcome: 'A predictable pipeline of qualified patient leads with full cost accountability — so you know exactly what each appointment costs to acquire.',
  },

  'video-production': {
    tagline: 'The most trusted hospitals in India use video. Here\'s how we make yours.',
    stats: [
      { value: '80%', label: 'of patients watch a hospital video before making a booking decision' },
      { value: '5×',  label: 'higher engagement for video vs text-only healthcare content' },
      { value: '2×',  label: 'increase in appointment conversions when a doctor intro video is present' },
    ],
    process: [
      { step: '01', title: 'Discovery & Scripting', description: 'We spend time understanding your hospital\'s story, your doctors\' expertise, and the patient concerns you most want to address. Our scriptwriters craft narratives that educate and reassure.' },
      { step: '02', title: 'Pre-Production Planning', description: 'Storyboards, shot lists, scheduling, location scouting, and talent briefing. Every detail is locked before we arrive on-site so shoot time is used efficiently.' },
      { step: '03', title: 'On-Site Production', description: 'Our professional crew handles camera, lighting, sound, and direction. We work in clinical environments regularly and understand infection control, patient privacy, and minimal disruption.' },
      { step: '04', title: 'Post-Production', description: 'Professional colour grading, sound mixing, motion graphics, subtitles, and music licensing. Every video meets broadcast quality standards.' },
      { step: '05', title: 'Optimisation & Delivery', description: 'Videos are exported in formats optimised for your website, YouTube, Instagram Reels, and digital advertising — each platform has different requirements.' },
      { step: '06', title: 'Distribution Strategy', description: 'We advise on where and how to deploy each video for maximum reach — from your homepage to Google Ads to patient waiting room screens.' },
    ],
    included: [
      { title: 'Doctor Introduction Videos', description: 'Professional 60–90 second videos for each consultant that build instant trust and credibility with prospective patients.' },
      { title: 'Procedure Explainer Videos', description: 'Animated or live-action videos that explain complex medical procedures in simple, reassuring terms — reducing pre-appointment anxiety and increasing bookings.' },
      { title: 'Patient Testimonial Videos', description: 'Authentic, ethically produced testimonials from real patients that serve as your most powerful proof of clinical excellence.' },
      { title: 'Hospital Facility Tours', description: 'Immersive walkthroughs of your wards, OTs, recovery rooms, and facilities that build confidence before patients ever visit.' },
      { title: 'Health Awareness Campaigns', description: 'Short-form educational videos on prevalent conditions, seasonal health concerns, and preventive care — ideal for social media and PR.' },
      { title: 'Social Media Reels & Shorts', description: 'Snappy, high-retention vertical videos scripted and edited for Instagram Reels and YouTube Shorts — the highest-discovery video formats today.' },
    ],
    faq: [
      { question: 'How long does a video project take?', answer: 'A standard doctor introduction video takes 5–7 working days from shoot to final delivery. More complex projects — facility tours, multi-doctor packages, animated explainers — take 2–4 weeks. We always agree timelines upfront.' },
      { question: 'Do you shoot inside hospitals?', answer: 'Yes. We have extensive experience filming in clinical environments. Our team follows all infection control protocols, works around patient schedules, and ensures zero disruption to your operations.' },
      { question: 'What equipment do you use?', answer: 'We use cinema-grade cameras, professional lighting rigs, wireless lavalier microphones, and stabilised motion rigs. The resulting footage is indistinguishable from broadcast quality.' },
      { question: 'Who writes the scripts?', answer: 'Our in-house healthcare copywriters write all scripts. Doctors review and approve every word for clinical accuracy before production begins. We never use generic medical scripts.' },
    ],
    outcome: 'A library of professional healthcare videos that build trust at scale — working for your hospital 24 hours a day across every digital channel.',
  },

  branding: {
    tagline: 'Patients choose hospitals they trust. We build the brand that earns that trust.',
    stats: [
      { value: '73%', label: 'of patients say they would travel further for a hospital they trust' },
      { value: '2–3×', label: 'premium pricing power enjoyed by hospitals with a strong brand' },
      { value: '90d',  label: 'to a complete, deployable brand identity from discovery to delivery' },
    ],
    process: [
      { step: '01', title: 'Discovery Workshop', description: 'We run a structured workshop with your leadership team to uncover your hospital\'s founding values, clinical philosophy, unique differentiators, and the patients you most want to serve.' },
      { step: '02', title: 'Market & Competitor Audit', description: 'We map the competitive landscape — how peer hospitals position themselves, where the gaps are, and where you have a genuine right to win.' },
      { step: '03', title: 'Brand Strategy', description: 'We define your positioning statement, brand promise, tone of voice, and the emotional territory your brand will own in patients\' minds.' },
      { step: '04', title: 'Visual Identity Design', description: 'Logo, colour palette, typography, and iconography are designed with clinical precision — every element signals trust, competence, and care.' },
      { step: '05', title: 'Brand Guidelines', description: 'A comprehensive brand book documents exactly how every element is used — ensuring consistency across your website, signage, social media, uniforms, and stationery.' },
      { step: '06', title: 'Brand Rollout Support', description: 'We support the application of your new identity across all touchpoints — digital, print, environmental — and train your team on brand standards.' },
    ],
    included: [
      { title: 'Brand Strategy & Positioning', description: 'A clearly articulated positioning that differentiates your hospital, defines your promise to patients, and guides every communication decision.' },
      { title: 'Logo Design', description: 'A professional, memorable logo designed for healthcare — versatile enough for everything from a letterhead to a hospital building facade.' },
      { title: 'Visual Identity System', description: 'Full colour palette, typography system, iconography, and design language that create immediate recognition across all touchpoints.' },
      { title: 'Tone of Voice Guidelines', description: 'Written guidelines that define how your brand speaks — the words it uses, the words it avoids, and the emotional register it maintains across every patient interaction.' },
      { title: 'Brand Applications', description: 'Applied brand design for your website, social media, stationery, prescription pads, OPD signage, staff uniforms, and patient communication materials.' },
      { title: 'Comprehensive Brand Book', description: 'A single reference document that ensures every team member — and every future agency — applies your brand consistently.' },
    ],
    faq: [
      { question: 'We already have a logo. Do we need full branding?', answer: 'A logo is not a brand. If your hospital lacks a consistent visual identity, a defined tone of voice, and a clear positioning in patients\' minds, you have a brand problem that a logo cannot solve. We can audit what you have and recommend whether refinement or a fresh start is the right approach.' },
      { question: 'How do you ensure the brand reflects our clinical values?', answer: 'Our discovery process is deeply rooted in understanding your clinical philosophy, your doctors\' expertise, and the patient experiences you want to be known for. We do not apply generic "healthcare brand templates" — every brand we build is specific to the institution.' },
      { question: 'Will rebranding confuse existing patients?', answer: 'A well-managed rebrand should feel like a natural evolution, not a departure. We plan all rollouts to maintain continuity — existing patients recognise the growth, while new patients encounter the best version of your brand from day one.' },
      { question: 'Do you help with naming if we are launching a new hospital?', answer: 'Yes. Naming is part of our brand strategy offering. We develop name options, test them for memorability and clinical credibility, and ensure the chosen name works across languages, digital domains, and regulatory requirements.' },
    ],
    outcome: 'A brand so coherent and trustworthy that patients choose you before they have even spoken to your team — and refer others because they are proud to be associated with your hospital.',
  },

  'web-design': {
    tagline: 'Your website is the first opinion patients form about your hospital. Make it count.',
    stats: [
      { value: '88%', label: 'of patients use a hospital\'s website to evaluate its quality before visiting' },
      { value: '53%', label: 'of mobile users abandon a website that takes more than 3 seconds to load' },
      { value: '3×',  label: 'more appointment enquiries from websites optimised for patient conversion' },
    ],
    process: [
      { step: '01', title: 'Discovery & Architecture', description: 'We audit your existing site (or start fresh), map your patient journeys, and design a content architecture that moves visitors naturally from interest to appointment booking.' },
      { step: '02', title: 'UX & Wireframing', description: 'Low-fidelity wireframes are built for every key page — homepage, speciality pages, doctor profiles, and booking flows — ensuring the structure works before a single design element is applied.' },
      { step: '03', title: 'Visual Design', description: 'High-fidelity designs are created using your brand identity. Every element — typography, colour, photography, whitespace — is chosen to reinforce clinical trust and visual clarity.' },
      { step: '04', title: 'Development', description: 'We build on fast, modern technology stacks (Next.js) with clean code, SEO-ready structure, and a CMS that your team can actually use without technical knowledge.' },
      { step: '05', title: 'Testing & QA', description: 'Every page is tested across devices, browsers, and internet speeds. Forms, booking flows, click-to-call buttons, and maps are all verified before launch.' },
      { step: '06', title: 'Launch & Ongoing Support', description: 'We manage the deployment, submit to Google Search Console, and provide 30 days of post-launch support. Ongoing maintenance packages are available.' },
    ],
    included: [
      { title: 'Responsive, Mobile-First Design', description: 'Over 70% of healthcare website traffic is mobile. Every page is designed mobile-first, then refined for tablet and desktop — never the other way around.' },
      { title: 'Doctor & Speciality Pages', description: 'Individual pages for each consultant and department, optimised to rank for doctor-name and specialty searches and designed to convert visitors into bookings.' },
      { title: 'Appointment Booking Integration', description: 'Seamless booking flows integrated with your existing HMS or a custom-built form system — reducing friction between intent and appointment.' },
      { title: 'SEO-Ready Architecture', description: 'Clean URL structures, schema markup, fast load times, and keyword-optimised content architecture built in from day one — not retrofitted later.' },
      { title: 'Content Management System', description: 'A simple CMS that allows your team to update news, add doctors, change opening hours, and publish blog posts without any technical knowledge.' },
      { title: 'Performance & Security', description: 'Sub-2-second load times, SSL certificates, HIPAA-conscious form handling, Google Analytics 4 setup, and regular security updates included.' },
    ],
    faq: [
      { question: 'How long does a hospital website project take?', answer: 'A standard hospital website — homepage, 4–6 specialty pages, doctor profiles, contact — takes 6–8 weeks from kickoff to launch. Larger projects with custom booking systems or complex integrations take 10–14 weeks. We agree milestones and timelines in the project scope.' },
      { question: 'Will we be able to update the website ourselves?', answer: 'Absolutely. Every website we build includes a CMS training session. Your team will be able to add/edit doctor profiles, publish blog posts, update news, and change contact details without needing us or any developer.' },
      { question: 'Do you redesign existing websites or only build new ones?', answer: 'Both. A redesign typically starts with a full audit of your current site — identifying what is working (content, rankings, user flows) and what is not. We preserve SEO equity carefully during any redesign.' },
      { question: 'What happens after the website launches?', answer: 'We provide 30 days of complimentary post-launch support covering bug fixes, content adjustments, and any technical issues. After that, maintenance packages covering security updates, performance monitoring, and content changes are available monthly.' },
    ],
    outcome: 'A fast, beautiful, patient-converting website that works as your best salesperson — 24 hours a day, 365 days a year.',
  },

  'content-creation': {
    tagline: 'Healthcare content that earns Google rankings and patient trust — simultaneously.',
    stats: [
      { value: '72%', label: 'of patients research their condition online before booking an appointment' },
      { value: '6×',  label: 'more leads generated by healthcare websites with active content strategies' },
      { value: '3mo', label: 'average time for quality healthcare content to begin ranking on page 1' },
    ],
    process: [
      { step: '01', title: 'Content Audit', description: 'We assess your existing content — what ranks, what converts, what is outdated — and identify the gaps competitors are exploiting in your speciality.' },
      { step: '02', title: 'Keyword & Topic Research', description: 'We map the exact questions patients ask about your services, then build a content calendar targeting high-intent, low-competition healthcare keywords.' },
      { step: '03', title: 'Expert Writing', description: 'Every piece is written by healthcare marketing specialists — medically accurate, patient-friendly, and structured to satisfy both Google\'s E-E-A-T guidelines and real patient needs.' },
      { step: '04', title: 'SEO Optimisation', description: 'Internal linking, meta tags, schema markup, and keyword placement are built into every piece — not added as an afterthought.' },
      { step: '05', title: 'Review & Approval', description: 'Content is shared with your team for medical review before publishing. Accuracy is non-negotiable in healthcare communication.' },
      { step: '06', title: 'Publish & Promote', description: 'Content goes live with proper technical setup and is promoted across social channels and email to maximise initial reach and indexing speed.' },
    ],
    included: [
      { title: 'SEO Blog Articles', description: 'Monthly long-form articles targeting high-intent healthcare keywords — written to rank, educate, and convert readers into appointment enquiries.' },
      { title: 'Procedure & Condition Pages', description: 'Dedicated pages for every treatment you offer, written to appear in "best [procedure] in [city]" searches and convert high-intent visitors.' },
      { title: 'Doctor Profile Pages', description: 'Compelling, SEO-optimised profiles for each consultant — building personal brand authority and ranking for doctor-name searches.' },
      { title: 'Patient Education Content', description: 'Trustworthy, plain-language content that answers patient questions, reduces appointment cancellations, and builds long-term loyalty.' },
      { title: 'Social Media Copy', description: 'Short-form content adapted for Instagram captions, Facebook posts, and LinkedIn articles — platform-appropriate and engagement-optimised.' },
      { title: 'Content Performance Reports', description: 'Monthly reporting on article rankings, organic traffic growth, time-on-page, and leads attributed to content — proving the ROI of every word.' },
    ],
    faq: [
      { question: 'How is healthcare content different from regular content writing?', answer: 'Healthcare content must balance SEO performance with medical accuracy, patient empathy, and regulatory compliance. Every article must meet Google\'s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards — which are stricter for medical content. Our writers specialise in this balance.' },
      { question: 'Do you handle the medical accuracy review?', answer: 'We write all content to be medically accurate, and every piece is shared with your team for review before publishing. You have final approval. We handle the rewriting of any corrections promptly.' },
      { question: 'How many articles do you produce per month?', answer: 'Our standard retainer includes 4 long-form SEO articles per month. This can scale up or down based on your goals and budget. We also offer one-time content projects for new service launches or website builds.' },
      { question: 'How long before content starts ranking?', answer: 'Most well-optimised healthcare articles begin appearing in Google\'s top 10 within 2–4 months for medium-competition keywords. Highly competitive terms may take longer. We target a mix of quick wins and long-term rank builders in every content calendar.' },
    ],
    outcome: 'A growing library of healthcare content that brings in organic patients every month — compounding in value long after it is published.',
  },

  'ad-production': {
    tagline: 'Healthcare creatives that stop the scroll — and start the conversation.',
    stats: [
      { value: '85%', label: 'of people say video has convinced them to book a product or service' },
      { value: '3×',  label: 'higher engagement rate for video posts vs static images on healthcare pages' },
      { value: '60s', label: 'average time a patient spends watching a doctor introduction reel before deciding to enquire' },
    ],
    process: [
      { step: '01', title: 'Creative Brief', description: 'We work with you to define the goal of each video — patient acquisition, brand awareness, procedure education, or doctor credibility — and build the brief around that specific outcome.' },
      { step: '02', title: 'Script & Storyboard', description: 'Every video starts with a written script and visual storyboard. Nothing goes in front of a camera until the message, structure, and call-to-action are locked.' },
      { step: '03', title: 'Pre-Production', description: 'Locations, talent briefing, equipment, lighting plans, and shooting schedules are all organised in advance. We handle every logistical detail so your doctors and staff just show up.' },
      { step: '04', title: 'Production Shoot', description: 'Our production team shoots at your facility with professional equipment — cameras, lighting, audio, and direction. Patient consent processes are followed rigorously.' },
      { step: '05', title: 'Post-Production', description: 'Video editing, colour grading, motion graphics, subtitles, music, and voiceover are handled entirely by our team. Multiple cut lengths are produced for different platforms.' },
      { step: '06', title: 'Delivery & Deployment', description: 'Final files are delivered in all required formats. We also handle deployment — uploading to YouTube, scheduling on social media, and setting up as ad creatives in your campaign manager.' },
    ],
    included: [
      { title: 'Doctor Introduction Reels', description: 'Short, compelling video introductions for each consultant — building personal credibility, driving profile page traffic, and converting viewers into patients.' },
      { title: 'Procedure Explainer Videos', description: 'Clear, reassuring videos that walk patients through what to expect from a treatment or procedure — reducing anxiety and increasing booking confidence.' },
      { title: 'Patient Testimonial Videos', description: 'Authentic, professionally produced patient success stories that are the most powerful trust signal in healthcare marketing.' },
      { title: 'Facility & Atmosphere Tours', description: 'Walkthroughs of your hospital or clinic that show patients the environment, technology, and care standards before they arrive — eliminating first-visit anxiety.' },
      { title: 'Social Media Ad Creatives', description: 'Short-form video cuts (15s, 30s, 60s) formatted for Instagram Reels, Facebook Ads, YouTube Shorts, and Google Display — each engineered for platform-specific performance.' },
      { title: 'Multi-Format Delivery', description: 'Every video delivered in full 4K master, 1080p broadcast, vertical 9:16 for mobile, square 1:1 for feed — ready to run anywhere without re-editing.' },
    ],
    faq: [
      { question: 'Do we need to close the hospital for the shoot?', answer: 'No. We plan shoots to minimise disruption — typically early mornings, between patient slots, or in designated areas. Our team is experienced in working around active clinical environments with minimal footprint.' },
      { question: 'How long does a video production project take?', answer: 'A standard project — creative brief, script, one shoot day, and post-production — takes 3–4 weeks from kickoff to final delivery. Rush timelines are available. Larger campaigns with multiple shoot days take 5–7 weeks.' },
      { question: 'What if a doctor is not comfortable on camera?', answer: 'This is very common. Our directors are experienced in coaching non-performers — building comfort through preparation, scripting, and a relaxed shoot environment. We have never failed to get a compelling performance from a reluctant subject.' },
      { question: 'Can the videos be used for paid ads as well as organic?', answer: 'Yes — this is the default. Every video is produced with multiple cuts in ad-spec formats for Google and Meta. Organic social versions and paid ad versions may have different CTAs, which we plan for in the script phase.' },
    ],
    outcome: 'A library of high-impact healthcare video content that builds trust at scale — converting viewers into patients across every platform you run.',
  },
};

// ─── Fallback base service data ───────────────────────────────────────────────

const fallbackServices: Record<string, Service> = {
  'social-media':      { id:'1', slug:'social-media',      title:'Social Media Marketing',        icon:'megaphone', summary:'Strategic social media presence that builds trust, engages patients, and grows your healthcare brand.',           bullets:['Platform-optimised healthcare content','Active social media communication','Strategic brand storytelling','Patient education content creation','Community engagement and reputation management'],  order:1 },
  'seo':               { id:'2', slug:'seo',               title:'Search Engine Optimisation',     icon:'search',    summary:'Comprehensive SEO strategy tailored for healthcare providers to dominate local and national search results.',   bullets:['Technical SEO for better visibility','Organic traffic from healthcare searches','Google Business Profile optimisation','Local SEO for clinic/hospital discovery','Healthcare keyword research and content strategy'], order:2 },
  'content-creation':  { id:'3', slug:'content-creation',  title:'Content Creation',              icon:'search',    summary:'Healthcare-compliant content that earns patient trust and Google rankings simultaneously.',                      bullets:['SEO-rich medical articles and blog posts','Procedure and condition explainer pages','Doctor biography and expertise profiles','Patient education content for social media','Monthly content performance reporting'],  order:3 },
  'branding':          { id:'4', slug:'branding',          title:'Brand Consulting',              icon:'star',      summary:'Build a healthcare brand that patients trust before they even walk through your doors.',                          bullets:['Brand strategy, positioning and promise','Logo design and full visual identity system','Tone of voice and patient communication guidelines','Brand rollout across all touchpoints','Patient journey touchpoint branding'],  order:4 },
  'ad-production':     { id:'5', slug:'ad-production',     title:'Ad Production',                 icon:'video',     summary:'Cinematic healthcare creatives — from doctor reels to patient testimonials — built to perform on every platform.', bullets:['Doctor introduction and testimonial videos','Procedure explainer and facility tour content','Short-form reels for Instagram and YouTube Shorts','Ad creatives for Google and Meta campaigns','Multi-format delivery for all platforms'],  order:5 },
  'web-design':        { id:'6', slug:'web-design',        title:'Web Development',               icon:'globe',     summary:'Fast, beautiful, patient-friendly websites that rank on Google and convert visitors into appointments.',          bullets:['Fast, mobile-friendly patient websites','SEO-ready structure for search visibility','Seamless appointment booking flow','Patient portal integration','CMS training for your team'],  order:6 },
  'paid-ads':          { id:'7', slug:'paid-ads',          title:'Ads Management',                icon:'chart',     summary:'Google and Meta ad campaigns managed with surgical precision — every rupee tracked, every patient lead accounted for.', bullets:['Google Search and Display campaign management','Meta Ads for awareness and patient lead generation','Dedicated conversion-optimised landing pages','Real-time optimisation and monthly ROI reports','Full budget transparency'],  order:7 },
  'video-production':  { id:'8', slug:'video-production',  title:'Video Production',              icon:'video',     summary:'Professional healthcare video content that educates patients, builds authority, and drives engagement.',          bullets:['Patient treatment explainer videos','High-quality medical visual content','Video for website and social media','Doctor introduction and testimonial videos','Procedure walkthrough animations'],  order:8 },
};

const otherServices = Object.values(fallbackServices);

export function generateStaticParams() {
  return Object.keys(fallbackServices).map((slug) => ({ slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let service: Service | null = null;
  try { service = await getServiceBySlug(slug) as Service | null; } catch { /* use fallback */ }
  if (!service) service = fallbackServices[slug] ?? null;
  if (!service) notFound();

  const Icon    = iconMap[service.icon] || GlobeAltIcon;
  const content = serviceContent[slug];
  const related = otherServices.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.07)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,26,46,0.5)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/services" className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-gold transition-colors mb-10">
              ← Back to Services
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white leading-tight mb-4">
                  {service.title}
                </h1>
                {content && (
                  <p className="font-body text-lg text-gold/80 italic mb-4">{content.tagline}</p>
                )}
                <p className="font-body text-base text-text-secondary leading-relaxed mb-8">
                  {service.summary}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/#contact" className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200">
                    Get Started
                  </Link>
                  <Link href="#process" className="inline-flex font-body font-medium px-8 py-4 border border-white/20 text-white rounded-md hover:border-gold hover:text-gold transition-all duration-200">
                    See How It Works
                  </Link>
                </div>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-10">
                <h2 className="font-heading text-2xl text-white mb-6">What&apos;s Included</h2>
                <ul className="space-y-4">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-text-secondary">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {content && <>

          {/* ── Stats Strip ───────────────────────────────────────────── */}
          <section className="py-14 bg-surface border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-heading text-5xl font-bold text-gold mb-2">{stat.value}</div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Process ───────────────────────────────────────────────── */}
          <section id="process" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4">How We Do It</h2>
                <p className="font-body text-text-secondary max-w-xl mx-auto">A proven process built specifically for healthcare — no guesswork, no generic playbooks.</p>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.process.map((step, i) => (
                  <div key={i} className="bg-surface border border-border rounded-xl p-7 hover:border-gold/30 transition-colors group">
                    <div className="font-heading text-4xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors mb-4 leading-none">
                      {step.step}
                    </div>
                    <h3 className="font-heading text-xl text-white mb-3">{step.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Deep-dive: What You Get ────────────────────────────────── */}
          <section className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4">Everything You Get</h2>
                <p className="font-body text-text-secondary max-w-xl mx-auto">Every deliverable, explained — so you know exactly what your investment covers.</p>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.included.map((item, i) => (
                  <div key={i} className="bg-background border border-border rounded-xl p-7 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.06)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl text-white mb-3">{item.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Outcome Banner ─────────────────────────────────────────── */}
          <section className="py-20 bg-navy relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="w-1 h-12 bg-gold mx-auto mb-8 rounded-full" />
              <p className="font-heading text-2xl md:text-3xl text-white leading-relaxed italic">
                &ldquo;{content.outcome}&rdquo;
              </p>
              <div className="mt-10">
                <Link href="/#contact" className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200">
                  Start the Conversation
                </Link>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="py-24 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4">Common Questions</h2>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
              <div className="space-y-4">
                {content.faq.map((item, i) => (
                  <div key={i} className="bg-surface border border-border rounded-xl p-7">
                    <h3 className="font-heading text-lg text-gold mb-3">{item.question}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Related Services ───────────────────────────────────────── */}
          <section className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl font-semibold text-white mb-4">Explore Other Services</h2>
                <div className="w-16 h-0.5 bg-gold mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((s) => {
                  const RelIcon = iconMap[s.icon] || GlobeAltIcon;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`}
                      className="group bg-background border border-border rounded-xl p-7 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.07)] transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                        <RelIcon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-heading text-xl text-white mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed">{s.summary}</p>
                      <span className="inline-flex items-center gap-1 mt-4 font-body text-sm text-gold/70 group-hover:text-gold transition-colors">
                        Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

        </>}

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
