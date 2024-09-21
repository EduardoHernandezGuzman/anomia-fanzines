import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="h-[800px] bg-gray-100 py-24 mt-20">
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase mb-4 text-black">
            <div className="w-16 h-[5px] bg-orange-500 mr-4"></div>Anomia Fanzines
          </div>
          <h1 className="w-full text-[70px] leading-[1.1] font-light mb-4 uppercase text-black">
            La Caída de los Viejos Paradigmas:
            <br />
            <span className="font-semibold relative inline-block text-black">
              Exploraciones para Mentes Críticas y Liberadas
              <div className="absolute bottom-[-10px] left-0 w-full h-[5px] bg-orange-500"></div>
            </span>
          </h1>
          <Link
            to={"/products"}
            className="self-end uppercase font-semibold border-b-2 border-primary text-black hover:bg-orange-500 hover:text-white mt-12"
          >
            Sumérgete en el Caos
          </Link>
        </div>  
      </div>
    </section>
  );
};
