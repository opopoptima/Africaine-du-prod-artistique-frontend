"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";


export default function CategoryExplorer() {
  const initialCategories = [
    { id: 1, name: "Lecture & Histoires", image: "/Categories/Lecture.jpeg", href: "/Categories/Lecture" },
   { id: 2, name: "Apprentissage & Éducation", image: "/categories/app.png", href: "/categories/app" },
    { id: 3, name: "Créativité & Coloriage", image: "/categories/creativite.png", href: "/categories/creativite" },
    { id: 4, name: "Découverte du monde", image: "/categories/Decouverte.png", href: "/categories/Decouverte" },
    { id: 5, name: "Valeurs & Développement personnel", image: "/categories/valeurs.png", href: "/categories/valeurs" },
    { id: 6, name: "Pâtisserie", image: "/categories/patisserie.jpg", href: "/categories/patisserie" },
    { id: 7, name: "Épicerie", image: "/categories/epicerie.jpg", href: "/categories/epicerie" },
    { id: 8, name: "Boîtes cadeaux", image: "/categories/cadeaux.jpg", href: "/categories/cadeaux" },
  ];

  const [displayCount, setDisplayCount] = useState(5); // nombre à afficher selon écran
  const [showMore, setShowMore] = useState(false);

  // Détecter la taille de l’écran
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) setDisplayCount(5);   // lg
      else if (width >= 768) setDisplayCount(4); // md
      else if (width >= 640) setDisplayCount(3); // sm
      else setDisplayCount(2); // xs
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Catégories visibles selon showMore
  const visibleCategories = showMore
    ? initialCategories
    : initialCategories.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6"
        style={{ color: 'var(--color-primary-300)' }}
      >
        Explorer par catégorie
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {visibleCategories.map(cat => (
          <Link key={cat.id} href={cat.href}>
            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform mt-5 sm:mt-7 md:mt-10 lg:mt-12">
              <div
                className="w-26 h-26 sm:w-34 sm:h-34 md:w-40 md:h-40 lg:w-46 lg:h-46 rounded-full overflow-hidden border 
                p-8 sm:p-9 md:p-10 flex items-center justify-center"
                style={{ borderColor: 'var(--color-primary-300)' }}
              >
                 <Image
              src={cat.image}
              alt={cat.name}
              width={150}
              height={100}
              priority={true}
            />  
              </div>
              <span className="mt-[0.5rem] text-center font-bold text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!showMore && visibleCategories.length < initialCategories.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => setShowMore(true)}
            variant="default"
            size="lg"
            className="w-40 sm:w-48 md:w-56 lg:w-64 text-center rounded-full"
            style={{ backgroundColor: "var(--color-secondary-500)", color: "white" }}
          >
            Voir plus
          </Button>
        </div>
      )}
    </div>
  );
}

