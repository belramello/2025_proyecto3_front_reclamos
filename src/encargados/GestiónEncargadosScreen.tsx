import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Phone,
  Mail,
  Layers,
} from "lucide-react";
import {
  obtenerEncargadosPaginados,
  eliminarEncargado,
} from "@/services/EncargadoService";
import { CrearEncargadoDialog } from "./components/CrearEncargadoDialog";
import { Badge } from "@/components/ui/badge";

export default function GestionEncargadosScreen() {
  const [encargados, setEncargados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    cargarEncargados();
  }, [page]);

  const cargarEncargados = async () => {
    setLoading(true);
    try {
      const response = await obtenerEncargadosPaginados(page, limit);
      if (response && response.data) {
        setEncargados(response.data);
        setTotalPages(response.totalPages || 1);
      }
    } catch (error) {
      console.error("Error cargando encargados", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (encargado: any) => {
    if (!confirm(`¿Eliminar al encargado ${encargado.nombre}?`)) return;
    try {
      await eliminarEncargado(encargado._id || encargado.id);
      cargarEncargados();
    } catch (error: any) {
      alert("No se pudo eliminar el encargado.");
    }
  };

  if (loading && page === 1)
    return (
      <div className="p-6 flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Encargados de Áreas
          </h2>
          <p className="text-muted-foreground mt-1">
            Administra el personal responsable de cada departamento.
          </p>
        </div>
        <CrearEncargadoDialog onEncargadoCreado={cargarEncargados} />
      </div>

      <div className="w-full border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Encargado / Área</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {encargados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No hay encargados registrados.
                  </td>
                </tr>
              ) : (
                encargados.map((enc) => (
                  <tr
                    key={enc._id || enc.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-base">
                            {enc.nombre}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Layers size={12} />
                            <span className="font-medium text-blue-700">
                              {typeof enc.area === "object" && enc.area !== null
                                ? enc.area.nombre
                                : enc.area || "Sin área asignada"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" />{" "}
                          {enc.email}
                        </span>
                        <span className="text-xs flex items-center gap-2 text-gray-400">
                          <Phone size={12} /> {enc.telefono || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant={
                          enc.estado === "Activo" ? "default" : "secondary"
                        }
                      >
                        {enc.estado || "Activo"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(enc)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600 transition-colors" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
