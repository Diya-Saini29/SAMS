# SAMS Frontend

React + Vite + Tailwind CSS frontend for the Smart Airport Management System.

## Backend contract

This frontend is wired to the supplied Express backend:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `/api/flights`
- `/api/luggage`
- `/api/visitors`
- `/api/staff`
- `/api/transportation`

JWT is read from `localStorage` and sent as `Authorization: Bearer <token>`.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Default API URL: `http://localhost:5000/api`.

The dashboard has a visual fallback dataset so the layout still looks populated before MongoDB contains records. Once the API returns records, the live data is used.
