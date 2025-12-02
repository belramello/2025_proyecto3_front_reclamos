import React, { useState, useCallback } from "react";
import "./FeedbackPage.css";


const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  // Simulación de función de envío
  const handleSubmit = useCallback(() => {
    console.log("Enviando feedback:", { rating, comment });
    // Aquí iría la lógica para enviar los datos a un backend
    alert(`Feedback enviado: Calificación ${rating}, Comentario: ${comment}`);
  }, [rating, comment]);

  return (
    <div className="feedback-container">
    
      {/* --- Contenido Principal de Feedback --- */}
      <div className="feedback-content">
        <h1 className="title">Hola, Usuario 👋</h1>
        <h2 className="subtitle">¿Cómo te pareció el servicio?</h2>

        <div className="rating-card">
          <div className="avatar">M</div>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star selected" : "star"}
                onClick={() => setRating(star)}
              >
                &#9733; {/* Icono de estrella Unicode */}
              </span>
            ))}
          </div>
        </div>

        <label htmlFor="comment-box" className="comment-label">
          Comentarios adicionales (Opcional)
        </label>
        <textarea
          id="comment-box"
          className="comment-box"
          placeholder="Escribe tu comentario aquí..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="send-button"
          onClick={handleSubmit}
          disabled={rating === 0} // Deshabilitar si no hay calificación
        >
          Enviar Feedback
        </button>
      </div>

      {/* --- Tarjeta de Reclamo Lateral (Derecha) --- */}
      <div className="right-card">
        <h3>Tu Último Reclamo Activo</h3>
        <div className="claim-card">
          <div className="claim-avatar">A</div>
          <div>
            <p className="claim-title">Mi Reclamo N°1</p>
            <p className="claim-project">Proyecto X</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;