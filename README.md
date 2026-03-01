# Feedback Collection App

A modern feedback collection app built with Next.js (App Router), Prisma, and PostgreSQL (Neon). Users can submit feedback with name, message, rating, and optional anonymity; view all feedback; and update their own entries.

## Stack

- **Frontend & API:** Next.js 16, React 19, Tailwind CSS
- **Database:** Neon (serverless PostgreSQL)
- **ORM:** Prisma

## 1. Create a Neon database

1. Go to [neon.tech](https://neon.tech) and sign up (e.g. with GitHub).
2. **Create a project** (name it e.g. `feedback-app`), choose a region.
3. On the project dashboard, open **Connection details** or **Connection string**.
4. Copy the **Prisma** connection string. It looks like:
   ```
   postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
   ```

## 2. Run locally

1. **Install**
   ```bash
   npm install
   ```
2. **Environment**
   - Create `.env` in the project root.
   - Set `DATABASE_URL` to your Neon connection string (from step 1).
   ```env
   DATABASE_URL="postgresql://..."
   ```
3. **Create tables**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Start**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## 3. Deploy on Vercel (with Neon)

1. Push your code to GitHub and import the repo in Vercel.
2. **Root Directory:** leave empty (use repository root).
3. **Environment variables**
   - Vercel → your project → **Settings** → **Environment Variables**.
   - Add:
     - **Name:** `DATABASE_URL`
     - **Value:** paste the **same** Neon connection string from step 1.
   - Apply to **Production** and **Preview** → Save.
4. **Deploy** (or **Redeploy** if the project already exists).

Your feedback list and average rating will load from Neon on Vercel.

## API

- `GET /api/feedback` — list all feedback
- `POST /api/feedback` — create feedback
- `GET /api/feedback/average` — average rating
- `PUT /api/feedback/[id]` — update message and rating
