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

// IMPORT NUEVO: Pantalla de Gestión de Empleados
import GestionEmpleadosScreen from "./mi-area/GestionEmpleadosScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        
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

        {/* --- NUEVA RUTA: GESTIÓN DE EMPLEADOS --- */}
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