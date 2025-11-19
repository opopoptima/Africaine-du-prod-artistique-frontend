"use client";
import Link from 'next/link';

// Les chemins d'accès aux images restent les mêmes
const ARTICLE_ICON_SRC = "/images/vector-check.png"; 


export default function BottomBanner() {
  return (
    <section className="relative w-full bg-primary-300 py-8 px-4 overflow-hidden flex justify-center items-center min-h-[180px]">

      <img
        src="/images/deco.png"
        alt="decoration"
        className="hidden md:block absolute top-2 left-0 w-24 md:w-28 opacity-75 transform rotate-[10deg]" 
      />
      <img
        src="/images/deco.png"
        alt="decoration"
        className="hidden md:block absolute bottom-2 right-0 w-24 md:w-28 opacity-75 transform rotate-[-160deg]" 
      />

      {/* --- Contenu Principal : Les Cartes --- */}
      <div className="relative z-10 mx-auto w-full flex flex-col md:flex-row justify-center items-center gap-5">
        
        <Link 
            href="/articles"
            className="flex items-center justify-center p-5 bg-white/72 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 w-70 md:max-w-md"
            >
            {/* Conteneur Icône */}
            <div className="flex-shrink-0 mr-4 h-14 w-16">
                <img 
                src="/images/vector-check.png"
                alt="Icône Articles" 
                />
            </div>
            {/* Conteneur Texte */}
            <div className="flex flex-col text-left">
                <span className="text-xl text-secondary-900">Voir Nos <br/> Article </span>
            </div>
        </Link>



        <Link 
          href="/evenements" 
          // Fond clair, coin arrondi, ombre, effet de survol
          className="flex items-center justify-center p-5 bg-white/72 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 w-70 md:max-w-md"

        >
          <div className="flex-shrink-0 mr-4 w-16 h-14">
            <img 
              src="/images/vector-calendar.png"
              alt="Icône Évènements" 
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl text-secondary-900">Découvrez Nos <br/> Évènements</span>
          </div>
        </Link>
        
      </div>
    </section>
  );
}