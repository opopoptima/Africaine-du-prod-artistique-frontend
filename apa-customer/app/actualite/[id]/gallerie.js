"use client";

import * as React from "react";
import { Button } from "../../components/ui/button"; // shadcn button
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/actualites/gallerie/1.jpg",
  "/images/actualites/gallerie/2.jpeg",
  "/images/actualites/gallerie/3.jpeg",
  "/images/actualites/gallerie/4.jpeg",
  "/images/actualites/gallerie/5.jpeg",
];

export default function GalleryCarousel() {
  const [current, setCurrent] = React.useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 px-4 md:px-16 max-w-7xl mx-auto flex flex-col items-center ">
      <h2 className="text-3xl font-bold text-primary-500 mb-4">Photos de la galerie</h2>
      <div className="h-1.5 w-20 bg-primary-100 rounded mb-8"></div>

      {/* Carousel */}
      <div className="relative w-full md:w-4/5 overflow-hidden   ">
        <div
          className="flex transition-transform gap-10 duration-500 ease-in-out"
          style={{ transform: `translateX(-${(current * 100) / 3}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Gallery ${index}`}
              className="flex-shrink-0 w-1/3 h-64 md:h-80 object-cover mx-1 rounded-lg"
            />
          ))}
        </div>

        {/* Flèches */}
        <Button
          variant="ghost"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary-300"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary-300"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-6">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-primary-100 w-6" : "bg-primary-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
