import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import FeedbackPage from "./feedback/FeedbackPage";
import Layout from "./layout"; // Importar tu componente Layout, no de lucide-react
import ReclamosAsignadosScreen from "./reclamos-asignados/ReclamosAsignadosScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route
          path="/inicio"
          element={
            <Layout>
              <ReclamosAsignadosScreen />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
