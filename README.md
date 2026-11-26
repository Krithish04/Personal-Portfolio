# Krithish Ravindra Suvarna — Personal Portfolio & Admin Panel (v2)

A simple, elegant, calm developer portfolio and content management system built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB (Mongoose + GridFS)**.

[![Live Demo](https://img.shields.io/badge/Live_Site-krithish--portfolio.vercel.app-9F4F2C?style=for-the-badge&logo=vercel&logoColor=white)](https://krithish-portfolio.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

🌐 **Live URL**: [https://krithish-portfolio.vercel.app/](https://krithish-portfolio.vercel.app/)

---

## 📖 Overview

This is version 2 of the portfolio, redesigned from the ground up to prioritize **clarity, typography, and content**. It eliminates heavy animation libraries, cursor glows, particle networks, and terminal gimmicks in favor of a warm neutral, paper-like design with a muted clay accent.

In addition to the public-facing portfolio, it includes a **private, authenticated Admin Panel** (`/admin`) that allows editing all profile content, managing project case studies, publishing blog posts, uploading resume versions, reviewing contact form messages, inspecting privacy-friendly analytics, and toggling features on or off in real time without redeploying code.

---

## ⚡ Key Features

### Public Site
- 📄 **Content-First Layout**: Centered, readable layout (~68ch prose width) with generous whitespace and clear hierarchy.
- 🎴 **Case Studies & Static Architecture MiniFlows**: Detailed case study pages (`/projects/[slug]`) with problem, approach, technical decisions, and flat static data architecture flows.
- ✍️ **Blog & RSS Feed**: Technical articles (`/blog` and `/blog/[slug]`) rendered with clean Markdown and syndicated via valid RSS at `/rss.xml`.
- 📬 **Spam-Protected Contact Form**: Zero page-reload message submission protected by an invisible honeypot, minimum submit duration check, and per-IP rate limiting.
- 📄 **Managed Resume Download**: Direct download link at `/api/resume/download` serving the active resume PDF as `Krithish_Suvarna_Resume.pdf`.
- 🌓 **Zero-Flash Theme Switcher**: Toggle between light and dark modes with inline `<head>` script preventing theme flash on initial render.
- ♿ **WCAG 2.2 AA Accessibility**: Full keyboard navigation, visible accent focus rings, skip-to-content link, semantic HTML landmarks, and contrast ratios exceeding 5.3:1 in both light and dark themes.

### Private Admin Panel (`/admin`)
- 🔒 **Secure Session Authentication**: Protected by `jose` JWTs in `httpOnly`, `secure`, `sameSite=lax` cookies with rate-limited login.
- 🎛️ **Features Selection Panel**: Instant toggle switches to show or hide public features (Case Studies, Blog, Contact Form, Resume Download, Theme Switcher, Analytics, Show Phone Number) in real time.
- 📝 **Markdown Editor with Live Preview**: Full project and blog content editor with instantaneous Markdown preview tab.
- 🗂️ **MongoDB GridFS Storage**: Resumes and images are stored natively inside MongoDB GridFS without requiring third-party blob providers.
- 📊 **Privacy-Friendly Analytics**: Tracks page paths, referrers, and device categories using daily-rotating salted SHA-256 hashes. Stores **zero** IP addresses, cookies, or persistent user fingerprints, and honors Do Not Track (`DNT`).
- 📥 **Contact Messages Inbox**: View, search, mark read/unread, archive, delete, and export inquiries to CSV.
- 💾 **Database Backup & Restore**: One-click JSON export and import for full content backup and recovery.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2 (App Router, Server and Client Components)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with custom CSS variables for light & dark palettes
- **Database**: MongoDB (Atlas) via Mongoose & native MongoDB GridFS
- **Validation**: Zod (100% schema validation on all inputs)
- **Authentication**: `jose` JWT cookies + `bcryptjs` password hashing
- **Typography**: `Source_Serif_4` (headings), `Inter` (body/UI), `JetBrains_Mono` (code) via `next/font/google`
- **Security**: Strict security headers (HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy)

---

## 📂 Project Structure

```text
portfolio-next/
├── app/
│   ├── admin/                # Private authenticated Admin Panel
│   │   ├── analytics/        # Privacy-friendly traffic dashboard
│   │   ├── blog/             # Article manager with Markdown editor
│   │   ├── experience/       # Career, education & skills manager
│   │   ├── features/         # Real-time public feature toggle switches
│   │   ├── login/            # Admin login screen with rate limiting
│   │   ├── media/            # GridFS image uploader & manager
│   │   ├── messages/         # Contact inquiries inbox & CSV export
│   │   ├── profile/          # Profile bio & contact settings
│   │   ├── projects/         # Case studies & project manager
│   │   ├── resume/           # Resume PDF version manager
│   │   ├── settings/         # System backup/restore & password hash
│   │   └── layout.tsx        # Admin sidebar layout & auth guard
│   ├── api/                  # Next.js Route Handlers
│   │   ├── admin/            # Protected admin API routes
│   │   ├── contact/          # Public contact form submission
│   │   ├── files/[id]/       # GridFS binary file streaming
│   │   ├── resume/download/  # Active resume PDF download
│   │   └── track/            # Privacy-friendly analytics beacon
│   ├── blog/                 # Public blog index & article pages
│   ├── contact/              # Public contact form page
│   ├── projects/             # Public projects index & case studies
│   ├── resume/               # Public resume overview page
│   ├── globals.css           # Design tokens (--bg, --text, --accent)
│   ├── layout.tsx            # Root layout, theme script & analytics
│   ├── page.tsx              # Main homepage assembling sections
│   ├── robots.ts             # robots.txt configuration
│   └── sitemap.ts            # Dynamic XML sitemap generator
├── components/               # Clean, accessible UI components
├── lib/                      # Core utilities (db, auth, gridfs, rateLimit, data)
├── models/                   # Mongoose schemas (Profile, Project, Post, etc.)
└── scripts/                  # Database seed script (scripts/seed.ts)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher
- **MongoDB**: Local MongoDB instance or free MongoDB Atlas connection URI

### 2. Installation
```bash
git clone https://github.com/Krithish04/Personal-Portfolio.git
cd Personal-Portfolio
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in the values:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
AUTH_SECRET=your-random-32-character-secret-key
ADMIN_EMAIL=suvarnakrithish24@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$YourBcryptPasswordHashHere
SITE_URL=https://krithish-portfolio.vercel.app
ANALYTICS_SALT_SECRET=random-salt-for-privacy-analytics
```

> **Note for Local Development:**
> If `ADMIN_PASSWORD_HASH` is not yet set in development, you can sign in to `/admin/login` using email `suvarnakrithish24@gmail.com` and password `admin12345`. You can then generate a custom password hash in **Admin Settings** (`/admin/settings`).

### 4. Database Seeding
Initialize the database with the approved project case studies, experience history, skills, and feature flags:
```bash
npm run seed
```

### 5. Running the Application
```bash
# Start local development server
npm run dev

# Or build and run production bundle
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Admin Panel Usage

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter your administrator email and password.
3. Access the sidebar:
   - **Features**: Toggle sections on/off instantly.
   - **Projects**: Add, reorder, or edit case studies with Markdown preview.
   - **Blog**: Draft or publish articles (drafts are never visible publicly).
   - **Resume**: Upload new PDF versions and select which is active.
   - **Messages**: Review inquiries received through the contact form.
   - **Analytics**: Inspect page traffic, referrers, and device stats.
   - **Settings**: Export JSON database backups or change your password hash.

---

## 📬 Contact & Author

- **Author**: Krithish Ravindra Suvarna
- **Location**: Surat, Gujarat, India
- **Email**: [suvarnakrithish24@gmail.com](mailto:suvarnakrithish24@gmail.com)
- **GitHub**: [github.com/Krithish04](https://github.com/Krithish04)
- **LinkedIn**: [linkedin.com/in/krithish04](https://www.linkedin.com/in/krithish04)
