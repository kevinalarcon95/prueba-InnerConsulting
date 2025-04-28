import React from "react";
import profilePicture from "@/assets/profilePicture.jpeg";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="flex flex-col gap-10 my-10 px-8 mx-8 lg:mx-40 py-10 bg-white shadow-md rounded-lg">
      <Image
        src={profilePicture}
        alt="Kevin Fernando Alarcón Camayo"
        className="rounded-full w-32 h-32 mx-auto"
      />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Kevin Alarcón
        </h2>
        <p className="text-center">Popayán, Colombia</p>
        <p className="text-center">
          <a
            href="mailto:kfalarcon07@gmail.com"
            className="text-blue-600 hover:underline"
          >
            kfalarcon07@gmail.com
          </a>
        </p>
        <div className="flex flex-row gap-4 justify-evenly items-center lg:justify-center">
          <p>
            <a
              href="https://linkedin.com/in/kevinalarcón"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </p>
          <p>+57 3137100671</p>
        </div>
      </section>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold mb-4">Sobre mí</h2>
        <p className="text-gray-700">
          <strong>Desarrollador Web especializado en Frontend</strong> y
          tecnologías Fullstack. Actualmente lidero proyectos de modernización
          digital para la Universidad del Cauca. Apasionado por la construcción
          de interfaces escalables y de alto impacto.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tecnologías</h2>
        <p className="text-gray-700">
          Angular, React, Spring Boot, Laravel, Git, Scrum, WebSockets.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Acerca de este proyecto</h2>
        <p className="text-gray-700">
          Este proyecto fue desarrollado con <strong>Next.js y React</strong>.
          Se utilizó <strong>Tailwind CSS</strong> para el diseño responsivo,
          TypeScript para asegurar el tipado estático, y
          <strong> React Hook Form </strong> junto con <strong>Zod</strong> para
          la validación de formularios. La persistencia local se maneja mediante{" "}
          <strong>IndexedDB</strong> utilizando la librería idb, mientras que
          JSON Server proporciona un backend.
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
