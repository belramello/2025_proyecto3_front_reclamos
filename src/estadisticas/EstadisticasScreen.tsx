import ErrorMessage from "@/components/mensajeError";
import { Spinner } from "@/components/ui/spinner";
import { getDashboardUrl } from "@/services/dashboardService";
import { useEffect, useState } from "react";

function EstadisticasScreen() {
  const [dashboardUrl, setDashboardUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard();
  }, []);

  async function getDashboard() {
    try {
      setLoading(true);
      const { signedUrl } = await getDashboardUrl();
      setDashboardUrl(signedUrl);
      setError(null);
    } catch (err) {
      setError(
        "Error al obtener el dashboard. Verifica tu sesión o con el equipo de backend."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Spinner></Spinner>;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="main-bg-color">
      <iframe
        src={dashboardUrl}
        className="w-310 h-250 border-0 mt-4"
        allowTransparency
      />
    </div>
  );
}

export default EstadisticasScreen;
