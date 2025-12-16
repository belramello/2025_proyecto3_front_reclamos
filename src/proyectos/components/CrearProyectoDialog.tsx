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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderPlus } from "lucide-react";
import { registrarProyecto } from "@/services/ProyectosService";
import { obtenerTodosLosClientes } from "@/services/ClientesService";

interface Props {
    onProyectoCreado: () => void;
}

// --- ARRAY DE OPCIONES DE CATEGORÍA (Mapeo Front-Backend ENUM) ---
// El value DEBE coincidir con los valores ENUM del Backend (TipoProyectoEnum)
const tipoProyectoOpciones = [
    { label: "Sistema de Gestión Interna", value: "SISTEMA_GESTION_INTERNA" },
    { label: "Sistema de Atención al Cliente", value: "SISTEMA_ATENCION_CLIENTE" },
    { label: "Sistema de Recursos Humanos", value: "SISTEMA_RECURSOS_HUMANOS" },
    { label: "Plataforma Web Transaccional", value: "PLATAFORMA_WEB_TRANSACCIONAL" },
    { label: "Aplicación Móvil Autogestión", value: "APLICACION_MOVIL_AUTOGESTION" },
    { label: "Sistema de Análisis y Reportes", value: "SISTEMA_ANALISIS_REPORTES" },
    { label: "Sistema de Integración/Automatización", value: "SISTEMA_INTEGRACION_AUTOMATIZACION" },
    { label: "Modernización Tecnológica", value: "MODERNIZACION_TECNOLOGICA" },
    { label: "Sistema de Gestión Documental", value: "SISTEMA_GESTION_DOCUMENTAL" },
    { label: "Sistema de Control de Procesos", value: "SISTEMA_CONTROL_PROCESOS" },
    { label: "Sistema de Logística y Operaciones", value: "SISTEMA_LOGISTICA_OPERACIONES" },
    { label: "Sistema Comercial y Ventas", value: "SISTEMA_COMERCIAL_VENTAS" },
    { label: "Sistema de Finanzas y Contabilidad", value: "SISTEMA_FINANZAS_CONTABILIDAD" },
    { label: "Plataforma de Capacitación", value: "PLATAFORMA_CAPACITACION" },
    { label: "Portal Clientes/Proveedores", value: "PORTAL_CLIENTES_PROVEEDORES" }
];


export function CrearProyectoDialog({ onProyectoCreado }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
    clienteId: "",
    fechaInicio: new Date().toISOString().split('T')[0], 
  });
  
  useEffect(() => {
    if (open) {
        cargarClientes();
        setErrorMsg(null); 
        // Resetear la fecha a hoy (formato yyyy-mm-dd)
        setFormData(prev => ({ 
            ...prev, 
            fechaInicio: new Date().toISOString().split('T')[0]
        }));
    }
  }, [open]);

  const cargarClientes = async () => {
    try {
        const data = await obtenerTodosLosClientes();
        // Aseguramos que la data sea un array, si no, devolvemos vacío
        setClientes(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
        console.error("Error cargando clientes", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTipoSelect = (val: string) => {
    setFormData({...formData, tipo: val});
  }

  const handleClienteSelect = (val: string) => {
    setFormData({...formData, clienteId: val});
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Validación mínima en el Front
    if (!formData.titulo || !formData.descripcion || !formData.tipo || !formData.clienteId || !formData.fechaInicio) {
        setErrorMsg("Todos los campos son obligatorios.");
        setLoading(false);
        return;
    }

    try {
      // Enviamos el objeto con el ID del cliente y la fecha ISO
      await registrarProyecto({
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        tipo: formData.tipo, 
        cliente: formData.clienteId, 
        // Convertimos la fecha YYYY-MM-DD a formato ISO 8601 (requerido por el DTO del Backend)
        fechaInicio: new Date(formData.fechaInicio).toISOString()
      });

      alert("¡Proyecto registrado exitosamente!");
      setOpen(false); 
      setFormData({ titulo: "", descripcion: "", tipo: "", clienteId: "", fechaInicio: new Date().toISOString().split('T')[0] });
      onProyectoCreado();
    } catch (error: any) {
      console.error("Error detallado al crear proyecto:", error.response?.data || error.message);
      
      const backendError = error.response?.data?.message || 'Error desconocido del servidor.';
      
      if (Array.isArray(backendError)) {
          // Intentamos mostrar el primer error de validación
          setErrorMsg(backendError[0] || "Error de validación en uno de los campos.");
      } else {
          setErrorMsg(backendError);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
            <FolderPlus size={16}/> Nuevo Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Proyecto</DialogTitle>
          <DialogDescription>
            Asocie un nuevo proyecto a un cliente existente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            
            {/* Mensaje de Error (si existe) */}
            {errorMsg && (
              <div className="col-span-4 text-red-600 border border-red-300 p-2 rounded">
                **Error de validación:** {errorMsg}
              </div>
            )}
            
            {/* Título */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">Título</Label>
              <Input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Descripción */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">Desc.</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Fecha de Inicio */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fechaInicio" className="text-right">Fec. Inicio</Label>
                <Input
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    className="col-span-3"
                    required
                />
            </div>


            {/* Categorización (Tipo) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo" className="text-right">Categoría</Label>
              <div className="col-span-3">
                <Select 
                    onValueChange={handleTipoSelect}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {tipoProyectoOpciones.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>

            {/* Selección de Cliente - CORREGIDO EL FILTRO */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cliente" className="text-right">Cliente</Label>
              <div className="col-span-3">
                <Select 
                    onValueChange={handleClienteSelect}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione Cliente Dueño" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Error 1: Si no hay clientes o están cargando, mostramos un placeholder no vacío */}
                        {clientes.length === 0 && <SelectItem key="loading" value="loading" disabled>Cargando clientes...</SelectItem>}
                        {clientes
                            // Error 2: Filtramos clientes que no tengan un ID válido (para evitar el error Uncaught Error: value prop that is not an empty string)
                            .filter(cli => cli._id || cli.id)
                            .map((cli) => (
                            <SelectItem 
                                key={cli._id || cli.id} 
                                value={cli._id || cli.id} // <-- Usamos el ID de Mongo
                            >
                                {cli.nombre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}