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
import RegistroUsuarioPage from "./registro/RegistrarScreen";

// Import Pantallas Nuevas existentes
import GestionEmpleadosScreen from "./mi-area/GestionEmpleadosScreen";
import ActivarCuentaScreen from "./auth/ActivarCuentaScreen";

// --- NUEVOS IMPORTS PARA CLIENTES Y PROYECTOS ---
import GestionClientesScreen from "./clientes/GestionClientesScreen";
import GestionProyectosScreen from "./proyectos/GestionProyectosScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* --- RUTA DE ACTIVACIÓN (Pública) --- */}
        <Route path="/auth/activar-cuenta" element={<ActivarCuentaScreen />} />

        {/* Rutas Protegidas */}
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
        
        {/* --- NUEVAS RUTAS DE ADMINISTRADOR --- */}
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
        {/* ----------------------------------- */}

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;