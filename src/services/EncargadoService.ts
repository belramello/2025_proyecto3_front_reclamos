import api from "@/utils/api";

export const obtenerEncargadosPaginados = async (
  page: number = 1,
  limit: number = 10,
  busqueda: string = ""
) => {
  try {
    const params: any = {
      page,
      limit,
      rol: "ENCARGADO_DE_ÁREA",
    };

    if (busqueda && busqueda.trim().length > 0) {
      params.busqueda = busqueda;
    }
    const response = await api.get(`/usuarios`, { params });
    console.log(response.data);
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

        populate: "area",
      },
    });

    const data = response.data.data || response.data;
    console.log("Datos recibidos del back:", data);

    return data;
  } catch (error) {
    console.error("Error obteniendo lista de encargados:", error);
    throw error;
  }
};

export const registrarEncargado = async (encargadoData: any) => {
  try {
    const response = await api.post("/usuarios", encargadoData);
    return response.data;
  } catch (error) {
    console.error("Error registrando encargado:", error);
    throw error;
  }
};

export const eliminarEncargado = async (id: string) => {
  try {
    await api.delete(`/usuarios/${id}`);
  } catch (error) {
    console.error("Error eliminando encargado:", error);
    throw error;
  }
};

export const actualizarEncargado = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/usuarios/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error actualizando encargado:", error);
    throw error;
  }
};
