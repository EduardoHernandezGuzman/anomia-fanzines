import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="flex items-center gap-3 font-medium text-primary">
      <Link
        className={`${
          pathname === "/" && "text-orange-500"
        } hover:text-orange-500 transition`}
        to={"/"}
      >
        Inicio
      </Link>
      <Link
        className={`${
          pathname === "/about" && "text-orange-500"
        } hover:text-orange-500 transition`}
        to={"/about"}
      >
        Editorial
      </Link>
      <Link
        className={`${
          pathname === "/products" && "text-orange-500"
        } hover:text-orange-500 transition`}
        to={"/products"}
      >
        Tienda
      </Link>
      <Link
        className={`${
          pathname === "/contact" && "text-orange-500"
        } hover:text-orange-500 transition`}
        to={"/contact"}
      >
        Contacto
      </Link>
    </nav>
  );
};
