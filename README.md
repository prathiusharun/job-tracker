# Job Tracker

![CI](https://github.com/prathiusharun/job-tracker/actions/workflows/ci.yml/badge.svg)

A full-stack SaaS application for tracking job applications through every stage of the hiring process.

**Live Demo**: https://job-tracker-henna-gamma.vercel.app

---

## The Problem

Job hunting is chaotic. Applications pile up across different companies, roles, and stages. Most people track this in spreadsheets or don't track it at all. Job Tracker gives you one clean place to manage everything.

---

## Features

- Google OAuth authentication
- Add job applications with company, role, salary, location type, and employment type
- Track application status: Applied, Interview, Offer, Rejected
- Real-time status updates without page reload
- Stats dashboard showing totals across every stage
- Delete applications
- Protected routes so unauthenticated users are redirected to login
- Fully deployed and live in production

---

## System Architecture

```mermaid
flowchart TD
    A[User] --> B[Next.js Frontend]
    B --> C{Authenticated?}
    C -->|No| D[Redirect to Login]
    C -->|Yes| E[Dashboard]
    E --> F[Server Actions]
    F --> G[Prisma ORM]
    G --> H[PostgreSQL on Neon]
    B --> I[NextAuth v5]
    I --> J[Google OAuth]
    I --> G
```

---

## Performance

Measured via PageSpeed Insights on production.

**Desktop**
- Performance: 100
- Accessibility: 98
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 0.2s
- Largest Contentful Paint: 0.4s

**Mobile**
- Performance: 98
- Accessibility: 98
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 0.8s
- Largest Contentful Paint: 2.0s

## Tech Stack

- **Next.js 14** App Router, Server Actions, Server Components
- **TypeScript** end to end type safety
- **PostgreSQL** hosted on Neon
- **Prisma ORM** database access and migrations
- **NextAuth v5** Google OAuth with database sessions
- **Tailwind CSS** styling
- **Vercel** deployment and hosting

---
## Docker

```bash
docker compose up
```

Nginx reverse proxy runs on port 80 and forwards to the Next.js app on port 3000.

## Key Engineering Decisions

**Server Actions over API Routes** reduces network overhead and simplifies data flow. Forms submit directly to server functions without a separate API layer.

**Database sessions over JWT** stores sessions in PostgreSQL via the NextAuth adapter. This allows instant session invalidation and avoids token management complexity.

**Middleware route protection** checks authentication at the proxy layer before any page renders, keeping protection logic in one place rather than duplicated across pages.

**Neon serverless PostgreSQL** handles connection pooling via the Neon adapter, solving the serverless cold start problem on Vercel.

---

## Local Development

```bash
git clone https://github.com/prathiusharun/job-tracker
cd job-tracker
npm install
```

Create a `.env` file:

```
AUTH_SECRET=
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
DATABASE_URL=
```

```bash
npx prisma migrate dev
npm run dev
```

---

## What's Next

- Stripe integration with free tier limited to 10 applications and paid unlimited
- Email reminders for follow-ups
- Analytics including response rate and time to offer
- Export to CSV