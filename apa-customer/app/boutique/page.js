"use client";
import { useState } from "react";
import CardBoutique from "./CardBoutique";
import SearchBar from "./SearchBar";
import SidebarFilters from "./SidebarFilters";
import Pagination from "./Pagination";
import BottomBanner from "./BottomBanner";
import HeroGeneral from "../components/HeroGeneral";

// Exemple de données pour les produits
const products = [
  {
    id: "book-1",
    title: "The Secret Garden",
    description: "Un classique intemporel pour petits et grands.",
    imageSrc: "/images/learningBanner/Image threefor LearningBanner.jpg",
  },
  {
    id: "book-2",
    title: "Les Contes de l'Afrique",
    description: "Découvrez la richesse des contes africains.",
    imageSrc: "/images/learningBanner/Imageone for two LearningBanner.jpg",
  },
  {
    id: "book-3",
    title: "Mythes d'Afrique Moderne",
    description: "Histoires modernes inspirées des mythes africains.",
    imageSrc: "/images/learningBanner/Image threefor LearningBanner.jpg",
  },
  {
    id: "book-4",
    title: "Le Jardin Secret",
    description: "Une aventure captivante pour enfants.",
    imageSrc: "/images/learningBanner/Imageone for two LearningBanner.jpg",
  },
];

export default function Home() {
  const [filters, setFilters] = useState({
    type: "all",
    language: "all",
    level: "all",
  });

  const handleApplyFilters = (newFilters) => setFilters(newFilters);
  const handleResetFilters = () =>
    setFilters({ type: "all", language: "all", level: "all" });

  return (
    <>
      <HeroGeneral title="Boutique" />

      <div className="flex min-h-screen">
        
        {/* Sidebar (mobile drawer + desktop sticky handled internally) */}
        <SidebarFilters
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {/* Search + mobile filter button placement already handled internally */}
          <SearchBar
            placeholder="Rechercher un article..."
            buttonText="Nouveauté"
          />

          {/* Content */}
          <div className="space-y-10 mt-6">
            {/** Affiche les cartes en 2 par 2 **/}
            {Array.from({ length: Math.ceil(products.length / 2) }).map((_, rowIndex) => (
              <div className="flex gap-6" key={rowIndex}>
                {products
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((product) => (
                    <CardBoutique
                      key={product.id}
                      id={product.id} 
                      title={product.title}
                      description={product.description}
                      imageSrc={product.imageSrc}
                    />
                  ))}
              </div>
            ))}

            <Pagination />
          </div>
        </main>
      </div>

      <BottomBanner />
    </>
  );
}
