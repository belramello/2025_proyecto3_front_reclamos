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
        <Route path="/feedback" element={<FeedbackPage />} />
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

        <Route
          path="/mis-reclamos"
          element={
            <ProtectedRoute>
              <Layout>
                <ReclamosPantallaPrincipal/>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crear-reclamo"
          element={
            <ProtectedRoute>
              <Layout>
                <ReclamosScreen/>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
