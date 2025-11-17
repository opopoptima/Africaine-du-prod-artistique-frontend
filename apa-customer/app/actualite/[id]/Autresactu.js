import ActualiteCard from "../components/actualite";

  export default function AutresActu({ actu1, actu2 }) {
  return (
    <section className="px-4 py-8 md:px-16 max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
      <h1 className="text-3xl md:text-5xl text-primary-500 font-bold mb-8">
        Autres actualités
      </h1>

      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-8 w-full">
        {actu1 && (
          <div className="w-full sm:w-1/2">
            <ActualiteCard key={actu1.id} actu={actu1} />
          </div>
        )}
        {actu2 && (
          <div className="w-full sm:w-1/2 hidden sm:block">
            <ActualiteCard key={actu2.id} actu={actu2} />
          </div>
        )}
      </div>
    </section>
  );
}
