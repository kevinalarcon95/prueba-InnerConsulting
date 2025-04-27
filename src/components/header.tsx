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
    <header className="bg-white shadow-md w-[80%] flex justify-between items-center px-5 py-4 mx-auto rounded-lg">
      <div>
        <span className="text-[18px] font-bold font-sans text-gray-700">
          inner
        </span>
        <span className="text-[18px] font-bold font-sans text-[#FF8000]">
          Consulting
        </span>
      </div>
      <nav className="flex-1">
        <ul className="flex justify-center items-center gap-10 text-gray-700 font-medium">
          <li
            className={`hover:font-bold hover:text-orange-500 ${
              pathname === "/inscripcion"
                ? "text-[#FF8000] font-semibold  border-b-3"
                : ""
            }`}
          >
            <Link href="/inscripcion">Inscripción</Link>
          </li>
          <li
            className={`hover:font-bold hover:text-orange-500 ${
              pathname === "/consulta"
                ? "text-[#FF8000] font-semibold  border-b-3"
                : ""
            }`}
          >
            <Link href="/consulta">Consulta</Link>
          </li>
          <li
            className={`hover:font-bold hover:text-orange-500 ${
              pathname === "/" ? "text-[#FF8000] font-semibold  border-b-3" : ""
            }`}
          >
            <Link href="/">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
