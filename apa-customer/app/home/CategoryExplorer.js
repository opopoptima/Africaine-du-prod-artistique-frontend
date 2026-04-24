"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { CategoryService } from "../services/categoryService";

export default function CategoryExplorer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getActiveCategories();
        const mappedCategories = data.map((cat) => ({
          id: cat._id || cat.id,
          name: cat.name,
          image: cat.image || null,
          href: `/boutique?category=${cat.slug || cat.name}`,
        }));

        setCategories(mappedCategories.length > 0 ? mappedCategories : []);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="pt-12 px-8 sm:px-8 md:px-16 lg:px-24 xl:px-32 mx-8 text-center text-gray-500">
        Chargement des catégories...
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="pt-12 px-8 sm:px-8 md:px-16 lg:px-24 xl:px-32 mx-8">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-300 mb-4 sm:mb-6">
            Explorer par catégorie
          </h2>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((cat) => (
              <CarouselItem
                key={cat.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Link href={cat.href}>
                  <div className="flex flex-col items-center group cursor-pointer transition-all duration-300">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-purple-200 group-hover:border-purple-400 group-hover:scale-110 flex items-center justify-center p-3 sm:p-4 bg-white shadow-md transition-all duration-300">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={120}
                          height={120}
                          className="object-cover w-full h-full"
                          priority
                        />
                      ) : (
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300">
                          {cat.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <span className="mt-3 text-center font-bold text-xs sm:text-sm md:text-base text-gray-700 group-hover:text-purple-600 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="border-2 border-gray-300 hover:bg-purple-600 hover:text-white hover:border-primary-500" />
          <CarouselNext className="bg-primary-500 text-secondary-100 hover:bg-primary-600 border-2 border-primary-500" />
        </Carousel>
      </div>
    </section>
  );
}
