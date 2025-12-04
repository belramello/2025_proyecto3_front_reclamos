export const Estado = {
  PENDIENTE_A_ASIGNAR: "Pendiente A Asignar",
  EN_PROCESO: "En proceso",
  RESUELTO: "Resuelto",
} as const;

export type Estado = (typeof Estado)[keyof typeof Estado];
