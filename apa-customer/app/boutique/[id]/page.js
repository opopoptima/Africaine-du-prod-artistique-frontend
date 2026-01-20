'use client';
import ContactSection from '../../components/ContactSection';
import CardDetail from './CardDetails';
import QuantityOrder from './QuantityOrder';
import Image from "next/image";
import CardBoutique from '../CardBoutique';
import BookGallery from './BookGalery';
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleService } from '../../services/articleService';
export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!params.id) return;
      console.log("Fetching article with ID:", params.id);
      const data = await ArticleService.getById(params.id);
      console.log(data.data.article);
      setArticle(data.data.article);
    }
    fetchArticle();
  }, [params.id]);

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
  ];

  if (!article) {
    return <p className="text-center py-20 text-primary-500">Article non disponible...</p>;
  }
    const handleCommander = (quantity) => {
  if (!article) return;

  // Encode values safely
  const cover = encodeURIComponent(article.cover || "");
  const isbn = encodeURIComponent(article.isbn || "");
  const qty = encodeURIComponent(quantity);
  const prixUnitaire = encodeURIComponent(article.price || 0);

  router.push(`/commande?cover=${cover}&isbn=${isbn}&quantity=${qty}&prixUnitaire=${prixUnitaire}`);
};

  return (
    
    <>
      <section className="relative h-auto overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/heroSection/heroSectionImageBackground.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 z-1 bg-linear-to-r from-white/70 via-white/0 to-primary-300/50" />
        <div className="relative z-10 container w-full">
          <CardDetail article={article} />

          <div className="flex flex-col sm:flex-row gap-6 px-4 sm:px-6 md:px-10">
            {/* Book Gallery */}
            <div className="flex justify-center sm:justify-start w-auto overflow-x-auto flex-1">
              <BookGallery
                images={article.images || [article.cover]}
                title={article.title}
              />
            </div>

            {/* Quantity Order Box */}
            <div className="flex justify-center sm:justify-end shrink-0">
              <QuantityOrder handleCommander={handleCommander} article={article} />
            </div>
          </div>
        </div>
      </section>

      {/* Similar articles */}
      <div className="space-y-10 my-8">
        <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-primary-500 leading-snug text-center">
          Articles similaires
        </h2>
        {Array.from({ length: Math.ceil(products.length / 2) }).map((_, rowIndex) => (
          <div className="flex gap-6" key={rowIndex}>
            {products.slice(rowIndex * 2, rowIndex * 2 + 2).map((product) => (
              <CardBoutique
                key={product.id}
                article={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  cover: product.imageSrc,
                  images: [product.imageSrc],
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Other language */}
      <div className="space-y-10 my-8">
        <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-primary-500 leading-snug text-center">
          Disponible dans une autre langue
        </h2>
        {Array.from({ length: Math.ceil(products.length / 2) }).map((_, rowIndex) => (
          <div className="flex gap-6" key={rowIndex}>
            {products.slice(rowIndex * 2, rowIndex * 2 + 2).map((product) => (
              <CardBoutique
                key={product.id}
                article={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  cover: product.imageSrc,
                  images: [product.imageSrc],
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <ContactSection />
    </>
  );
}
