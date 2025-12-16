import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2, ChevronLeft, ChevronRight, Folder } from "lucide-react"; 
import { obtenerProyectosPaginados, eliminarProyecto } from "@/services/ProyectosService";
import { CrearProyectoDialog } from "./components/CrearProyectoDialog";
//import { Badge } from "@/components/ui/badge";

export default function GestionProyectosScreen() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    cargarProyectos();
  }, [page]);

  const cargarProyectos = async () => {
    setLoading(true);
    try {
      const response = await obtenerProyectosPaginados(page, limit);
      if (response && response.data) {
          setProyectos(response.data);
          setTotalPages(response.totalPages || 1);
      } else if (Array.isArray(response)) {
          setProyectos(response);
      }
    } catch (error) {
      console.error("Error cargando proyectos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (proyecto: any) => {
    if (!confirm(`¿Eliminar el proyecto ${proyecto.titulo}?`)) return;
    try {
      await eliminarProyecto(proyecto._id || proyecto.id);
      cargarProyectos(); 
    } catch (error: any) {
      alert("Error al eliminar.");
    }
  };

  if (loading && page === 1) return <div className="p-6"><Spinner /></div>;

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6"> 
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Gestión de Proyectos</h2>
            <p className="text-muted-foreground mt-1">
              Proyectos activos y asignaciones a clientes.
            </p>
          </div>
          <CrearProyectoDialog onProyectoCreado={cargarProyectos} />
      </div>

      <div className="w-full border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto w-full"> 
          <table className="w-full min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Proyecto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Cliente Asignado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {proyectos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No hay proyectos registrados.
                  </td>
                </tr>
              ) : (
                proyectos.map((proy) => (
                  <tr key={proy._id || proy.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4 text-purple-500"/>
                            <div>
                                <p className="font-semibold">{proy.titulo}</p>
                                <p className="text-xs text-gray-400 truncate max-w-[200px]">{proy.descripcion}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded border border-purple-200">
                            {proy.tipo}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                        {/* Asumimos que el backend hace populate del cliente */}
                        {proy.cliente ? proy.cliente.nombre : "Sin Asignar"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEliminar(proy)}>
                        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
            {/* Controles de paginación iguales a clientes */}
             <span className="text-sm text-gray-500">
                Página {page} de {totalPages}
            </span>
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    <ChevronLeft className="h-4 w-4" /> Anterior
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Siguiente <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}