import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import book1 from "@/app/assets/book1.jpg";
import book2 from "@/app/assets/book2.jpg";
import book3 from "@/app/assets/book3.jpg";
import book4 from "@/app/assets/book4.jpg";
import book5 from "@/app/assets/book5.jpg";

const books = [
  {
    id: 1,
    image: book1,
    title: "My Dearest Darkest",
    author: "By Gianna Berge",
    price: "$120.00",
    isBestseller: true,
  },
  {
    id: 2,
    image: book2,
    title: "House of Sky and Breath",
    author: "By Gilberto Mills",
    price: "$80.00",
    originalPrice: "$90.00",
  },
  {
    id: 3,
    image: book3,
    title: "The Illness Lesson",
    author: "By Dania Chambers",
    price: "$145.00",
  },
  {
    id: 4,
    image: book4,
    title: "Treachery: Alpha Colony",
    author: "By Susanne Casey",
    price: "$96.00",
  },
  {
    id: 5,
    image: book5,
    title: "The Secret Garden",
    author: "By Frances Hodgson",
    price: "$110.00",
  },
];

const BookCard = ({
  image,
  title,
  author,
  price,
  originalPrice,
  isBestseller,
}) => {
  return (
    <Card className="group relative overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300">
      <div className="relative aspect-[3/2.5] overflow-hidden rounded-lg shadow-[var(--shadow-card)] mx-auto w-full">
        {isBestseller && (
          <Badge className="absolute left-3 top-3 z-10 bg-orange-500 hover:bg-orange-500 text-white border-0 shadow-lg">
            Bestseller
          </Badge>
        )}
        
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500"
        />
        
        {/* Overlay violet au hover */}
        <div className="absolute inset-0 bg-purple-700/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Boutons d'action */}
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-purple-600 hover:text-white hover:scale-110">
            <Heart className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-purple-600 hover:text-white hover:scale-110">
            <Eye className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-purple-600 hover:text-white hover:scale-110">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-1">
        <p className="text-sm text-gray-500">{author}</p>
        <h3 className="font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-purple-600">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export const NewReleases = () => {
  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-600 mb-4">
            Nos nouveautés
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez nos dernières publications conçues pour inspirer et éduquer
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <BookCard {...book} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white border-2 border-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600" />
          <CarouselNext className="right-0 bg-purple-600 text-white hover:bg-purple-700 border-2 border-purple-600" />
        </Carousel>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-orange-400 hover:bg-orange-500 text-white px-12 py-6 text-lg rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Voir plus
          </Button>
        </div>
      </div>
    </section>
  );
};