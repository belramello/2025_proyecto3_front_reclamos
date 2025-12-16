import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import FeedbackPage from "./feedback/FeedbackPage";
import Layout from "./layout";
import ReclamosAsignadosScreen from "./reclamos-asignados/ReclamosAsignadosScreen";
import MiSubareaScreen from "./mi-subarea/MiSubareaScreen";
import MiAreaScreen from "./mi-area/MiAreaScreen";
import EstadisticasScreen from "./estadisticas/EstadisticasScreen";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import ReclamosScreen from "./reclamos/ReclamosScreen";
import ReclamosPantallaPrincipal from "./reclamos/ConsultarReclamosScreen";
import RegistroUsuarioPage from "./registro/RegistrarScreen";
import GestionEmpleadosScreen from "./mi-area/GestionEmpleadosScreen";
import ActivarCuentaScreen from "./auth/ActivarCuentaScreen";
import GestionClientesScreen from "./clientes/GestionClientesScreen";
import GestionProyectosScreen from "./proyectos/GestionProyectosScreen";
import GestionEncargadosScreen from "./encargados/GestiónEncargadosScreen";
import OlvideContrasenaScreen from "./login/OlvideContraseña";
import RestablecerContrasenaScreen from "./login/RecuperarContraseña";
import { PermissionGuard } from "./guards/permisos-guard";
import { Permisos } from "./enums/permisos.enum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/activar-cuenta" element={<ActivarCuentaScreen />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/recuperar-contraseña" element={<LoginPage />} />
        <Route path="/forgot-password" element={<OlvideContrasenaScreen />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/reset-password"
          element={<RestablecerContrasenaScreen />}
        />
        <Route
          path="/mi-subarea"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={Permisos.AUTO_ASIGNAR_RECLAMO}
              >
                <Layout>
                  <MiSubareaScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/registrar-usuario"
          element={
            <ProtectedRoute>
              <Layout>
                <RegistroUsuarioPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={[Permisos.CREAR_FEEDBACK]}>
                <Layout>
                  <FeedbackPage />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reclamos-asignados"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={Permisos.CERRAR_RECLAMO}>
                <Layout>
                  <ReclamosAsignadosScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-clientes"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  Permisos.CREAR_USUARIOS,
                  Permisos.EDITAR_USUARIOS,
                  Permisos.ELIMINAR_USUARIOS,
                ]}
              >
                <Layout>
                  <GestionClientesScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-proyectos"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  Permisos.CREAR_PROYECTOS,
                  Permisos.EDITAR_PROYECTOS,
                  Permisos.ELIMINAR_PROYECTOS,
                ]}
              >
                <Layout>
                  <GestionProyectosScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Layout>
                <EstadisticasScreen />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mi-area"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  Permisos.CREAR_USUARIOS,
                  Permisos.ASIGNAR_RECLAMO_A_EMPLEADO,
                ]}
              >
                <Layout>
                  <MiAreaScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-empleados"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  Permisos.CREAR_USUARIOS,
                  Permisos.EDITAR_USUARIOS,
                  Permisos.ELIMINAR_USUARIOS,
                ]}
              >
                <Layout>
                  <GestionEmpleadosScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-reclamos"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[Permisos.VISUALIZAR_ESTADO_DE_RECLAMO]}
              >
                <Layout>
                  <ReclamosPantallaPrincipal />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-reclamo"
          element={
            <ProtectedRoute>
              <PermissionGuard requiredPermissions={Permisos.REGISTRAR_RECLAMO}>
                <Layout>
                  <ReclamosScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestión-encargados"
          element={
            <ProtectedRoute>
              <PermissionGuard
                requiredPermissions={[
                  Permisos.CREAR_USUARIOS,
                  Permisos.EDITAR_USUARIOS,
                  Permisos.ELIMINAR_USUARIOS,
                ]}
              >
                <Layout>
                  <GestionEncargadosScreen />
                </Layout>
              </PermissionGuard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
