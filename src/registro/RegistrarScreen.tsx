import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { registrarUsuario } from "@/services/UsuariosService";
import { obtenerAreas } from "@/services/AreaService";
import { obtenerRoles } from "@/services/RolesService";
import { obtenerSubareasDeUsuario } from "@/services/SubareaService";

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

  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const [rolesRes, areasRes, subareasRes] = await Promise.all([
        obtenerRoles(),
        obtenerAreas(),
        obtenerSubareasDeUsuario(),
      ]);
        setRoles(rolesRes ?? []);
        setAreas(areasRes ?? []);
        setSubareas(subareasRes ?? []);

    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    } finally {
      setLoadingInitial(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await registrarUsuario({
        ...formData,
        contraseña: formData.contraseña || undefined,
        area: formData.area || undefined,
        subarea: formData.subarea || undefined,
      });

      setMessage("Usuario registrado correctamente.");

      // Reset form
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
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
        
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
            <Select label="Rol" name="rol" value={formData.rol} onChange={handleChange} required options={roles} />

            <Select label="Área" name="area" value={formData.area} onChange={handleChange} options={areas} />

            <Select label="Subárea" name="subarea" value={formData.subarea} onChange={handleChange} options={subareas} />
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

function Select({ label, name, value, onChange, options = [], required }: any) {
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
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                   bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      >
        <option value="">Seleccionar...</option>
        {options.map((o: any) => (
          <option key={o._id} value={o._id}>
            {o.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
