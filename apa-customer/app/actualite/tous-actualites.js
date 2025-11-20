import ActualiteCard from "./components/actualite";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";

export default function TousActualites({ actualites }) {
  const [displayCount, setDisplayCount] = useState();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setDisplayCount(3);
      else if (width >= 768) setDisplayCount(2);
      else setDisplayCount(1);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const visibleActualites = showMore
    ? actualites
    : Array.isArray(actualites) ? actualites.slice(0, displayCount) : [];

  if (!actualites || actualites.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-500">
          Aucune actualité disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-8 lg:px-16 xl:px-0">
      <div className="flex items-center mb-8 max-w-7xl xl:ml-20 mx-auto">
        <div className="w-2 h-10 bg-primary-300 rounded-full mr-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary-500">
          Toutes les actualités
        </h2>
      </div>

      {/* ←← SEULE LIGNE MODIFIÉE →→ */}
      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3 
        gap-8                /* espacement parfait, ni trop ni trop peu */
        md:gap-12 
        lg:gap-16 
        px-6 
        sm:px-8 
        md:px-12 
        lg:px-20 
        pb-16 
        mb-12
      ">
        {visibleActualites.map((actu) => (
          <ActualiteCard key={actu._id} actu={actu} />
        ))}
      </div>
      {/* ←← FIN →→ */}

      <div className="text-center mt-6 sm:mt-10">
  <Button
    size="lg"
    onClick={() => setShowMore(!showMore)}
    className="bg-white text-primary-300
      border border-primary-300
      hover:bg-secondary-100 hover:text-primary-300
      px-8 sm:px-12 py-4 sm:py-6
      text-lg sm:text-xl rounded-full shadow-lg
      transition-all hover:shadow-xl hover:scale-105 mb-16"
  >
    {showMore ? "Voir moins d'actualités" : "Voir plus d'actualités"}
  </Button>
</div>

    </div>
  );
}