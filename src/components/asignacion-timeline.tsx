import type { HistorialAsignacion } from "@/interfaces/historial-asignacion.dto";
import { Card, CardContent } from "./ui/card";
import { Clock, MessagesSquare, Users } from "lucide-react";
import { TipoAsignacion } from "@/enums/tipo-asignacion.enum";

export const AsignacionesTimelineVertical = ({
  historialAsignaciones,
}: {
  historialAsignaciones: HistorialAsignacion[];
}) => {
  const generarDescripcionAsignacion = (
    asignacion: HistorialAsignacion
  ): string => {
    const {
      tipoAsignacion,
      desdeArea,
      haciaArea,
      haciaSubarea,
      deEmpleado,
      haciaEmpleado,
    } = asignacion;

    switch (tipoAsignacion) {
      case TipoAsignacion.INICIAL:
        return `Asignado inicialmente al área: ${haciaArea?.nombre || "N/A"}`;
      case TipoAsignacion.DE_AREA_A_SUBAREA:
        return `Asignado del área ${desdeArea?.nombre} a la subárea ${haciaSubarea?.nombre}`;
      case TipoAsignacion.DE_AREA_A_AREA:
        return `Asignado del área ${desdeArea?.nombre} al área ${haciaArea?.nombre}`;
      case TipoAsignacion.DE_AREA_A_EMPLEADO:
        return `Asignado del área ${desdeArea?.nombre} al empleado ${haciaEmpleado?.nombre}`;
      case TipoAsignacion.AUTOASIGNACION:
        return `Auto-asignado por ${haciaEmpleado?.nombre}`;
      case TipoAsignacion.DE_EMPLEADO_A_EMPLEADO:
        return `Reasignado de ${deEmpleado?.nombre} a ${haciaEmpleado?.nombre}`;
      case TipoAsignacion.DE_EMPLEADO_A_SUBAREA:
        return `Reasignado de ${deEmpleado?.nombre} a la subárea ${haciaSubarea?.nombre}`;
      case TipoAsignacion.DE_EMPLEADO_A_AREA:
        return `Reasignado de ${deEmpleado?.nombre} al área ${haciaArea?.nombre}`;
      default:
        return "Asignación realizada";
    }
  };

  const formatearTipoAsignacion = (tipo: string): string => {
    const formatos: Record<string, string> = {
      Inicial: "Asignación Inicial",
      AsignacionDeAreaASubarea: "Área → Subárea",
      AsignacionDeAreaAArea: "Área → Área",
      AsignacionDeAreaAEmpleado: "Área → Empleado",
      Autoasignacion: "Auto-asignación",
      AsignacionDeEmpleadoAEmpleado: "Empleado → Empleado",
      AsignacionDeEmpleadoASubarea: "Empleado → Subárea",
      AsignacionDeEmpleadoAArea: "Empleado → Área",
    };
    return formatos[tipo] || tipo;
  };

  const sortedAsignaciones = [...historialAsignaciones].sort(
    (a, b) =>
      new Date(b.fechaAsignacion).getTime() -
      new Date(a.fechaAsignacion).getTime()
  );

  if (sortedAsignaciones.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-6">
          Historial de Asignaciones
        </h3>
        <p className="text-gray-500">No hay asignaciones registradas aún.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Historial de Asignaciones</h3>
      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />

        {/* Asignaciones */}
        <div className="space-y-8">
          {sortedAsignaciones.map((asignacion) => {
            const isActive = !asignacion.fechaHoraFin;

            return (
              <div key={asignacion.id} className="relative pl-12">
                {/* Punto en la línea */}
                <div
                  className={`absolute left-[7px] top-2 w-[18px] h-[18px] rounded-full border-4 ${
                    isActive
                      ? "bg-purple-500 border-purple-600"
                      : "bg-gray-400 border-gray-500"
                  }`}
                />

                {/* Card de asignación */}
                <Card
                  className={`${
                    isActive ? " border-purple-500" : "border-gray-200"
                  }`}
                >
                  <CardContent>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Users
                            className={`w-4 h-4 ${
                              isActive ? "text-purple-600" : "text-gray-500"
                            }`}
                          />
                          <h4
                            className={`font-semibold text-sm ${
                              isActive ? "text-purple-600" : "text-gray-500"
                            }`}
                          >
                            {formatearTipoAsignacion(asignacion.tipoAsignacion)}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-950">
                          {generarDescripcionAsignacion(asignacion)}
                        </p>
                        {asignacion.comentario && (
                          <div className="flex items-center gap-2 mt-1 mb-1">
                            <MessagesSquare
                              className={`w-4 h-4 ${
                                isActive ? "text-purple-600" : "text-gray-500"
                              }`}
                            />
                            <p className="text-sm text-gray-600">
                              Comentario: {asignacion.comentario}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(asignacion.fechaAsignacion).toLocaleString(
                          "es-AR"
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
