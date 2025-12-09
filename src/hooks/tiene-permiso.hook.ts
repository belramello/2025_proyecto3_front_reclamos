import { useAuth } from "@/auth/context/contexto";
import type { PermisosType } from "@/enums/permisos.enum";

export const tienePermisoHook = () => {
  const { permisos } = useAuth();

  const tienePermiso = (permiso: PermisosType | PermisosType[]): boolean => {
    if (Array.isArray(permiso)) {
      return permiso.some((p) => permisos?.includes(String(p)));
    }
    return permisos?.includes(String(permiso)) ?? false;
  };

  return { tienePermiso };
};
