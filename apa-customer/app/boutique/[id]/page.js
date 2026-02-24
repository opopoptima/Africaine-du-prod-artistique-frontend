'use client';
import ContactSection from '../../components/ContactSection';
import CardDetail from './CardDetails';
import QuantityOrder from './QuantityOrder';
import Image from "next/image";
import CardBoutique from '../CardBoutique';
import BookGallery from './BookGalery';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleService } from '../../services/articleService';
import { useCart } from '../../context/CartContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [article, setArticle] = useState(null);
  const [relatedByLanguage, setRelatedByLanguage] = useState([]);
  const [relatedByCollection, setRelatedByCollection] = useState([]);

  useEffect(() => {
    async function fetchArticle() {
      if (!params.id) return;
      try {
        const data = await ArticleService.getById(params.id);
        setArticle(data.data.article);
        setRelatedByLanguage(data.data.relatedByLanguageOrType || []);
        setRelatedByCollection(data.data.relatedByCollection || []);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    }
    fetchArticle();
  }, [params.id]);

  if (!article) {
    return <p className="text-center py-20 text-primary-500">Article non disponible...</p>;
  }

  const handleCommander = (quantity) => {
    if (!article) return;
    addToCart(article, quantity);
    setIsCartOpen(true);
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
      {relatedByCollection.length > 0 && (
        <div className="space-y-10 my-8 px-4 sm:px-8 md:px-16 lg:px-24">
          <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-primary-500 leading-snug text-center">
            Articles similaires
          </h2>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {relatedByCollection.map((item) => (
                <CarouselItem key={item._id || item.id} className="p-2 basis-full sm:basis-1/2 ">
                  <CardBoutique article={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 border-2 border-primary-100 hover:bg-primary-500 hover:text-white" />
              <CarouselNext className="static translate-y-0 bg-primary-500 text-white hover:bg-primary-600" />
            </div>
          </Carousel>
        </div>
      )}

      {/* Other language */}
      {relatedByLanguage.length > 0 && (
        <div className="space-y-10 my-8 px-4 sm:px-8 md:px-16 lg:px-24">
          <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-primary-500 leading-snug text-center">
            Disponible dans une autre langue
          </h2>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {relatedByLanguage.map((item) => (
                <CarouselItem key={item._id || item.id} className="p-2 basis-full sm:basis-1/2 ">
                  <CardBoutique article={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 border-2 border-primary-100 hover:bg-primary-500 hover:text-white" />
              <CarouselNext className="static translate-y-0 bg-primary-500 text-white hover:bg-primary-600" />
            </div>
          </Carousel>
        </div>
      )}

      <ContactSection />
    </>
  );
}
