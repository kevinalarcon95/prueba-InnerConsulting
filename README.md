# Prueba Técnica - Frontend

## Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías principales:

- **[Next.js](https://nextjs.org/):** Framework de React para el desarrollo web con renderizado del lado del servidor y generación de sitios estáticos.
- **[React](https://react.dev/):** Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript que añade tipado estático opcional para mejorar la robustez del código.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework de CSS utility-first para un diseño rápido y personalizable.
- **[React Hook Form](https://react-hook-form.com/):** Biblioteca para la gestión eficiente y flexible de formularios en React.
- **[Zod](https://zod.dev/):** Biblioteca para la declaración y validación de esquemas de datos.
- **[IndexedDB (idb)](https://github.com/jakearchibald/idb):** API de base de datos del navegador para almacenamiento local, utilizada a través de la librería `idb`.
- **[JSON Server](https://github.com/typicode/json-server):** Herramienta para crear rápidamente una API RESTful falsa basada en un archivo JSON.
- **[ESLint](https://eslint.org/):** Herramienta de análisis de código para identificar y corregir problemas en el código JavaScript y TypeScript.

## Instrucciones para Ejecutar el Proyecto

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn instalado

### Clonación del Proyecto

```bash
git clone [https://github.com/kevinalarcon95/prueba-InnerConsulting.git]
cd prueba-inner-consulting
```

### Instalación de Dependencias

```bash
npm install
```

o

```bash
yarn install
```

### Ejecutar el Backend Simulado

Se utiliza `json-server` para simular el backend.

```bash
npx json-server --watch db.json --port 3001
```

Esto levantará el backend simulado en `http://localhost:3001`.

### Ejecutar el Proyecto Frontend

```bash
npm run dev
```

o

```bash
yarn dev
```

Esto levantará el proyecto en modo desarrollo en `http://localhost:3000`.

### Deploys

- **Frontend:** [https://prueba-inner-consulting.vercel.app/](https://prueba-inner-consulting.vercel.app/)
- **Backend:** [https://prueba-innerconsulting-backend.onrender.com/](https://prueba-innerconsulting-backend.onrender.com/)

## Decisiones Técnicas

- **Next.js:** Seleccionado para aprovechar su sistema de rutas basado en archivos, optimizaciones automáticas y soporte para renderizado híbrido.
- **Tailwind CSS:** Adoptado para acelerar el diseño de interfaces responsivas de manera consistente y eficiente.
- **Context API + IndexedDB:** Se optó por esta combinación para gestionar el estado de inscripciones y garantizar persistencia local cuando no haya conectividad de red.
- **React Hook Form + Zod:** Elegidos para la construcción y validación de formularios de manera eficiente, asegurando reglas claras y mensajes de error detallados.
- **Arquitectura limpia:** Se organizó el proyecto en carpetas por responsabilidad (components, services, hooks, app router, context) para facilitar el mantenimiento y la escalabilidad.

## Mejoras Potenciales

Si se contara con más tiempo, se implementarían las siguientes mejoras:

- Implementar pruebas unitarias y de integración para formularios y servicios críticos.
- Mejorar la accesibilidad en todos los componentes de la aplicación.
- Internacionalizar la aplicación para soportar múltiples idiomas.
