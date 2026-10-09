# Company Portal — Visitor & Interview Management

Full-stack app: React (Vite + Tailwind) frontend + Express + MongoDB backend.

Live URLs (fill after deploy):
- Frontend (Vercel): `https://<your-app>.vercel.app`
- Backend (Render): `https://<your-api>.onrender.com`

## Structure

```
interview/
├── client/      # React frontend (Vite) → deploy on Vercel
├── server/      # Express API + MongoDB → deploy on Render
└── render.yaml  # Render blueprint for backend
```

## Prerequisites

- Node.js 18+
- MongoDB (local for dev, **MongoDB Atlas** for production)

## Quick Start (local)

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then edit MONGODB_URI / JWT_SECRET / FRONTEND_URL
npm run dev            # or: npm start
```

Server runs on `http://localhost:5000`.

API routes:
- `GET /` — health check
- `GET /api/health` — Render health check
- `/api/visitors` — visitor form + list
- `/api/interviews` — interview form + list (resume upload)
- `/api/dashboard` — dashboard stats
- `/api/auth` — admin auth

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env.local   # VITE_API_URL=http://localhost:5000/api
npm run dev
```

App runs on `http://localhost:5173` and calls the API via `VITE_API_URL`
(see `client/src/services/api.js`).

### 3. Build

```bash
cd client
npm run build
```

## Env Vars

**server/.env** (gitignored — see `server/.env.example`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/companyportal
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```

**client/.env.local** (gitignored — see `client/.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

## Deploy — Vercel (frontend) + Render (backend)

Recommended free setup:

### Step 0 — MongoDB Atlas (free)

1. Create account at https://cloud.mongodb.com → create **M0 Free** cluster.
2. Database Access → add user + password.
3. Network Access → allow `0.0.0.0/0` (or Render IPs).
4. Connect → copy connection string, e.g.:
   `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/companyportal?retryWrites=true&w=majority`

### Step 1 — Backend on Render

Option A — Blueprint (uses `render.yaml` in repo root):
1. https://dashboard.render.com → **New → Blueprint** → connect `garg0806/Vistor_Pannel`.
2. Set env vars when prompted:
   - `MONGODB_URI` = Atlas string above
   - `JWT_SECRET` = long random string
   - `FRONTEND_URL` = leave placeholder for now (update after Vercel deploy)
3. Deploy. Note your URL: `https://<your-api>.onrender.com`.
4. Verify: `https://<your-api>.onrender.com/api/health` → `{"success":true,"message":"OK"}`.

The Blueprint uses Render's free web-service plan. Free services spin down after
15 minutes without traffic and can take about a minute to wake up. Files stored
on the service filesystem (including uploaded resumes) are ephemeral and may be
lost when the service restarts or spins down. Use persistent external storage
and a paid plan for production workloads.

Option B — Manual Web Service:
1. **New → Web Service** → connect repo.
2. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node 20`
   - Health Check Path: `/api/health`
3. Env vars: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL` (update after Vercel).
4. Deploy.

> Note: Render free disk is ephemeral — uploaded resumes in `server/uploads`
> are lost on redeploy/restart. For permanent storage use S3/Cloudinary.

### Step 2 — Frontend on Vercel

1. https://vercel.com/new → Import `garg0806/Vistor_Pannel`.
2. Configure project:
   - **Root Directory:** `client`
   - Framework Preset: `Vite` (auto: Build `npm run build`, Output `dist`)
   - Env var: `VITE_API_URL=https://<your-api>.onrender.com/api`
3. Deploy. Note your URL: `https://<your-app>.vercel.app`.
4. SPA fallback is handled by `client/vercel.json` rewrites.

### Step 3 — Connect them

1. Back in Render → your service → Environment → set
   `FRONTEND_URL=https://<your-app>.vercel.app` → redeploy
   (server uses this for CORS).
2. Open `https://<your-app>.vercel.app` — forms + admin login should hit the live API.

### Step 4 — Admin login

- Register once via `POST https://<your-api>.onrender.com/api/auth/register`
  with `{ "username", "email", "password" }` (use Postman/curl), then login
  at `https://<your-app>.vercel.app/admin/login`.
- Consider disabling public `/register` after creating your admin.

## Routes (frontend)

- `/` — Home
- `/visitor` — Visitor form
- `/interview` — Interview form
- `/admin/login`, `/admin`, `/admin/dashboard`, `/admin/visitors`, `/admin/interviewees`
