import { useAuth } from "@/auth/context/contexto";
import type { ReactNode } from "react";

interface PermissionGuardProps {
  requiredPermissions: string | string[];
  mode?: "or" | "and";
  children: ReactNode;
}

export const PermissionGuard = ({
  requiredPermissions,
  mode = "or",
  children,
}: PermissionGuardProps) => {
  const { permisos } = useAuth();

  if (!permisos) return null;

  const permisosArray = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  const tienePermiso =
    mode === "and"
      ? permisosArray.every((p) => permisos.includes(String(p)))
      : permisosArray.some((p) => permisos.includes(String(p)));

  if (!tienePermiso) return null;

  return <>{children}</>;
};
