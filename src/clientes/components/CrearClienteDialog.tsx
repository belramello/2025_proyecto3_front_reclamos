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
import { registrarCliente } from "@/services/ClientesService"; // Asegúrate de tener este servicio creado
import { UserPlus } from "lucide-react";

interface Props {
    onClienteCreado: () => void;
}

export function CrearClienteDialog({ onClienteCreado }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado con TODOS los campos requeridos por la US
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        nombre: formData.nombreCompleto, 
        email: formData.email,
        direccion: formData.direccion, // Campo de la US
        telefono: formData.telefono,   // Campo de la US
        nombreUsuario: formData.email, 
        rol: "CLIENTE",
      };

      await registrarCliente(payload);

      alert("¡Cliente registrado! Se ha enviado el correo de activación.");
      setOpen(false); 
      // Reseteamos el formulario
      setFormData({ nombreCompleto: "", email: "", direccion: "", telefono: "" });
      onClienteCreado();
    } catch (error: any) {
      console.error(error);
      const mensaje = error.response?.data?.message || "Error al crear cliente.";
      alert(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
            <UserPlus size={16}/> Registrar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
          <DialogDescription>
            Complete los datos. Se enviará un correo para configurar su acceso.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            
            {/* Nombre */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombreCompleto" className="text-right">Nombre</Label>
              <Input
                id="nombreCompleto"
                name="nombreCompleto"
                placeholder="Nombre o Razón Social"
                value={formData.nombreCompleto}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Email */}
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

            {/* Dirección */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                placeholder="Calle, Número, Ciudad"
                value={formData.direccion}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                placeholder="+54 9 ..."
                value={formData.telefono}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
