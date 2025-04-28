import { inscriptionSchema } from "./inscription-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormDataType } from "@/types";
import { useInscription } from "@/context/inscription-context";
import { useState } from "react";

/***
 * Formulario de inscripción
 * @returns {JSX.Element}
 * @description Este componente es un formulario de inscripción que permite a los usuarios registrarse proporcionando su nombre, correo electrónico, semestre y si vienen con un acompañante. También incluye la opción de aceptar los términos y condiciones.
 * El formulario utiliza la biblioteca react-hook-form para la gestión de formularios y zod para la validación de datos. Los errores de validación se muestran debajo de los campos correspondientes.
 */
const InscriptionForm = () => {
  const { sendInscription, isOffline } = useInscription();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      person: false,
      termsAndConditions: false,
    },
  });

  const watchPerson = watch("person");

  const onSubmit = async (data: FormDataType) => {
    setIsSubmitting(true);
    try {
      const date = new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const inscriptionData = {
        ...data,
        date,
      };

      await sendInscription(inscriptionData);

      if (isOffline) {
        alert(
          "Inscripción guardada localmente. Se sincronizará cuando tengas conexión a internet."
        );
      } else {
        alert("Inscripción exitosa");
      }

      reset();
    } catch (error) {
      console.error("Error al inscribirse:", error);
      alert("Error al inscribirse, por favor intenta de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:col-span-8 rounded-lg mt-5 lg:mt-10 px-8 lg:px-15 py-5 lg:p-8 shadow-md bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full my-2 space-y-6 text-gray-600"
      >
        <h1 className="text-xl lg:text-2xl font-bold mb-2 text-gray-800">Formulario de inscripción</h1>
        <p className="opacity-85 font-medium">Completa los campos obligatorios (*)</p>
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block mb-2 font-bold ">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-300/60 border-1 border-gray-500/80 rounded-lg w-full p-2"
            placeholder="Ejemplo: Juan Pérez"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 pt-2">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-bold ">
            Correo institucional
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-300/60 border-1 border-gray-500/80 rounded-lg w-full p-2"
            placeholder="Ejemplo: example@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 pt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Semestre */}
        <div>
          <label
            htmlFor="semester"
            className="block mb-2 font-bold "
          >
            Semestre
          </label>
          <input
            type="number"
            id="semester"
            className="bg-gray-300/60 border-1 border-gray-500/80 rounded-lg w-full p-2"
            placeholder="Ejemplo: 1"
            {...register("semester")}
          />
          {errors.semester && (
            <p className="text-red-600 pt-2">{errors.semester.message}</p>
          )}
        </div>

        {/* ¿Vienes con acompañante? */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="person"
            {...register("person")}
            className="w-5 h-5"
          />
          <label htmlFor="person" className="font-bold ">
            ¿Vienes con acompañante?
          </label>
        </div>
        {errors.person && (
          <p className="text-red-600 pt-2">{errors.person.message}</p>
        )}

        {/* Nombre del acompañante */}
        {watchPerson && (
          <div>
            <label
              htmlFor="personName"
              className="block mb-2 font-bold "
            >
              Nombre del acompañante
            </label>
            <input
              type="text"
              id="personName"
              className="bg-gray-300/60 border-1 border-gray-500/80 rounded-lg w-full p-2"
              placeholder="Ejemplo: María Pérez"
              {...register("personName")}
            />
            {errors.personName && (
              <p className="text-red-600 pt-2">{errors.personName.message}</p>
            )}
          </div>
        )}

        {/* Términos y condiciones */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="termsAndConditions"
            {...register("termsAndConditions")}
            className="w-5 h-5"
          />
          <label
            htmlFor="termsAndConditions"
            className="font-bold "
          >
            Aceptar términos y condiciones
          </label>
        </div>
        {errors.termsAndConditions && (
          <p className="text-red-600 pt-2">
            {errors.termsAndConditions.message}
          </p>
        )}

        {/* Estado de conexión */}
        {isOffline && (
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Modo sin conexión: </strong>
            <span className="block sm:inline">
              Tu inscripción se guardará localmente y se sincronizará cuando
              tengas conexión a internet.
            </span>
          </div>
        )}

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          {isSubmitting ? "Enviando..." : "Inscribirse"}
        </button>
      </form>
    </div>
  );
};

export default InscriptionForm;
