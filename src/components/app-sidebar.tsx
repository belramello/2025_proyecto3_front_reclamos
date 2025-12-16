import { AtSignIcon, ChartArea, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PermissionGuard } from "@/guards/permisos-guard";
import { Permisos } from "@/enums/permisos.enum";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión de Reclamos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <PermissionGuard
                requiredPermissions={Permisos.AUTO_ASIGNAR_RECLAMO}
              >
                <SidebarMenuItem key={"Mi Subárea"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"mi-subarea"}>
                    <Home />
                    <span>Mi Subárea</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

              <PermissionGuard
                requiredPermissions={[
                  Permisos.ASIGNAR_RECLAMO_A_EMPLEADO,
                  Permisos.ASIGNAR_RECLAMOS,
                ]}
              >
                <SidebarMenuItem key={"Mi Área"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"mi-area"}>
                    <Home />
                    <span>Mi Area</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

              <PermissionGuard
                requiredPermissions={[
                  Permisos.AUTO_ASIGNAR_RECLAMO,
                  Permisos.REASIGNAR_RECLAMO_A_SUBAREA_AREA_EMPLEADO,
                ]}
              >
                <SidebarMenuItem
                  key={"Mis Reclamos Asignados"}
                ></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"reclamos-asignados"}>
                    <AtSignIcon />
                    <span>Mis reclamos Asignados</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

              <PermissionGuard
                requiredPermissions={Permisos.REGISTRAR_RECLAMO}
              >
                <SidebarMenuItem key={"Mis reclamos"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"mis-reclamos"}>
                    <Home />
                    <span>Reclamos</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

              <SidebarMenuItem key={"Estadisticas"}></SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"inicio"}>
                  <ChartArea />
                  <span>Estadísticas</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
