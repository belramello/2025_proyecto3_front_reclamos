import React, { useState, useCallback, useEffect } from "react";

import FeedbackConfirmationDialog from "./components/FeedbackConfirmationDialog";
import { obtenerReclamosDelUsuario } from "@/services/ReclamosService";
import { feedback } from "@/services/Feedback";

import type { ReclamosDelClienteDto } from "@/services/ReclamosService";
import type { Feedback as FeedbackPayload } from "./interfaces/feedback-interface";

const FeedbackPage: React.FC = () => {
  const [reclamos, setReclamos] = useState<ReclamosDelClienteDto[]>([]);
  const [reclamoSeleccionado, setReclamoSeleccionado] =
    useState<ReclamosDelClienteDto | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // -------------------------
  // CARGA DE RECLAMOS
  // -------------------------
  useEffect(() => {
    const fetchReclamos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await obtenerReclamosDelUsuario();
        setReclamos(data);

        if (data.length > 0) {
          setReclamoSeleccionado(data[0]);
        }
      } catch (e) {
        setError("No se pudieron cargar tus reclamos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReclamos();
  }, []);

  // -------------------------
  // VALIDACIÓN: ESTADO RESUELTO
  // -------------------------
  const estadoActual =
    reclamoSeleccionado?.historialEstado.at(-1)?.estado.nombre;
  const puedeEnviarFeedback = estadoActual === "Resuelto";

  // -------------------------
  // ENVÍO DE FEEDBACK
  // -------------------------
  const handleSubmit = useCallback(async () => {
    if (!reclamoSeleccionado || rating === 0 || !puedeEnviarFeedback) return;

    setIsSending(true);
    setError(null);

    const payload: FeedbackPayload = {
      reclamo: reclamoSeleccionado._id,
      valoracion: rating,
      comentario: comment,
    };

    try {
      await feedback(payload);
      setIsDialogOpen(true);
      setRating(0);
      setComment("");
    } catch (e) {
      setError("Ocurrió un error al enviar el feedback.");
      console.error("Error al enviar el feedback:", e);
    } finally {
      setIsSending(false);
    }
  }, [rating, comment, reclamoSeleccionado, puedeEnviarFeedback]);

  // -------------------------
  // ESTADOS DE CARGA / ERROR
  // -------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Cargando tus reclamos...</p>
      </div>
    );
  }

  if (error && !isSending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <p className="text-xl font-medium text-red-600 mb-4">Error</p>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Tu feedback nos importa</h1>

        {/* ---------------- CARDS DE RECLAMOS ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {reclamos.map((reclamo) => {
            const seleccionado =
              reclamo.nroTicket === reclamoSeleccionado?.nroTicket;
            const estado = reclamo.historialEstado.at(-1)?.estado.nombre;

            return (
              <div
                key={reclamo.nroTicket}
                onClick={() => {
                  setReclamoSeleccionado(reclamo);
                  setRating(0);
                  setComment("");
                }}
                className={`
                  cursor-pointer rounded-2xl border p-4 transition
                  ${
                    seleccionado
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:shadow"
                  }
                `}
              >
                <p className="font-semibold text-gray-800">{reclamo.titulo}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Ticket: {reclamo.nroTicket}
                </p>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">
                    {reclamo.proyecto.titulo}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full font-medium
                      ${
                        estado === "Resuelto"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {estado}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------------- DETALLE DEL RECLAMO ---------------- */}
        {reclamoSeleccionado && (
          <div className="mb-8 bg-gray-50 p-6 rounded-2xl border">
            <h2 className="text-lg font-semibold mb-2">Reclamo seleccionado</h2>

            <p className="font-medium">{reclamoSeleccionado.titulo}</p>
            <p className="text-sm text-gray-500 mb-2">
              {reclamoSeleccionado.proyecto.titulo}
            </p>

            <p className="text-sm text-gray-400">
              Prioridad: {reclamoSeleccionado.prioridad} · Criticidad:{" "}
              {reclamoSeleccionado.nivelCriticidad}
            </p>
          </div>
        )}

        {/* ---------------- RATING ---------------- */}
        <div className="flex items-center gap-3 text-4xl mb-6 select-none">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => puedeEnviarFeedback && setRating(star)}
              className={`
                transition cursor-pointer
                ${star <= rating ? "text-yellow-400" : "text-gray-300"}
                ${!puedeEnviarFeedback && "cursor-not-allowed opacity-50"}
              `}
            >
              ★
            </span>
          ))}
        </div>

        {!puedeEnviarFeedback && (
          <p className="text-sm text-yellow-600 mb-4">
            Solo podés enviar feedback cuando el reclamo esté <b>Resuelto</b>.
          </p>
        )}

        {/* ---------------- COMENTARIO ---------------- */}
        <textarea
          className="w-full h-28 border border-gray-300 rounded-xl p-3 resize-none"
          placeholder="Comentario adicional (opcional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!puedeEnviarFeedback}
        />

        {/* ---------------- BOTÓN ---------------- */}
        <button
          disabled={rating === 0 || isSending || !puedeEnviarFeedback}
          onClick={handleSubmit}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSending ? "Enviando..." : "Enviar feedback"}
        </button>

        {/* ---------------- DIALOG ---------------- */}
        <FeedbackConfirmationDialog
          isOpen={isDialogOpen}
          rating={rating}
          comment={comment}
        />
      </div>
    </div>
  );
};

export default FeedbackPage;
