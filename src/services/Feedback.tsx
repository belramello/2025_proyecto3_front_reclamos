import type { Feedback } from "../feedback/interfaces/feedback-interface";
import type { RespuestaFeedback } from "../feedback/interfaces/feedback-response";
import api from "../utils/api";

export const feedback= async (
    feedbackData: Feedback
): Promise<RespuestaFeedback> => {
  try {
    const response = await api.post<RespuestaFeedback>(`/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error al hacer feedback:", error);
    throw error;
  }
};