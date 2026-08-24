import { Hono } from "hono";
import type { Env } from "./types";
import { corsMiddleware } from "./middleware/cors";
import { getWaitlistRepository } from "./services/waitlist.service";

const app = new Hono<{ Bindings: Env }>();

app.use("*", corsMiddleware);

app.get("/health", (c) => c.json({ status: "ok" }));

app.post("/waitlist", async (c) => {
  const body = await c.req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return c.json({ success: false, error: "Correo electrónico inválido" }, 400);
  }

  const repository = getWaitlistRepository(c.env);
  const entry = await repository.addEmail(email);

  return c.json({ success: true, id: entry.id }, 201);
});

export default app;
