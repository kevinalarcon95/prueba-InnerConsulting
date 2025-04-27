import { inscriptionSchema } from "./inscription-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IFormData } from "@/types";
import { sendInscription } from "@/services/inscription.service";

/***
 * Formulario de inscripción
 * @returns {JSX.Element}
 * @description Este componente es un formulario de inscripción que permite a los usuarios registrarse proporcionando su nombre, correo electrónico, semestre y si vienen con un acompañante. También incluye la opción de aceptar los términos y condiciones.
 * El formulario utiliza la biblioteca react-hook-form para la gestión de formularios y zod para la validación de datos. Los errores de validación se muestran debajo de los campos correspondientes.
 */
const InscriptionForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      person: false,
      termsAndConditions: false,
    },
  });

  const watchPerson = watch("person");

  const onSubmit = async (data: IFormData) => {
    const response = await sendInscription(data);
    console.log("Respuesta del servidor:", response);
    if (response) {
      alert("Inscripción exitosa");
    } else {
      alert("Error al inscribirse, por favor intenta de nuevo más tarde.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-10 my-5 space-y-7">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block mb-2 font-bold text-gray-800">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-200 rounded-lg w-full p-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 pt-2">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-bold text-gray-800">
            Correo institucional
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-200 rounded-lg w-full p-2"
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
            className="block mb-2 font-bold text-gray-800"
          >
            Semestre
          </label>
          <input
            type="number"
            id="semester"
            className="bg-gray-200 rounded-lg w-full p-2"
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
          <label htmlFor="person" className="font-bold text-gray-800">
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
              className="block mb-2 font-bold text-gray-800"
            >
              Nombre del acompañante
            </label>
            <input
              type="text"
              id="personName"
              className="bg-gray-200 rounded-lg w-full p-2"
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
            className="font-bold text-gray-800"
          >
            Aceptar términos y condiciones
          </label>
        </div>
        {errors.termsAndConditions && (
          <p className="text-red-600 pt-2">
            {errors.termsAndConditions.message}
          </p>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Inscribirse
        </button>
      </form>
    </>
  );
};

export default InscriptionForm;
