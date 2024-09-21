import { Hero } from "../components";

export const Home = () => {
  return (
    <>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto flex flex-col items-center">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary">
              <strong>Anomia</strong> es un concepto utilizado en sociología y psicología
              que describe una condición o estado de desorden y confusión
              social o personal, generalmente causado por la ruptura de normas
              y valores establecidos. El término fue popularizado por el sociólogo
              francés 
              <br />
              <em>Émile Durkheim</em>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
