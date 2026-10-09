# Company Portal — Visitor & Interview Management

Full-stack app: React (Vite + Tailwind) frontend + Express + MongoDB backend.

## Structure

```
interview/
├── client/   # React frontend (Vite)
└── server/   # Express API + MongoDB
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Quick Start

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then edit MONGODB_URI / JWT_SECRET
npm run dev            # or: npm start
```

Server runs on `http://localhost:5000`.

API routes:
- `GET /` — health check
- `/api/visitors` — visitor form + list
- `/api/interviews` — interview form + list
- `/api/dashboard` — dashboard stats
- `/api/auth` — admin auth

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

App runs on `http://localhost:5173` and calls the API at `http://localhost:5000/api` (see `client/src/services/api.js`).

### 3. Build

```bash
cd client
npm run build
```

## Env Vars (server/.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/companyportal
JWT_SECRET=your_jwt_secret_here
```

> `.env` is gitignored. Use `.env.example` as a template.

## Routes (frontend)

- `/` — Home
- `/visitor` — Visitor form
- `/interview` — Interview form
- `/admin/login`, `/admin`, `/admin/dashboard`, `/admin/visitors`, `/admin/interviewees`
