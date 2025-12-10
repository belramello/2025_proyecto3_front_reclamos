import { Badge } from "@/components/ui/badge";
import { Prioridad } from "@/enums/prioridad.enum";

interface TipoPrioridadBadgeProps {
  tipoPrioridad: Prioridad;
}

const TipoPrioridadBadge = ({ tipoPrioridad }: TipoPrioridadBadgeProps) => {
  const obtenerClaseColor = (tipo: Prioridad): string => {
    const colores: Record<string, string> = {
      [Prioridad.ALTO]: "bg-red-100 text-red-800 hover:bg-red-200",
      [Prioridad.MEDIO]: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      [Prioridad.BAJO]: "bg-green-100 text-green-800 hover:bg-green-200",
    };
    return colores[tipo] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  return (
    <Badge className={obtenerClaseColor(tipoPrioridad)}>{tipoPrioridad}</Badge>
  );
};

export default TipoPrioridadBadge;
