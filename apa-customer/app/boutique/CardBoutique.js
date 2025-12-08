"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { IoEyeOutline, IoCartOutline } from "react-icons/io5";

export default function CardBoutique({ article }) {
  const router = useRouter();

  const handleVoirPlus = () => {
  if (!article) return;
  router.push(`/boutique/${article.id}`);
};
const handleCommander = () => {
  if (!article) return;

  // Encode values to safely pass in URL
  const cover = encodeURIComponent(article.cover || "");
  const livreID = encodeURIComponent(article.id || "");

  router.push(`/commande?cover=${cover}&livreID=${livreID}`);
};


  // Fallbacks if article is undefined
  const coverSrc = article?.cover || article?.images?.[0] || "/images/placeholder.jpg";
  const title = article?.title || "Sans titre";
  const description = article?.description || "";

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

          <p className="text-xs sm:text-sm text-secondary-700 leading-relaxed">
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
              className="flex-1 bg-primary-300 rounded-full text-white hover:bg-primary-500 text-sm md:text-base px-3 py-1"
              onClick={handleCommander}

            >
              <IoCartOutline className="w-4 h-4 mr-1" />
              Commander
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
