"use client";
import InscriptionForm from "@/components/forms/inscription-form";
import Image from "next/image";
import backgroundImg from "@/assets/background.webp";

/**
 *
 * @returns {JSX.Element}
 * @description Esta es la página de inscripción que contiene el formulario de inscripción.
 */
const InscriptionPage = () => {
  return (
    <div className="flex gap-10 mx-8 lg:mx-40 lg:items-stretch"> {/* Añadido lg:items-stretch */}
      {/* Imagen escritorio con overlay */}
      <div className="hidden lg:flex lg:items-center lg:justify-center relative lg:mt-10 w-[600px]"> 
        <div className="relative h-full w-full">
          <Image
            src={backgroundImg}
            alt="Imagen de fondo"
            className="rounded-lg shadow-lg opacity-90 h-full w-full object-cover"
            width={600}
            priority
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-amber-800/10 to-amber-800/20"></div>
        </div>
      </div>

      {/* Formulario de inscripción */}
      <InscriptionForm />
    </div>
  );
};

export default InscriptionPage;
