import type { Prioridad } from "@/enums/prioridad.enum";

export interface ReclamoDetalle {
  descripcion?: string;
  prioridad: Prioridad;
  nivelCriticidad: number;
  imagenUrl?: string[] | null;
}
