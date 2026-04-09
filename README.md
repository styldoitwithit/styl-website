# STYL Digital Marketing — Website

Production-ready Next.js website for **STYL Digital Marketing**, India's No.1 Healthcare Branding Expert for Hospitals & Doctors. Based in Chennai.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Toasts**: React Hot Toast

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

Copy `.env.example` to `.env.local` and fill in your Firebase project credentials:

```bash
cp .env.example .env.local
```

Get your credentials from: [Firebase Console](https://console.firebase.google.com) → Your Project → Project Settings → Web App

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### 3. Seed Firestore (optional — populates initial data)

Install tsx for running TypeScript scripts:

```bash
npm install -D tsx dotenv
```

Then run:

```bash
npx tsx src/scripts/seed.ts
```

This populates: clients, testimonials, case studies, services, and stats.

### 4. Add client logo images

Place images in `public/assets/` — see `public/assets/README.md` for required filenames.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Admin Dashboard

- Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

**To create an admin user:**
1. Go to Firebase Console → Authentication → Users → Add User
2. Use that email/password to log in at `/admin/login`

---

## Site Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, clients, case studies, services, stats, testimonials, contact |
| `/about` | About STYL — story, values, team |
| `/services` | Services overview |
| `/services/[slug]` | Individual service detail |
| `/clients` | Client portfolio & case studies |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/process` | Our 5-step process |
| `/contact` | Contact page |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard (auth protected) |

---

## Deployment (Vercel)

```bash
npm run build
```

Deploy via Vercel:
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel project settings
4. Deploy

---

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── about/
│   ├── admin/
│   ├── blog/[slug]/
│   ├── clients/
│   ├── contact/
│   ├── process/
│   ├── services/[slug]/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/         # Admin dashboard components
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Home page sections
│   └── ui/            # Reusable UI primitives
├── lib/
│   ├── firebase.ts    # Firebase initialisation
│   └── firestore.ts   # Firestore helper functions
├── scripts/
│   └── seed.ts        # Database seed script
└── types/
    └── index.ts       # TypeScript types
```
