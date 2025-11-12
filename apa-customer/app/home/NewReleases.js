import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Heart, Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/app/components/ui/carousel";


const books = [
  {
    id: 1,
    image: "/images/NewReleases/BOOK1.png",
    title: "My Dearest Darkest",
    author: "By Gianna Berge",
    price: "$120.00",
    isBestseller: true,
  },
  {
    id: 2,
    image: "/images/NewReleases/BOOK2.png",
    title: "House of Sky and Breath",
    author: "By Gilberto Mills",
    price: "$80.00",
    originalPrice: "$90.00",
  },
  {
    id: 3,
    image: "/images/NewReleases/BOOK3.png",
    title: "My Dearest Darkest",
    author: "By Gianna Berge",
    price: "$120.00",
    isBestseller: true,
  },
  {
    id: 4,
    image: "/images/NewReleases/BOOK4.png",
    title: "House of Sky and Breath",
    author: "By Gilberto Mills",
    price: "$80.00",
    originalPrice: "$90.00",
  },
  {
    id: 5,
    image: "/images/NewReleases/BOOK4.png",
    title: "House of Sky and Breath",
    author: "By Gilberto Mills",
    price: "$80.00",
    originalPrice: "$90.00",
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
      <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto overflow-hidden rounded-lg">
        {isBestseller && (
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

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-primary-500 hover:text-secondary-100 hover:scale-110">
            <Heart className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-primary-500 hover:text-secondary-100 hover:scale-110">
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-center">
        <p className="text-sm text-secondary-900">{author}</p>
        <h3 className="font-semibold text-secondary-900 line-clamp-2">{title}</h3>
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-primary-500">{price}</span>
          {originalPrice && (
            <span className="text-sm text-secondary-700 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export const NewReleases = () => {
  return (
    <section className="py-16 px-60">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary-500 mb-6">
            Nos nouveautés
          </h2>
          <p className="text-secondary-700 text-lg max-w-2xl mx-auto">
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
          <CarouselPrevious className="border-2 border-gray-300 hover:bg-purple-600 hover:text-white hover:border-primary-500" />
          <CarouselNext className="bg-primary-500 text-secondary-100 hover:bg-primary-600 border-2 border-primary-500" />
        </Carousel>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary-100 hover:bg-secondary-100 hover:text-primary-100 hover:border-primary-100 hover:border-2 text-secondary-100 px-12 py-6 text-lg rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Voir plus
          </Button>
        </div>
      </div>
    </section>
  );
};