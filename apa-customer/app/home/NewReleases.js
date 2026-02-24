"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Heart, Eye } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { ArticleService } from "../services/articleService";

const BookCard = ({ id, image, title, author, price, originalPrice, isBestSeller }) => (
  <Link href={`/boutique/${id}`}>
    <Card className="group relative overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[3/4] w-full max-w-[220px] sm:max-w-[180px] mx-auto overflow-hidden rounded-lg">
        {isBestSeller && (
          <div className="absolute left-0 top-0 z-10 w-24 overflow-hidden">
            <Badge className="absolute left-[-20px] top-[10px] z-10 rotate-[-45deg] bg-primary-100 text-xs font-bold text-secondary-700 shadow-md border-0 px-4 py-1">
              Bestseller
            </Badge>
          </div>
        )}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

      </div>
      <div className="mt-4 space-y-1 text-center px-2 sm:px-0">
        <p className="text-sm text-secondary-900">{author}</p>
        <h3 className="font-semibold text-secondary-900 text-sm sm:text-base line-clamp-2 group-hover:text-primary-500 transition-colors uppercase">{title}</h3>
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-primary-500">{price}</span>
          {originalPrice && (
            <span className="text-sm text-secondary-700 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </Card>
  </Link>
);


export const NewReleases = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArticles = async () => {
      setLoading(true);
      try {
        const res = await ArticleService.getAll({ limit: 20, filters: { isNew: true } });
        // Accept both res.data (array) or res (array)
        const data = Array.isArray(res) ? res : res.data || [];
        setArticles(data.filter((a) => a.isNew));
      } catch (err) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArticles();
  }, []);

  return (
    <section className="pt-12 px-8 sm:px-8 md:px-16 lg:px-24 xl:px-32 mx-8">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-300 mb-4 sm:mb-6">
            Nos nouveautés
          </h2>
          <p className="text-secondary-700 text-base sm:text-lg max-w-2xl mx-auto">
            Découvrez nos dernières publications conçues pour inspirer et éduquer
          </p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-gray-500 py-12">Chargement...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-12">Aucune nouveauté trouvée.</div>
        ) : (
          <>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {articles.map((article) => (
                  <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <div className="p-1">
                      <BookCard
                        id={article.id}
                        image={article.cover}
                        title={article.title}
                        author={article.author}
                        price={article.price ? `${article.price} dt` : ""}
                        originalPrice={article.originalPrice ? `${article.originalPrice} dt` : undefined}
                        isBestSeller={article.isBestSeller}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-2 border-gray-300 hover:bg-purple-600 hover:text-white hover:border-primary-500" />
              <CarouselNext className="bg-primary-500 text-secondary-100 hover:bg-primary-600 border-2 border-primary-500" />
            </Carousel>
            <div className="text-center">
              <Link href="/boutique?isNew=true">
                <Button
                  size="lg"
                  className="bg-primary-100 hover:bg-secondary-100 hover:text-primary-100 hover:border-primary-100 hover:border-2 text-secondary-100 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  Voir plus
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
