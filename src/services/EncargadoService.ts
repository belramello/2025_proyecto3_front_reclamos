import api from "@/utils/api";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number; 
}



export const obtenerEncargadosPaginados = async (page: number = 1, limit: number = 10, busqueda: string = "") => {
  try {
    const params: any = {
        page,
        limit,
        rol: "ENCARGADO_DE_ÁREA"
    };

    if (busqueda && busqueda.trim().length > 0) {
        params.busqueda = busqueda;
    }

    // Quitamos el populate porque el servidor no lo soporta y tira error 400
    const response = await api.get(`/usuarios`, { params });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const obtenerTodosLosEncargados = async () => {
  try {
    const response = await api.get(`/usuarios`, { 
        params: { 
            rol: "ENCARGADO_DE_ÁREA", 
            limit: 100,
          
            populate: "area" 
        } 
    });
    

    const data = response.data.data || response.data;
    console.log("Datos recibidos del back:", data);
    
    return data; 
  } catch (error) {
    console.error("Error obteniendo lista de encargados:", error);
    throw error;
  }
};

/**
 * Registra un nuevo encargado en el sistema
 */
export const registrarEncargado = async (encargadoData: any) => {
  try {
    const response = await api.post("/usuarios", encargadoData);
    return response.data;
  } catch (error) {
    console.error("Error registrando encargado:", error);
    throw error;
  }
};

/**
 * Elimina un encargado por su ID
 */
export const eliminarEncargado = async (id: string) => {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error("Error eliminando encargado:", error);
      throw error;
    }
};

/**
 * Actualiza los datos de un encargado existente
 */
export const actualizarEncargado = async (id: string, data: any) => {
    try {
      const response = await api.patch(`/usuarios/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error actualizando encargado:", error);
      throw error;
    }
};