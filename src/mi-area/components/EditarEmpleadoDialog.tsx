import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actualizarEmpleado } from "@/services/UsuariosService";
import { obtenerSubareasDeUsuario } from "@/services/SubareaService";

interface EditarEmpleadoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empleado: any;
  onEmpleadoEditado: () => void;
}

export function EditarEmpleadoDialog({
  open,
  onOpenChange,
  empleado,
  onEmpleadoEditado,
}: EditarEmpleadoDialogProps) {
  const [loading, setLoading] = useState(false);
  const [subareas, setSubareas] = useState<any[]>([]);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    subarea: "",
  });

  // Cargar subáreas y datos del empleado al abrir
  useEffect(() => {
    if (open) {
      cargarSubareas();
      if (empleado) {
        setFormData({
          nombre: empleado.nombre || "",
          apellido: empleado.apellido || "",
          email: empleado.email || "",
          // Intentamos obtener el ID, ya sea que venga populado (objeto) o solo el ID (string)
          subarea: empleado.subarea?._id || empleado.subarea?.id || empleado.subarea || "",
        });
      }
    }
  }, [open, empleado]);

  const cargarSubareas = async () => {
    try {
      const data = await obtenerSubareasDeUsuario();
      setSubareas(data || []);
    } catch (error) {
      console.error("Error cargando subáreas", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Llamamos al servicio de actualizar
      await actualizarEmpleado(empleado._id || empleado.id, formData);
      
      alert("Empleado actualizado correctamente. Si cambió el email, se ha enviado un nuevo correo de activación.");
      onOpenChange(false); // Cerrar modal
      onEmpleadoEditado(); // Recargar la tabla padre
    } catch (error: any) {
      console.error(error);
      const mensaje = error.response?.data?.message || "No se pudo actualizar.";
      alert(`Error: ${mensaje}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
          <DialogDescription>
            Modifique los datos. Tenga en cuenta que cambiar el email requerirá re-activación de cuenta.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-nombre" className="text-right">Nombre</Label>
              <Input
                id="edit-nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-apellido" className="text-right">Apellido</Label>
              <Input
                id="edit-apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-subarea" className="text-right">Subárea</Label>
              <div className="col-span-3">
                <Select
                  value={formData.subarea}
                  onValueChange={(val) => setFormData({...formData, subarea: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione subárea" />
                  </SelectTrigger>
                  <SelectContent>
                    {subareas.map((sub) => (
                      <SelectItem key={sub._id || sub.id} value={sub._id || sub.id}>
                        {sub.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}