// src/utils/decodificacionauth.ts
import { jwtDecode } from 'jwt-decode';

export const getClienteIdFromToken = (): string | null => {
    const token = localStorage.getItem("accessToken"); 
    if (!token) {
        return null;
    }
    
    try {
        const decoded: any = jwtDecode(token);
        // Usa las propiedades que encontraste en la consola, manteniendo un fallback
        const clienteId = decoded.clienteId || decoded.sub || decoded.user_id || decoded.id; 

        // Mantener el log para confirmar qué valor se extrae
        console.log("DEBUG [Auth]: ID del Cliente extraído (valor):", clienteId);

        if (clienteId && typeof clienteId === 'string') {
            return clienteId;
        }
        return null;
    } catch (error) {
        console.error("DEBUG [Auth]: Error durante la decodificación del token.", error);
        return null;
    }
};