"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/actualites/gallerie/1.jpg",
  "/images/actualites/gallerie/2.jpeg",
  "/images/actualites/gallerie/3.jpeg",
  "/images/actualites/gallerie/4.jpeg",
  "/images/actualites/gallerie/5.jpeg",
  "/images/actualites/gallerie/6.jpeg",
];

export default function GalleryCarousel() {
  const [current, setCurrent] = React.useState(0);

  // 1 → 2 → 3 images selon l'écran
  const visibleCount = 
    typeof window !== "undefined" && window.innerWidth < 640 ? 1 :
    typeof window !== "undefined" && window.innerWidth < 1024 ? 3 : 5;

  const prev = () => setCurrent(c => c === 0 ? images.length - 1 : c - 1);
  const next = () => setCurrent(c => c === images.length - 1 ? 0 : c + 1);

  const getVisibleImages = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(images[(current + i) % images.length]);
    }
    return result;
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Titre */}
      <section className="px-4 py-8 md:px-16 max-w-6xl mx-auto flex flex-col items-center text-center gap-6 my-10">
      
      
      <h1 className="text-3xl md:text-5xl text-primary-500 font-bold">Photos de la gallerie</h1>

      {/* Ligne décorative */}
      <div className="h-1.5 w-24 md:w-32 bg-primary-100 rounded mb-4"></div>

     
      
    </section>

      {/* Carousel */}
      <div className="relative">
        <div className="flex justify-center items-center gap-6 md:gap-10 lg:gap-14">
          {getVisibleImages().map((src, idx) => {
            const isCenter = idx === Math.floor(visibleCount / 2);

            return (
              <div
                key={idx}
                className={`relative transition-all duration-500 ease-out ${
                  isCenter
                    ? "z-10 scale-120 shadow-2xl"
                    : "z-0 scale-100 opacity-85 shadow-lg"
                }`}
              >
               <div className="relative w-52 h-72 md:w-56 md:h-[320px] lg:w-60 lg:h-[380px] overflow-hidden">

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

        {/* Flèches simples et jolies */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12  rounded-full shadow-lg flex items-center justify-center hover:bg-primary-100 bg-primary-300 text-white transition-all"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-100 bg-primary-300 text-white transition-all"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Points jaunes doux */}
        <div className="flex justify-center gap-3 mt-12">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${
                i === current
                  ? "bg-primary-100 w-10 h-3"
                  : "bg-primary-300 w-3 h-3 hover:bg-yellow-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}