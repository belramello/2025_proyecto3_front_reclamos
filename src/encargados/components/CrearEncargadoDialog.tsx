import { useState } from "react";
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
import { UserPlus } from "lucide-react";
import { SelectAreaDropdown } from "@/components/select-area-dropdown";
import { registrarEncargado } from "@/services/UsuariosService";

interface Props {
  onEncargadoCreado: () => void;
}

export function CrearEncargadoDialog({ onEncargadoCreado }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado local para manejar el formulario
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    email: "",
    area: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAreaChange = (value: string) => {
    setFormData({ ...formData, area: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.area) {
      alert("Por favor, seleccione un área.");
      return;
    }

    setLoading(true);

    try {
      /**
       * MAPEO SEGÚN CreateUsuarioDto:
       * El backend requiere 'nombreUsuario' y 'email' como obligatorios.
       * También espera 'nombre' y 'area' (como string).
       */
      const payload = {
        nombreUsuario: formData.nombreUsuario, // Campo obligatorio en DTO
        nombre: formData.nombreUsuario,        // Requerido por TS / Opcional en DTO
        email: formData.email,                 // Campo obligatorio en DTO
        area: formData.area,                   // Enviado como string (ID)
        telefono: formData.telefono,           // Campo opcional
        rol: "ENCARGADO_DE_ÁREA",              // Rol fijo para esta gestión
      };

      await registrarEncargado(payload);

      alert("¡Encargado registrado con éxito!");
      setOpen(false);

      // Limpiar formulario
      setFormData({
        nombreUsuario: "",
        email: "",
        area: "",
        telefono: "",
      });

      onEncargadoCreado();
    } catch (error: any) {
      console.error("Error en registro:", error);
      const errorMsg = error.response?.data?.message;
      // NestJS devuelve errores de validación a veces como arrays
      const mensaje = Array.isArray(errorMsg) ? errorMsg.join("\n") : errorMsg || "Error al crear encargado.";
      alert(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <UserPlus size={16} /> Nuevo Encargado
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Encargado</DialogTitle>
          <DialogDescription>
            Complete los datos. Se usará el nombre como nombre de usuario.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            
            {/* Nombre Completo / Usuario */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombreUsuario" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombreUsuario"
                name="nombreUsuario"
                placeholder="Ej: Juan Pérez"
                value={formData.nombreUsuario}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@empresa.com"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Selector de Área */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">
                Área
              </Label>
              <div className="col-span-3">
                <SelectAreaDropdown
                  value={formData.area}
                  onValueChange={handleAreaChange}
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                name="telefono"
                placeholder="+54 ..."
                value={formData.telefono}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}