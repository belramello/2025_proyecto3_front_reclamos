export const Prioridad = {
  ALTO: "Alto",
  MEDIO: "Medio",
  BAJO: "Bajo",
} as const;

export type Prioridad = (typeof Prioridad)[keyof typeof Prioridad];
