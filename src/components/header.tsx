"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 *
 * @returns {JSX.Element}
 * @description Este es el componente de encabezado que contiene el logotipo y la navegación del sitio web.
 */
const Header = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400/80 h-28 lg:min-h-[15vh] flex justify-center items-center">
      <header className="bg-white shadow-md w-100 mx-8 md:w-[95%] lg:w-[80%] flex flex-col lg:flex-row gap-2 justify-between items-center px-4 py-2 lg:py-4 rounded-lg">
        <div>
          <span className="text-[18px] font-bold font-sans text-gray-700">
            inner
          </span>
          <span className="text-[18px] font-bold font-sans text-[#FF8000]">
            Consulting
          </span>
        </div>
        <nav className="flex-1">
          <ul className="flex justify-center items-center gap-10 text-gray-700">
            <li
              className={`hover:font-bolder hover:text-orange-500 ${
                pathname === "/inscripcion"
                  ? "text-[#FF8000] font-medium  border-b-3"
                  : ""
              }`}
            >
              <Link href="/inscripcion">Inscripción</Link>
            </li>
            <li
              className={`hover:font-bolder hover:text-orange-500 ${
                pathname === "/consulta"
                  ? "text-[#FF8000] font-medium  border-b-3"
                  : ""
              }`}
            >
              <Link href="/consulta">Consulta</Link>
            </li>
            <li
              className={`hover:font-bolder hover:text-orange-500 ${
                pathname === "/"
                  ? "text-[#FF8000] font-medium  border-b-3"
                  : ""
              }`}
            >
              <Link href="/">Contacto</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
