"use client";
import InscriptionForm from "@/components/forms/inscription-form";

/**
 * 
 * @returns {JSX.Element}
 * @description Esta es la página de inscripción que contiene el formulario de inscripción.
 */
const InscriptionPage = () => {
  return (
    <div className="grid grid-cols-12 gap-4 mx-50">
      <div className="col-span-4 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Hola Mundo</h1>
      </div>

      <div className="col-span-8 rounded-lg mt-10 p-10 shadow-md bg-white">
        <InscriptionForm />
      </div>
    </div>
  );
};

export default InscriptionPage;
