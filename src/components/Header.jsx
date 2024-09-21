import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Logo from "../img/icon.png";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="flex items-center gap-4">
            <img className="w-[40px]" src={Logo} alt="Logo" />
            <h2 className="uppercase text-xl font-bold">anomia fanzines</h2>
          </div>
        </Link>
        <div className="flex gap-10">
          <div className="absolute right-0 left-0 bg-white w-full h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};
