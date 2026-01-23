"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryCarousel({ images = [] }) {
  const [current, setCurrent] = React.useState(0);

  // Determine visible count based on screen width
  const [visibleCount, setVisibleCount] = React.useState(1);

  React.useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const prev = () => setCurrent(c => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === images.length - 1 ? 0 : c + 1));

  const getVisibleImages = () => {
    return images.length
      ? Array.from({ length: visibleCount }, (_, i) => images[(current + i) % images.length])
      : [];
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="py-4 px-4 max-w-7xl mx-auto">
      <div className="px-4 py-8 md:px-16 max-w-6xl mx-auto flex flex-col items-center text-center gap-6 my-10">
        <h1 className="text-3xl md:text-5xl text-primary-500 font-bold">
          Photos de la galerie
        </h1>
        <div className="h-1.5 w-24 md:w-32 bg-primary-100 rounded mb-4"></div>
      </div>

      <div className="relative">
        <div className="flex justify-center items-center gap-6 md:gap-10 lg:gap-14">
         {getVisibleImages().map((src, idx) => {
          const isCenter = idx === Math.floor(visibleCount / 2);
          return (
            <div
              key={idx}
              className={`relative transition-all duration-500 ease-out ${
                isCenter ? "z-10 scale-110 shadow-xl" : "z-0 scale-95 opacity-90 shadow-md"
              }`}
            >
              <div className="relative w-40 h-56 md:w-44 md:h-64 lg:w-48 lg:h-72 overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Photo ${current + idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 32vw"
                />
              </div>
            </div>
          );
        })}

        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-100 bg-primary-300 text-white transition-all"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-100 bg-primary-300 text-white transition-all"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-12">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${
                i === current ? "bg-primary-100 w-10 h-3" : "bg-primary-300 w-3 h-3 hover:bg-yellow-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
