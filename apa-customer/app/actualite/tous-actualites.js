import { Section } from "lucide-react"
import ActualiteCard from "./components/actualite";
import { useState, useEffect, act } from "react";
import { Button } from "../components/ui/button";

 
const actualites = [
  {
    id: 1,
    titre: "Evenement A",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
  {
    id: 2,
    titre: "Evenement B",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
  {
    id: 3,
    titre: "Evenement C",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
  {
    id: 4,
    titre: "Evenement A",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
  {
    id:5,
    titre: "Evenement B",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
  {
    id: 6,
    titre: "Evenement C",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
];

export default function TousActualites() {
  const [displayCount, setDisplayCount] = useState(5);
      const [showMore, setShowMore] = useState(false);
    
      // Détecter la taille de l’écran
      useEffect(() => {
        const updateCount = () => {
          const width = window.innerWidth;
          if (width >= 768) setDisplayCount(3);
          else if (width >= 640) setDisplayCount(2);
          else setDisplayCount(1);
        };
    
        updateCount();
        window.addEventListener("resize", updateCount);
        return () => window.removeEventListener("resize", updateCount);
      }, []);
  
       const visibleCategories = showMore
      ? actualites
      : actualites.slice(0, displayCount);
  
  return (
      <div>
      <div className="flex items-center mb-6">
        
        {/* Barre verticale */}
        <div className="w-1.5 h-8 bg-purple-500 mr-3 rounded ml-5 md:ml-10 lg:ml-17"></div>
        <h2 className="text-3xl font-bold text-primary-500">Toutes les actualités</h2>
      </div>
        <div className="grid grid-cols-1 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-16 mb-16">
      {visibleCategories.map((actu) => (
        <ActualiteCard key={actu.id} actu={actu} />
      ))}
    </div>
    
    {!showMore && displayCount < actualites.length && (
      <div className="text-center mt-8 sm:mt-12">
        <Button 
          size="lg"
          onClick={() => setShowMore(true)}
          className="bg-white text-primary-300 
           border border-primary-300 
           hover:bg-secondary-100 hover:text-primary-300 
           px-8 sm:px-12 py-4 sm:py-6 
           text-lg sm:text-xl rounded-full shadow-lg 
           transition-all hover:shadow-xl hover:scale-105 mb-16"

        >
          Voir plus d'actualités
        </Button>
      </div>
    )}
    
    </div>
    
  );
}