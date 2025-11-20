import Link from "next/link";
import { Button } from "../components/ui/button";

export default function AlaUne({ actu }) {
  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 xl:px-0">
      <div className="flex items-center mb-8 max-w-7xl xl:ml-20 mx-auto">
        <div className="w-2 h-10 bg-primary-100 rounded-full mr-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary-500">
          A la une
        </h2>
      </div>

      {/* Carte principale */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-500">
          {/* Image */}
          <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
            <img
              src="/images/actualites/actualite1.png"
              alt={actu.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Contenu texte */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500 mb-4 leading-tight">
                {actu.title}
              </h3>

              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais.
                
              </p>

              {/* Date avec petites barres décoratives */}
              <div className="flex items-center mb-8">
                <div className="flex flex-col mr-4">
                  <div className="h-1 w-5 bg-primary-100 rounded-full mb-1" />
                  <div className="h-1 w-5 bg-primary-100 rounded-full" />
                </div>
                <span className="text-primary-300 font-medium">
                  {actu.eventDate}
                </span>
              </div>
            </div>

            {/* Bouton */}
            <Link href={`/actualite/${actu._id}`}>
  <Button
    className="
      mt-6
      rounded-full 
      px-10 py-6 
      text-lg font-semibold 
      text-white 
      bg-primary-100 
      hover:bg-primary-300 
      border-2 border-transparent 
      hover:border-primary-300
      shadow-md 
      hover:shadow-xl 
      hover:-translate-y-0.5 
      active:scale-98
      transition-all duration-300 ease-out
      flex items-center gap-3
    "
  >
    Lire la suite
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  </Button>
</Link>
          </div>
        </div>
      </div>
    </section>
  );
}