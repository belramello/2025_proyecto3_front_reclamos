import api from "@/utils/api";

// Obtener listado con paginación
export const obtenerProyectosPaginados = async (page: number = 1, limit: number = 10, busqueda: string = "") => {
  try {
    const params: any = { page, limit };

    // CORRECCIÓN: Solo enviamos 'busqueda' si no está vacío
    if (busqueda && busqueda.trim() !== "") {
        params.busqueda = busqueda;
    }

    const response = await api.get(`/proyectos`, { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw error;
  }
};

// Crear nuevo proyecto
export const registrarProyecto = async (proyectoData: any) => {
  const response = await api.post("/proyectos", proyectoData);
  return response.data;
};

// Eliminar proyecto
export const eliminarProyecto = async (id: string) => {
  try {
    await api.delete(`/proyectos/${id}`);
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    throw error;
  }
};