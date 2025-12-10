export const Prioridad = {
  ALTO: "Alta",
  MEDIO: "Media",
  BAJO: "Baja",
} as const;

export type Prioridad = (typeof Prioridad)[keyof typeof Prioridad];
