import { z } from "zod";

/**
 * * Esquema de validación para el formulario de inscripción
 * * Utiliza la biblioteca zod para definir las reglas de validación de cada campo.
 */
export const inscriptionSchema = z.object({
  name: z.string()
    .min(1, { message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener más de 3 caracteres" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" }),
  email: z.string()
    .min(1, { message: "El correo es requerido" })
    .max(50, { message: "El correo no puede tener más de 50 caracteres" })
    .email({ message: "El formato de correo es inválido" }),
  semester: z.coerce.number()
    .int({ message: "El semestre debe ser un número entero" })
    .positive({ message: "El semestre debe ser un número positivo" })
    .max(10, { message: "El semestre no puede ser mayor a 10" }),
  person: z.boolean(),
  personName: z.string().optional(),
  termsAndConditions: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
}).refine((data) => {
  if (data.person && (!data.personName || data.personName.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "El nombre del acompañante es requerido",
  path: ["personName"],
});