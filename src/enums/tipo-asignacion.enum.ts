export const TipoAsignacion = {
  INICIAL: "Inicial",
  DE_AREA_A_SUBAREA: "AsignacionDeAreaASubarea",
  DE_AREA_A_AREA: "AsignacionDeAreaAArea",
  DE_AREA_A_EMPLEADO: "AsignacionDeAreaAEmpleado",
  AUTOASIGNACION: "Autoasignacion",
  DE_EMPLEADO_A_EMPLEADO: "AsignacionDeEmpleadoAEmpleado",
  DE_EMPLEADO_A_SUBAREA: "AsignacionDeEmpleadoASubarea",
  DE_EMPLEADO_A_AREA: "AsignacionDeEmpleadoAArea",
} as const;

export type TipoAsignacion =
  (typeof TipoAsignacion)[keyof typeof TipoAsignacion];
