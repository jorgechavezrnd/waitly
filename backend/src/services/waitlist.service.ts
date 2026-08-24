import type { Env } from "../types";

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

export interface WaitlistRepository {
  addEmail(email: string): Promise<WaitlistEntry>;
}

// Implementación mock: no persiste nada, solo simula una escritura exitosa.
// Reemplazar por una implementación con D1 (o la DB que se elija) sin tocar
// el resto de la app: basta con implementar WaitlistRepository.
class MockWaitlistRepository implements WaitlistRepository {
  async addEmail(email: string): Promise<WaitlistEntry> {
    return {
      id: crypto.randomUUID(),
      email,
      createdAt: new Date().toISOString(),
    };
  }
}

export function getWaitlistRepository(_env: Env): WaitlistRepository {
  // Cuando exista env.DB (D1), devolver aquí una implementación con D1
  // en su lugar, p.ej.: return new D1WaitlistRepository(_env.DB);
  return new MockWaitlistRepository();
}
