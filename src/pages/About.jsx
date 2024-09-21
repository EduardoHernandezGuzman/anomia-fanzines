
export const About = () => {
  return (
    <section className="text-justify max-w-[1100px] mx-auto mt-[120px] sm:mt-10 py-12 px-5">
      <div className="flex flex-col justify-center gap-3">
        <h2 className="text-3xl mb-3 font-bold text-primary uppercase mt-20">
          ¿Que es un fanzine?
        </h2>
        <div className="flex items-center justify-center gap-5">
          <p className="text-primary">
            Un fanzine, mi querido buscador, es mucho más que una simple
            colección de páginas; es el grimorio moderno para aquellos que
            desean trascender los límites de lo común, un portal para las mentes
            que se niegan a doblegarse ante los dogmas del mundo material.
            Creado por alquimistas del espíritu, este arte impreso desafía las
            normas y convoca a aquellos dispuestos a romper las cadenas
            invisibles que atan la conciencia.
            <br />
            En sus páginas, la tinta se convierte en fuego sagrado, revelando
            verdades que solo los iniciados en el caos pueden comprender. Si has
            llegado hasta aquí, es porque el destino te ha llamado a sumergirte
            en este océano de ideas, donde la libertad no es una palabra vacía,
            sino el verdadero sendero hacia la iluminación.
          </p>
         
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 my-10">
        <div>
          <h3 className="text-3xl mb-3 font-bold text-primary uppercase">
            ¿Quienes somos?
          </h3>
          <p className="text-primary">
            Fundada en octubre de 2022 en la enigmática Isla de San Borondón,
            esta editorial emergió como un faro de creatividad. En un susurro
            del destino, lanzó su primer fanzine al mes siguiente y desde
            entonces ha producido mensualmente, desafiando convenciones y
            explorando los abismos de la imaginación. 
            <br />
            Cada fanzine es un conjuro
            que invita al lector a un viaje singular, donde lo inesperado se
            convierte en una puerta hacia nuevas realidades y la libertad
            creativa es nuestra brújula.
          </p>
        </div>
      </div>
    </section>
  );
};
