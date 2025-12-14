import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { registrarEmpleado, registrarUsuario } from "@/services/UsuariosService";
import { obtenerAreas } from "@/services/AreaService";
import { obtenerRoles } from "@/services/RolesService";
import { obtenerTodasLasSubareas } from "@/services/SubareaService";

export default function RegistroUsuarioPage() {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    email: "",
    contraseña: "",
    rol: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    area: "",
    subarea: "",
  });

  const [roles, setRoles] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [subareas, setSubareas] = useState<any[]>([]);

  const [loadingSubareas, setLoadingSubareas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const [rolesRes, areasRes] = await Promise.all([
        obtenerRoles(),
        obtenerAreas(),
      ]);
        setRoles(rolesRes ?? []);
        setAreas(areasRes ?? []);
        setSubareas([]); 
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    } finally {
      setLoadingInitial(false);
    }
  };

  const cargarSubareasPorArea = async (areaId: string) => {
    if (!areaId) {
      setSubareas([]);
      return;
    }
    setLoadingSubareas(true);
    try {
      const subareasRes = await obtenerTodasLasSubareas(areaId);
      setSubareas(subareasRes ?? []);
    } catch (error) {
      console.error("Error cargando subáreas por área:", error);
      setSubareas([]); 
    } finally {
      setLoadingSubareas(false);
    }
  };
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "area") {
      cargarSubareasPorArea(value);
      setFormData((prev) => ({ ...prev, subarea: "" })); 
    }
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);

  try {
    const payload = {
      ...formData,
      contraseña: formData.contraseña || undefined,
      area: formData.area || undefined,
      subarea: formData.subarea || undefined,
    };

    if (formData.rol === "CLIENTE") {
      await registrarUsuario(payload);
    } else {
      await registrarEmpleado(payload);
    }

    setMessage("Usuario registrado correctamente.");

    setFormData({
      nombreUsuario: "",
      email: "",
      contraseña: "",
      rol: "",
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      area: "",
      subarea: "",
    });
    setSubareas([]);
  } catch (error: any) {
    setMessage(error.response?.data?.message || "Error al registrar usuario.");
  } finally {
    setLoading(false);
  }
};


  if (loadingInitial) return <Spinner />;

  return (
    // Estilos de diseño solicitados (sin fondo gris, más ancho, separado de navbar)
    <div className="p-8"> 
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
        
        <h2 className="text-3xl font-semibold text-center mb-1 text-gray-800">
          Registrar Usuario
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Completá la información para agregar un nuevo usuario.
        </p>

        {message && (
          <div className="text-center mb-4 text-sm text-gray-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FILA: nombreUsuario / email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre de usuario" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          {/* Contraseña */}
          <Input
            label="Contraseña (opcional)"
            name="contraseña"
            type="password"
            placeholder="Se puede dejar vacío para invitación"
            value={formData.contraseña}
            onChange={handleChange}
          />

          {/* FILA: nombre / apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
            <Input label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
          </div>

          {/* Dirección y Teléfono */}
          <Input label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
          <Input label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />

          {/* FILA: rol / área / subárea */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ROL: Usar el nombre como valor (valueKey="nombre") */}
            <Select 
              label="Rol" 
              name="rol" 
              value={formData.rol} 
              onChange={handleChange} 
              required 
              options={roles} 
              valueKey="nombre" 
            />

            {/* ÁREA: Usar el id como valor (valueKey="id") */}
            <Select 
              label="Área" 
              name="area" 
              value={formData.area} 
              onChange={handleChange} 
              options={areas} 
              valueKey="id" 
            />

            {/* SUBÁREA: Usar el id como valor (valueKey="id") */}
            <Select 
              label="Subárea" 
              name="subarea" 
              value={formData.subarea} 
              onChange={handleChange} 
              options={subareas} 
              disabled={loadingSubareas || !formData.area} 
              placeholder={loadingSubareas ? "Cargando..." : "Seleccionar..."}
              valueKey="id"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-black text-white font-medium rounded-xl 
                        hover:bg-gray-900 active:scale-[0.98] transition 
                        disabled:bg-gray-400"
          >
            {loading ? "Cargando..." : "Registrar Usuario"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* ------------------------- */
/* COMPONENTES REUTILIZABLES */
/* ------------------------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                    focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
    </div>
  );
}

// Componente Select configurable
function Select({ 
    label, 
    name, 
    value, 
    onChange, 
    options = [], 
    required, 
    disabled = false, 
    placeholder = "Seleccionar...",
    valueKey = 'id' // Por defecto usamos 'id'
}: any) {
  
  const keyField = valueKey === 'nombre' ? 'nombre' : valueKey; 
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                    bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition 
                    disabled:bg-gray-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option> 
        {options.map((o: any, index: number) => (
          <option 
            key={o[keyField] || index} 
            value={o[valueKey]} 
          >
            {o.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}