import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2, Edit, UserPlus, AlertTriangle } from "lucide-react"; 
import { obtenerEmpleados, eliminarEmpleado } from "@/services/UsuariosService";
import { EditarEmpleadoDialog } from "./components/EditarEmpleadoDialog";
import { CrearEmpleadoDialog } from "./components/CrearEmpleadoDialog";

export default function GestionEmpleadosScreen() {
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [empleadoAEditar, setEmpleadoAEditar] = useState<any>(null);
  const [dialogEditarOpen, setDialogEditarOpen] = useState(false);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    setLoading(true);
    try {
      const data = await obtenerEmpleados("encargado");
      setEmpleados(data || []);
    } catch (error) {
      console.error("Error cargando empleados", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (empleado: any) => {
    if (empleado.cantidadReclamos > 0) {
        // Este alert es un doble seguro, aunque el botón ya no debería aparecer
        alert("No se puede eliminar: El empleado tiene reclamos asociados.");
        return;
    }
    if (!confirm(`¿Estás seguro de que deseas eliminar a ${empleado.nombre}?`)) {
      return;
    }
    try {
      await eliminarEmpleado(empleado._id || empleado.id);
      alert("Empleado eliminado correctamente.");
      cargarEmpleados(); 
    } catch (error: any) {
      const mensaje = error.response?.data?.message || "Ocurrió un error al eliminar.";
      alert(`No se pudo eliminar: ${mensaje}`);
    }
  };

  const handleEditar = (empleado: any) => {
    setEmpleadoAEditar(empleado);
    setDialogEditarOpen(true);
  };

  const renderSubarea = (emp: any) => {
    if (emp.subarea && emp.subarea.nombre) return emp.subarea.nombre;
    return "Sin Asignar"; 
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6"> 
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Gestión de Empleados</h2>
            <p className="text-muted-foreground mt-1">
              Listado completo de personal a cargo.
            </p>
          </div>
          <CrearEmpleadoDialog onEmpleadoCreado={cargarEmpleados} />
      </div>

      <div className="w-full border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full"> 
          <table className="w-full min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 min-w-[200px]">Empleado</th>
                <th className="px-6 py-4 min-w-[200px]">Email</th>
                <th className="px-6 py-4 text-center min-w-[120px]">Subárea</th>
                <th className="px-6 py-4 text-center min-w-[100px]">Estado</th> {/* Cambié "Reclamos" por "Estado" para ser más claro */}
                
                {/* --- AQUÍ ESTÁ LA DIVISIÓN DE COLUMNAS QUE PEDISTE --- */}
                <th className="px-6 py-4 text-center w-[80px]">Editar</th>
                <th className="px-6 py-4 text-center w-[100px]">Eliminar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {empleados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <UserPlus className="h-10 w-10 text-gray-300" />
                      <p>No hay empleados registrados en tu área.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                empleados.map((emp) => (
                  <tr key={emp._id || emp.id} className="hover:bg-gray-50 transition-colors">
                    
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {emp.nombre} {emp.apellido || ""}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {emp.email}
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        emp.subarea && emp.subarea.nombre 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                          {renderSubarea(emp)}
                      </span>
                    </td>
                    
                    {/* COLUMNA DE ESTADO / RECLAMOS */}
                    <td className="px-6 py-4 text-center">
                      {(emp.cantidadReclamos || 0) > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                           <AlertTriangle className="h-3 w-3" />
                           Con Reclamos
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                           Disponible
                        </span>
                      )}
                    </td>
                    
                    {/* COLUMNA 1: EDITAR (Siempre visible) */}
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleEditar(emp)} title="Editar datos">
                        <Edit className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                      </Button>
                    </td>

                    {/* COLUMNA 2: ELIMINAR (Condicional) */}
                    <td className="px-6 py-4 text-center">
                      {(emp.cantidadReclamos || 0) > 0 ? (
                         // SI TIENE RECLAMOS: Mostramos mensaje/bloqueo
                         <div className="flex justify-center" title="No se puede eliminar: Tiene reclamos asignados">
                            <span className="text-[10px] leading-tight text-red-500 font-semibold text-center block max-w-[80px]">
                                No se puede eliminar
                            </span>
                         </div>
                      ) : (
                        // SI ESTÁ LIBRE: Mostramos el botón
                        <Button variant="ghost" size="icon" onClick={() => handleEliminar(emp)} title="Eliminar empleado">
                          <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-600" />
                        </Button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {empleadoAEditar && (
        <EditarEmpleadoDialog 
            open={dialogEditarOpen}
            onOpenChange={setDialogEditarOpen}
            empleado={empleadoAEditar}
            onEmpleadoEditado={cargarEmpleados}
        />
      )}
    </div>
  );
}