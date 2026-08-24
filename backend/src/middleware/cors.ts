import { cors } from "hono/cors";

// Orígenes permitidos para el frontend (dev de Vite y preview de Wrangler).
// Se puede ampliar con el dominio de producción cuando exista.
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8788",
  "https://waitly-frontend.jorgechavezrnd.workers.dev",
];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
});
