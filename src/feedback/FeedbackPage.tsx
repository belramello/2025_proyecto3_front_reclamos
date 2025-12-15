import React, { useState, useCallback, useEffect } from "react";

import FeedbackConfirmationDialog from "./components/FeedbackConfirmationDialog";
import { obtenerReclamo } from "@/services/ReclamosService";
import { feedback } from "@/services/Feedback";
import type { ReclamoFeedbackDto } from "./interfaces/reclamo-feedback.dto";
import type { Feedback } from "./interfaces/feedback-interface";


const FeedbackPage: React.FC = () => {

  const RECLAMO_ID_MOCK = "693b1c1feb1b8c9808894232"; 

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  
  const [reclamoData, setReclamoData] = useState<ReclamoFeedbackDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false); // Estado para el envío
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // --- LÓGICA DE CARGA DE DATOS DEL RECLAMO ---
  useEffect(() => {
    const fetchReclamo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await obtenerReclamo(RECLAMO_ID_MOCK);
        
        // Mapeo de la respuesta detallada al DTO simplificado
        const mappedData: ReclamoFeedbackDto = {
          _id: data._id,
          nroTicket: data.nroTicket,
          titulo: data.titulo,
          proyecto: {
            titulo: data.proyecto.titulo,
            cliente: {
              nombre: data.proyecto.cliente.nombre,
            },
          },
          prioridad: data.prioridad,
          nivelCriticidad: data.nivelCriticidad,
        };

        setReclamoData(mappedData);
      } catch (e) {
        setError("No se pudo cargar la información del reclamo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReclamo();
  }, [RECLAMO_ID_MOCK]);


  // --- LÓGICA DE ENVÍO DE FEEDBACK (USANDO EL MÉTODO REAL) ---
  const handleSubmit = useCallback(async () => {
    if (rating === 0 || !reclamoData) return;

    setIsSending(true);
    setError(null);

    const feedbackDataToSend: Feedback = {
        reclamo: reclamoData._id,
        valoracion: rating,
        comentario: comment,
        // Añade aquí otros campos necesarios según tu interface Feedback
    };

    try {
        // 1. Llamada a tu API real
        await feedback(feedbackDataToSend);
        console.log("Feedback enviado:", feedbackDataToSend);
        
        // 2. Mostrar el diálogo de confirmación si es exitoso
        setIsDialogOpen(true);

       
        setRating(0);
        setComment("");

    } catch (e) {
        // Manejo de errores de la API
        setError("Ocurrió un error al enviar el feedback. Intente nuevamente.");
        console.error("Error al enviar el feedback:", e);
    } finally {
        setIsSending(false);
    }

  }, [rating, comment, reclamoData]);

  // Manejo de estados de carga y error
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Cargando datos del reclamo...</p>
      </div>
    );
  }

  if (error && !isSending) { // Muestra el error si no está intentando enviar
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-white rounded-xl shadow-lg">
           <p className="text-xl font-medium text-red-600 mb-4">Error</p>
           <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!reclamoData) {
     return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">No se encontraron datos de reclamo.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex p-6 justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">¿Cómo te pareció el servicio?</h1>
        
        {/* --- Sección en fila: rating + reclamo (DINÁMICO) --- */}
        <div className="flex gap-6 mb-8">
          {/* Rating Card */}
          <div className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow-sm w-fit">
            <div className="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center font-bold text-white text-xl">
              M
            </div>

            <div className="flex gap-3 text-3xl cursor-pointer select-none">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "text-yellow-400 hover:scale-110 transition"
                      : "text-gray-300 hover:text-yellow-300 hover:scale-110 transition"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Right Card (Reclamo Activo) */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Tu Reclamo: <span className="text-blue-600">{reclamoData.nroTicket}</span>
            </h3>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="w-11 h-11 bg-indigo-300 rounded-full flex items-center justify-center text-white font-bold">
                {reclamoData.nroTicket.substring(0, 1)}
              </div>

              <div>
                <p className="font-semibold text-gray-800">{reclamoData.titulo}</p>
                <p className="text-sm text-gray-500">
                    {reclamoData.proyecto.titulo} (Cliente: {reclamoData.proyecto.cliente.nombre})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comentarios */}
        <label className="font-medium text-gray-700">
          Comentarios adicionales (Opcional)
        </label>

        <textarea
          className="w-full h-28 border border-gray-300 rounded-xl p-3 mt-2
                     resize-none focus:ring-2 focus:ring-blue-400 outline-none transition"
          placeholder="Escribe tu comentario aquí..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Botón negro */}
        <button
          disabled={rating === 0 || isSending}
          onClick={handleSubmit}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl 
                     font-medium hover:bg-gray-900 
                     active:scale-[0.98] transition 
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {isSending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            "Enviar Feedback"
          )}
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </div>

      {/* Diálogo de Confirmación */}
      <FeedbackConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        rating={rating}
        comment={comment}
      />
    </div>
  );
};

export default FeedbackPage;