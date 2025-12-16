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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/auth/activar-cuenta"
          element={<ActivarCuentaScreen />}
        />
        <Route path="/" element={<LoginPage />} />
        <Route path="/recuperar-contraseña" element={<LoginPage />} />
        <Route
          path="/forgot-password"
          element={<OlvideContrasenaScreen />}
        />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/reset-password"
          element={<RestablecerContrasenaScreen />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/mi-subarea"
          element={
            <ProtectedRoute>
              <Layout>
                <MiSubareaScreen />
              </Layout>
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
              <Layout>
                <FeedbackPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reclamos-asignados"
          element={
            <ProtectedRoute>
              <Layout>
                <ReclamosAsignadosScreen />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-clientes"
          element={
            <ProtectedRoute>
              <Layout>
                <GestionClientesScreen />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-proyectos"
          element={
            <ProtectedRoute>
              <Layout>
                <GestionProyectosScreen />
              </Layout>
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
              <Layout>
                <MiAreaScreen />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-empleados"
          element={
            <ProtectedRoute>
              <Layout>
                <GestionEmpleadosScreen />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-reclamos"
          element={
            <ProtectedRoute>
              <Layout>
                <ReclamosPantallaPrincipal />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crear-reclamo"
          element={
            <ProtectedRoute>
              <Layout>
                <ReclamosScreen />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestión-encargados"
          element={
            <ProtectedRoute>
              <Layout>
                <GestionEncargadosScreen />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
