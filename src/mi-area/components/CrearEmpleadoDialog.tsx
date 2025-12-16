import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { registrarEmpleado } from "@/services/UsuariosService";
import { obtenerSubareasDeUsuario } from "@/services/SubareaService";

export function CrearEmpleadoDialog({ onEmpleadoCreado }: { onEmpleadoCreado?: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subareas, setSubareas] = useState<any[]>([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    subarea: "", 
  });

  useEffect(() => {
    if (open) {
      cargarSubareas();
    }
  }, [open]);

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
      // --- CORRECCIÓN AQUÍ ---
      // El backend exige 'nombreUsuario'. Usamos el email como nombre de usuario.
      // También aseguramos el rol 'EMPLEADO'.
      const payload = {
        ...formData,
        nombreUsuario: formData.email, 
        rol: "EMPLEADO"
      };

      await registrarEmpleado(payload as any);

      alert("¡Empleado creado con éxito! Se ha enviado el correo de activación.");
      setOpen(false); 
      setFormData({ nombre: "", apellido: "", email: "", subarea: "" });
      if (onEmpleadoCreado) onEmpleadoCreado();
    } catch (error: any) {
      console.error(error);
      // Mejoramos el mensaje de error para que sea más legible
      const mensaje = error.response?.data?.message;
      alert("Error al crear empleado: " + (Array.isArray(mensaje) ? mensaje.join(", ") : mensaje || "Intente nuevamente"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Crear Empleado</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Empleado</DialogTitle>
          <DialogDescription>
            Complete los datos. Se enviará un correo para configurar su contraseña.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellido" className="text-right">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subarea" className="text-right">Subárea</Label>
              <div className="col-span-3">
                <Select 
                  onValueChange={(value) => setFormData({...formData, subarea: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una subárea" />
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
              {loading ? "Guardando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}