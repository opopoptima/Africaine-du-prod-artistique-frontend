"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { IoEyeOutline, IoCartOutline } from "react-icons/io5";

export default function CardBoutique({ article }) {
  const router = useRouter();
  console.log("Article dans CardBoutique :", article);

  const handleVoirPlus = () => {
  if (!article) return;
  router.push(`/boutique/${article.id}`);
};
const handleCommander = () => {
  if (!article) return;

  // Encode values to safely pass in URL
  const cover = encodeURIComponent(article.cover || "");
  const isbn = encodeURIComponent(article.isbn || "");
  const prixUnitaire = encodeURIComponent(article.price || 0);

  router.push(`/commande?cover=${cover}&isbn=${isbn}&quantity=1&prixUnitaire=${prixUnitaire}`);
};


  // Fallbacks if article is undefined
  const coverSrc = article?.cover || article?.images?.[0] || "/images/placeholder.jpg";
  const title = article?.title || "Sans titre";
  const description = article?.description || "";
  const stock = article?.stock ?? 0;
  const isOutOfStock = stock <= 0;


  if (!article) {
    // Optional: render a placeholder card if article is undefined
    return (
      <div className="bg-white rounded-xl shadow-md w-full max-w-xl mx-auto p-4 text-center text-gray-500">
        Article non disponible
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 p-4 md:p-5">
        <div className="relative h-48 w-full sm:w-36 md:w-40 rounded-lg overflow-hidden">
        {article?.isBestSeller && (
        <span className="absolute -left-10 top-4 z-10 w-40 -rotate-45 bg-primary-300 py-1 text-center text-xs font-semibold text-white shadow-md">
            Best Seller
          </span>
        )}
        {isOutOfStock && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-white text-sm font-bold uppercase tracking-wide">
          Rupture de stock
        </span>
      )}


        <Image
          src={coverSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 180px"
        />
        </div>


        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-500 leading-snug">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-secondary-700 leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="flex flex-row gap-2 mt-auto flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-2 rounded-full border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white text-sm md:text-base"
              onClick={handleVoirPlus}
            >
              <IoEyeOutline className="w-4 h-4 mr-1" />
              Voir plus
            </Button>

            <Button
              size="sm"
              disabled={isOutOfStock}
              className={`flex-1 rounded-full text-sm md:text-base px-3 py-1
                ${
                  isOutOfStock
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary-300 text-white hover:bg-primary-500"
                }
              `}
              onClick={!isOutOfStock ? handleCommander : undefined}
            >
              <IoCartOutline className="w-4 h-4 mr-1" />
              {isOutOfStock ? "Indisponible" : "Commander"}
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
