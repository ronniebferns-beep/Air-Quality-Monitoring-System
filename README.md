# Air Quality Dashboard

A full-stack web app to forecast, visualize, and notify about air quality using NASA TEMPO satellite, OpenAQ ground sensors, OpenWeatherMap, and custom Arduino payloads. Role-based AI recommendations and alerts for teachers, parents, policymakers, and healthcare workers.

![Dashboard preview](docs/dashboard-preview.png)

---

## Features

- **Multi-source air quality aggregation:** NASA TEMPO, OpenAQ, OpenWeatherMap, and custom devices
- **User roles & preferences:** Auth with role selection (teacher, policymaker, parent, healthcare worker, etc.), location & health info
- **AI recommendations:** Contextual advice for outdoor activities, alerts, and indoor plans
- **Device integration:** Secure Arduino webhook with HMAC or MQTT bridge
- **Modern dashboard UI:** Dark, glassy, neon-accented MUI 5 design
- **Deployment ready:** Vercel (frontend) & Railway (backend/Postgres)
- **Demo mode:** Runs with synthetic data if real APIs are unavailable

---

## Quick Start

### 1. Clone & Install

```sh
git clone https://github.com/your-org/air-quality-dashboard.git
cd air-quality-dashboard
pnpm install
```

### 2. Environment Setup

- Copy `.env.example` to `.env` in both `/backend` and `/frontend`, then fill out secrets.
- Use [Railway](https://railway.app/) for Postgres and backend deployment.
- Use [Vercel](https://vercel.com/) for frontend.

### 3. Local Dev

**Backend:**
```sh
pnpm --filter backend dev
# or
cd backend && npm run dev
```

**Frontend:**
```sh
pnpm --filter frontend dev
# or
cd frontend && npm run dev
```

### 4. Seed Data

```sh
pnpm --filter backend seed
```

Creates a test user, device, and telemetry.

---

## Directory Structure

<details>
<summary>/project-root (expand for details)</summary>

```
/project-root
├── README.md
├── .env.example
├── package.json
├── /frontend
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── /api/
│   │   ├── /components/
│   │   ├── /pages/
│   │   ├── /stores/
│   │   ├── /utils/
│   │   └── /styles/
│   └── vite-env.d.ts
├── /backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── server.ts
│   │   ├── app.ts
│   │   ├── /controllers/
│   │   ├── /routes/
│   │   ├── /services/
│   │   ├── /middleware/
│   │   ├── /jobs/
│   │   ├── /models/
│   │   └── /utils/
│   └── prisma/migrations/
├── /infra
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/
│   └── workflows/ci.yml
├── docs/
│   └── architecture.md
└── tests/
    ├── frontend.test.tsx
    └── backend.test.ts
```
</details>

---

## API Overview

See [docs/architecture.md](docs/architecture.md) for data flow and endpoint details.  
See backend `/src/routes/` and `/src/controllers/` for implementation.

---

## Dev Commands

- `pnpm install` — install all deps (workspace)
- `pnpm --filter backend dev` — start backend dev server
- `pnpm --filter frontend dev` — start frontend dev server
- `pnpm --filter backend seed` — seed test data
- `pnpm test` — run all tests (frontend/backend)
- `pnpm lint` — run eslint/prettier

---

## Deployment

- **Frontend:** Deploy `/frontend` with Vercel. Set env vars in Vercel dashboard.
- **Backend:** Deploy `/backend` with Railway. Set secrets in Railway dashboard.
- **Database:** Railway Postgres (auto-provisioned or use docker-compose for local dev).

---

## .env.example

See [.env.example](./.env.example) for all required environment variables.

---

## Docs & Architecture

See [docs/architecture.md](docs/architecture.md) for:

- Data model & flow
- Aggregation logic
- AI prompt format
- Security model
- API contract

---

## License

MIT