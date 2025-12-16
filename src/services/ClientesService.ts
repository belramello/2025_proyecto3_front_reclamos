import api from "@/utils/api";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const obtenerClientesPaginados = async (
  page: number = 1,
  limit: number = 10,
  busqueda: string = ""
) => {
  try {
    // Definimos los parámetros base
    const params: any = {
      page,
      limit,
      rol: "CLIENTE",
    };

    // VALIDACIÓN ESTRICTA:
    // Solo agregamos la propiedad 'busqueda' si la variable existe Y no está vacía.
    if (busqueda && busqueda.trim().length > 0) {
      params.busqueda = busqueda;
    }

    // Nota: No enviamos &busqueda= si está vacío.
    const response = await api.get<PaginatedResponse<any>>(`/usuarios`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    throw error;
  }
};

export const obtenerTodosLosClientes = async () => {
  try {
    const response = await api.get(`/usuarios`, {
      params: {
        rol: "CLIENTE",
        limit: 100,
      },
    });
    // Manejo robusto de la respuesta
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error obteniendo lista de clientes para select:", error);
    throw error;
  }
};

export const registrarCliente = async (clienteData: any) => {
  const response = await api.post("/usuarios/registrar-cliente", clienteData);
  return response.data;
};

export const eliminarCliente = async (id: string) => {
  await api.delete(`/usuarios/${id}`);
};

export const actualizarCliente = async (id: string, data: any) => {
  await api.patch(`/usuarios/${id}`, data);
};
