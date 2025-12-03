import { Badge } from "@/components/ui/badge";
import { TipoAsignacion } from "@/enums/tipo-asignacion.enum";

interface TipoAsignacionBadgeProps {
  tipoAsignacion: TipoAsignacion;
}

const TipoAsignacionBadge = ({ tipoAsignacion }: TipoAsignacionBadgeProps) => {
  const formatearNombre = (tipo: TipoAsignacion): string => {
    const formatos: Record<string, string> = {
      [TipoAsignacion.INICIAL]: "Inicial",
      [TipoAsignacion.DE_AREA_A_SUBAREA]: "Área a Subárea",
      [TipoAsignacion.DE_AREA_A_AREA]: "Área a Área",
      [TipoAsignacion.DE_AREA_A_EMPLEADO]: "Área a Empleado",
      [TipoAsignacion.AUTOASIGNACION]: "Autoasignación",
      [TipoAsignacion.DE_EMPLEADO_A_EMPLEADO]: "Empleado a Empleado",
      [TipoAsignacion.DE_EMPLEADO_A_SUBAREA]: "Empleado a Subárea",
      [TipoAsignacion.DE_EMPLEADO_A_AREA]: "Empleado a Área",
    };
    return formatos[tipo] || tipo;
  };

  const obtenerClaseColor = (tipo: TipoAsignacion): string => {
    const colores: Record<string, string> = {
      [TipoAsignacion.INICIAL]: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      [TipoAsignacion.DE_AREA_A_SUBAREA]:
        "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      [TipoAsignacion.DE_AREA_A_AREA]:
        "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
      [TipoAsignacion.DE_AREA_A_EMPLEADO]:
        "bg-purple-100 text-purple-800 hover:bg-purple-200",
      [TipoAsignacion.AUTOASIGNACION]:
        "bg-blue-100 text-blue-800 hover:bg-blue-200",
      [TipoAsignacion.DE_EMPLEADO_A_EMPLEADO]:
        "bg-green-100 text-green-800 hover:bg-green-200",
      [TipoAsignacion.DE_EMPLEADO_A_SUBAREA]:
        "bg-teal-100 text-teal-800 hover:bg-teal-200",
      [TipoAsignacion.DE_EMPLEADO_A_AREA]:
        "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };
    return colores[tipo] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  return (
    <Badge className={obtenerClaseColor(tipoAsignacion)}>
      {formatearNombre(tipoAsignacion)}
    </Badge>
  );
};

export default TipoAsignacionBadge;
