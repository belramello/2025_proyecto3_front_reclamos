import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Phone,
} from "lucide-react";
import {
  obtenerClientesPaginados,
  eliminarCliente,
} from "@/services/ClientesService";
import { CrearClienteDialog } from "./components/CrearClienteDialog";

export default function GestionClientesScreen() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    cargarClientes();
  }, [page]);

  const cargarClientes = async () => {
    setLoading(true);
    try {
      const response = await obtenerClientesPaginados(page, limit);
      if (response && response.data) {
        setClientes(response.data);
        setTotalPages(response.totalPages || 1);
      } else if (Array.isArray(response)) {
        setClientes(response);
      }
    } catch (error) {
      console.error("Error cargando clientes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (cliente: any) => {
    if (!confirm(`¿Eliminar al cliente ${cliente.nombre}?`)) return;
    try {
      await eliminarCliente(cliente._id || cliente.id);
      cargarClientes();
    } catch (error: any) {
      alert("No se pudo eliminar. Verifique que no tenga proyectos activos.");
    }
  };

  if (loading && page === 1)
    return (
      <div className="p-6">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Gestión de Clientes
          </h2>
          <p className="text-muted-foreground mt-1">
            Administra las empresas y clientes del sistema.
          </p>
        </div>
        <CrearClienteDialog onClienteCreado={cargarClientes} />
      </div>

      <div className="w-full border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No hay clientes registrados.
                  </td>
                </tr>
              ) : (
                clientes.map((cli) => (
                  <tr key={cli._id || cli.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-semibold">{cli.nombre}</p>
                          <p className="text-xs text-gray-400">
                            {cli.direccion || "Sin dirección"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex flex-col">
                        <span>{cli.email}</span>
                        <span className="text-xs flex items-center gap-1 mt-1 text-gray-400">
                          <Phone size={10} /> {cli.telefono || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`badge ${
                          cli.estado === "Activo" ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {cli.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(cli)}
                      >
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
          <span className="text-sm text-gray-500">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
