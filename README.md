# Feedback Collection App

A modern feedback collection app built with Next.js (App Router), Prisma, and PostgreSQL. Users can submit feedback with name, message, rating, and optional anonymity; view all feedback; and update their own entries.

## Stack

- **Frontend & API:** Next.js 16, React 19, Tailwind CSS
- **Database:** PostgreSQL (Supabase / Neon compatible)
- **ORM:** Prisma

## Run locally

1. **Install**
   ```bash
   npm install
   ```
2. **Environment**
   - Create `.env` in the project root with `DATABASE_URL` set to your PostgreSQL connection string (e.g. from Supabase).
3. **Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Start**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

- Leave **Root Directory** empty (use repository root).
- Add **Environment Variable:** `DATABASE_URL` = your PostgreSQL URL.
- Deploy from the main branch.

## API

- `GET /api/feedback` — list all feedback
- `POST /api/feedback` — create feedback
- `GET /api/feedback/average` — average rating
- `PUT /api/feedback/[id]` — update message and rating
