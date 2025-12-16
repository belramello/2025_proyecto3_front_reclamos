import {
  AtSignIcon,
  ChartArea,
  Home,
  UserPlus,
  Users,
  Briefcase,
  Folder,
  Shield,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PermissionGuard } from "@/guards/permisos-guard";
import { Permisos } from "@/enums/permisos.enum";
import { useContext } from "react";
import { AuthContext } from "@/auth/context/contexto";
import { cerrarSesion } from "@/services/ServicioAutenticacion";

export function AppSidebar() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Navbar debe estar dentro de AuthProvider");
  }
  const { logout } = authContext;

  const handleLogout = () => {
    cerrarSesion();
    logout();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 flex justify-center">
          <a href="/inicio">
            {" "}
            {/* O la ruta principal de tu aplicación */}
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
                requiredPermissions={[Permisos.AUTO_ASIGNAR_RECLAMO]}
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

              <PermissionGuard requiredPermissions={Permisos.REGISTRAR_RECLAMO}>
                <SidebarMenuItem key={"Mis reclamos"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"mis-reclamos"}>
                    <Home />
                    <span>Reclamos</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>
              <PermissionGuard
                requiredPermissions={[
                  Permisos.EDITAR_PROYECTOS,
                  Permisos.ELIMINAR_PROYECTOS,
                ]}
              >
                <SidebarMenuItem key={"Gestion Clientes"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"gestion-clientes"}>
                    <Briefcase />
                    <span>Gestión de Clientes</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />

                <SidebarMenuItem key={"Gestion Proyectos"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"gestion-proyectos"}>
                    <Folder />
                    <span>Gestión de Proyectos</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />

                <SidebarMenuItem key={"Gestion Encargados"}></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"gestión-encargados"}>
                    <Shield size={18} />
                    <span>Gestión de Encargados</span>
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
              <PermissionGuard
                requiredPermissions={[Permisos.ASIGNAR_RECLAMO_A_EMPLEADO]}
              >
                <SidebarMenuItem
                  key={"Empleados Registrados"}
                ></SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"gestion-empleados"}>
                    <Users />
                    <span>Empleados Registrados</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuItem />
              </PermissionGuard>
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
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
