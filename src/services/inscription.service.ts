import { env } from "@/config/env";
import { FormDataType } from "@/types";

const API_URL = env.apiBaseUrl;

export const sendInscription = async (data: FormDataType) => {
  try {
    const response = await fetch( `${API_URL}/inscripciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    return response.json();
  } catch (error) {
    console.error("Error al enviar la inscripción:", error);
    throw new Error("Error al enviar la inscripción");
  }
};

export const getInscriptions = async () => {
  try {
    const response = await fetch(`${API_URL}/inscripciones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error al obtener las inscripciones:", error);
    throw new Error("Error al obtener las inscripciones");
  }
}