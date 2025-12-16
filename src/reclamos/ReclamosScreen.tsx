import { Label } from "@/components/ui/label";
import Cloudinary from "@/components/cloudinary";
import React, { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { SelectTipoReclamoDropdown } from "@/components/select-tipoReclamo-dropdown";
import { SelectPrioridadDropdown } from "@/components/select-prioridad";
import { SelectCriticidadDropdown } from "@/components/select-nivelCritcidad-dropdown";
import { SelectProyectosDropdown } from "@/components/select-proyecto-dropdown";
import { getClienteIdFromToken } from "@/utils/decodificacionauth";
import { crearReclamo } from "@/services/ReclamosService";
import { Link, useNavigate } from "react-router-dom"; // Asumiendo que usas react-router
import { ArrowLeft, Send } from "lucide-react";

function ReclamosScreen() {
  const [loading, setLoading] = useState(false);
  const [clienteId, setClienteId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = getClienteIdFromToken();
    if (id) setClienteId(id);
  }, []);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    tipoReclamo: "",
    prioridad: "" as "" | "Alta" | "Media" | "Baja",
    criticidad: "" as number | "",
    proyectoId: "",
    imagenes: [] as string[],
  });

  const handleProyectoChange = (value: string) => {
    setForm((prev) => ({ ...prev, proyectoId: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.prioridad === "" || form.criticidad === "") {
      alert("Por favor, selecciona una Prioridad y un Nivel de Criticidad.");
      return;
    }

    setLoading(true);
    try {
      const reclamo = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        tipoReclamo: form.tipoReclamo,
        prioridad: form.prioridad,
        nivelCriticidad: Number(form.criticidad),
        proyecto: form.proyectoId,
        imagenUrl: form.imagenes,
      };

      await crearReclamo(reclamo);
      alert("Reclamo creado correctamente");
      navigate("/mis-reclamos"); // Redirigir después de crear
    } catch (error) {
      alert("Error al crear el reclamo");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Botón Volver Estilo Cartel */}
      <div className="w-full max-w-4xl mb-4">
        <Link 
          to="/mis-reclamos" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-black hover:border-black transition-all shadow-sm"
        >
          <ArrowLeft size={14} />
          Volver 
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8"
      >
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Nuevo Reclamo</h2>
        </div>

        <div className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="titulo" className="text-sm font-bold uppercase text-gray-700">Título del Reclamo</Label>
            <input
              id="titulo"
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all placeholder:text-gray-400"
              placeholder="Ej: Problemas con el acceso al servidor"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold uppercase text-gray-700">Tipo de reclamo</Label>
            <SelectTipoReclamoDropdown
              value={form.tipoReclamo}
              onValueChange={(value) => setForm({ ...form, tipoReclamo: value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold uppercase text-gray-700">Proyecto</Label>
              <SelectProyectosDropdown
                clienteId={clienteId}
                value={form.proyectoId}
                onValueChange={handleProyectoChange}
                disabled={!clienteId}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold uppercase text-gray-700">Prioridad</Label>
              <SelectPrioridadDropdown
                value={form.prioridad}
                onValueChange={(p) => setForm({ ...form, prioridad: p })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold uppercase text-gray-700">Criticidad</Label>
              <SelectCriticidadDropdown
                value={form.criticidad}
                onValueChange={(c) => setForm({ ...form, criticidad: c })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-sm font-bold uppercase text-gray-700">Descripción detallada</Label>
            <textarea
              id="descripcion"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition h-32 resize-none"
              placeholder="Describe lo sucedido con el mayor detalle posible..."
            ></textarea>
          </div>

          <div className="space-y-2 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
            <Label className="text-sm font-bold uppercase text-gray-700 block mb-2 text-center">Evidencia fotográfica</Label>
            <div className="flex justify-center">
              <Cloudinary
                onImagesUploaded={(urls: string[]) =>
                  setForm((prev) => ({ ...prev, imagenes: urls }))
                }
              />
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 italic">Formatos permitidos: JPG, PNG. Máximo 5MB.</p>
          </div>

          {/* 6. Botón Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-gray-400"
          >
            {loading ? <Spinner /> : (
              <>
                <Send size={18} />
                Registrar Reclamo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReclamosScreen;