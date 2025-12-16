import { AtSignIcon, ChartArea, Home, UserPlus, Users } from "lucide-react";
import logo from "../assets/logo.png";
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
        <div className="p-4 flex justify-center">
          <a href="/inicio"> {/* O la ruta principal de tu aplicación */}
            <img 
              src={logo} 
              alt="Logo de la empresa" 
              className="h-20 w-auto" // Ajusta el tamaño según sea necesario
            />
          </a>
        </div>
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

              <SidebarMenuItem key={"Estadisticas"}></SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"inicio"}>
                  <ChartArea />
                  <span>Estadísticas</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuItem />

              {/* --- 1. TU PARTE: EMPLEADOS REGISTRADOS --- */}
              <PermissionGuard requiredPermissions={[Permisos.CREAR_USUARIOS]}>
                <SidebarMenuItem key={"Empleados Registrados"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"gestion-empleados"}>
                    <Users /> 
                    <span>Empleados Registrados</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

              {/* --- 2. COMÚN: REGISTRAR USUARIO --- */}
              <PermissionGuard requiredPermissions={[Permisos.CREAR_USUARIOS]}>
                <SidebarMenuItem key={"Registrar Usuario"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"registrar-usuario"}>
                    <UserPlus /> 
                    <span>Registrar Usuario</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

              {/* --- 3. PARTE DE TU COMPAÑERA: CREAR FEEDBACK --- */}
              <PermissionGuard requiredPermissions={[Permisos.CREAR_FEEDBACK]}>
                <SidebarMenuItem key={"Crear Feedback"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"feedback"}>
                    <UserPlus /> 
                    <span>Crear Feedback</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}