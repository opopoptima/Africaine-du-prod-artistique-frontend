"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";

export default function CategoryExplorer() {
  const initialCategories = [
    { id: 1, name: "Lecture & Histoires", image: "/images/Categories/Lecture.jpeg", href: "/Categories/Lecture" },
    { id: 2, name: "Apprentissage & Éducation", image: "/images/Categories/app.png", href: "/categories/app" },
    { id: 3, name: "Créativité & Coloriage", image: "/images/Categories/creativite.png", href: "/categories/creativite" },
    { id: 4, name: "Découverte du monde", image: "/images/Categories/Decouverte.png", href: "/categories/Decouverte" },
    { id: 5, name: "Valeurs & Développement personnel", image: "/images/Categories/valeurs.png", href: "/categories/valeurs" },
    { id: 6, name: "Pâtisserie", image: "/images/Categories/patisserie.jpg", href: "/categories/patisserie" },
    { id: 7, name: "Épicerie", image: "/images/Categories/epicerie.jpg", href: "/categories/epicerie" },
    { id: 8, name: "Boîtes cadeaux", image: "/images/Categories/cadeaux.jpg", href: "/categories/cadeaux" },
  ];

  const [displayCount, setDisplayCount] = useState(5);
  const [showMore, setShowMore] = useState(false);

  // Détecter la taille de l’écran
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) setDisplayCount(5);
      else if (width >= 768) setDisplayCount(4);
      else if (width >= 640) setDisplayCount(3);
      else setDisplayCount(2);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const visibleCategories = showMore
    ? initialCategories
    : initialCategories.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-purple-500 mb-6">
        Explorer par catégorie
      </h2>

      <div className="grid grid-cols-2 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {visibleCategories.map((cat) => (
          <Link key={cat.id} href={cat.href}>
            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-purple-300 flex items-center justify-center p-4 bg-white shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <span className="mt-1 text-center font-semibold text-[0.65rem] sm:text-xs md:text-sm lg:text-base">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!showMore && visibleCategories.length < initialCategories.length && (
      <div className="text-center mt-8 sm:mt-12">
          <Button 
            size="lg"
            onClick={() => setShowMore(true)}
          className="bg-primary-100 hover:bg-secondary-100 hover:text-primary-100 hover:border-primary-100 hover:border-2 text-secondary-100 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
            Voir plus
          </Button>
        </div>
      )}
    </div>
  );
}
