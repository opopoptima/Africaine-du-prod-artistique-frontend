"use client";

import { useState } from "react";
import Image from "next/image";
import { IoPlay, IoVolumeHigh, IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

const defaultSpecs = [
  { label: "ISBN", book1: "979-3-1264-5678-9", book2: "978-1-2345-6789-0" },
  { label: "Niveau scolaire", book1: "CE1 - CM2", book2: "CE2 - CM1" },
  { label: "Dimensions", book1: "21 x 28 cm", book2: "19 x 26 cm" },
  { label: "Pages", book1: "84", book2: "96" },
];

const defaultBookTitles = {
  first: "Les Contes de l'Afrique",
  second: "Mythes d'Afrique Moderne"
};

const defaultImages = [
  "/images/learningBanner/Image threefor LearningBanner.jpg",
  "/images/learningBanner/Imageone for LearningBanner.png",
  "/images/learningBanner/Imageone for two LearningBanner.jpg",
];

export default function CardDetail({
  author = "JANE AUSTIN",
  title = "Les Contes de l'Afrique",
  price = "19.99",
  originalPrice = "29.99",
  description = "Ce livre rassemble les plus beaux contes traditionnels d'Afrique, transmis de génération en génération. Chaque histoire est soigneusement illustrée et adaptée pour captiver l'imagination des jeunes lecteurs, tout en préservant l'authenticité et la richesse culturelle de ces récits ancestraux.",
  objectives = "Développer l'imagination, transmettre les valeurs culturelles africaines et enrichir le vocabulaire.",
  audioDuration = "0:65",
  images = defaultImages,
  specs = defaultSpecs,
  bookTitles = defaultBookTitles,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Smooth zoom follow
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="w-full bg-white overflow-hidden my-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-12 xl:gap-16 p-4 md:p-5 lg:p-8 items-center">
          {/* Cover with Carousel and Zoom */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div 
              className="relative w-full max-w-[280px] lg:max-w-[350px] aspect-3/4 overflow-hidden rounded-lg group cursor-zoom-in"
              onClick={openModal}
            >
              <div
                className="relative w-full h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                  sizes="(max-width: 1024px) 100vw, 280px"
                  priority
                />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary-500 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                    aria-label="Previous image"
                  >
                    <IoChevronBack className="size-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary-500 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                    aria-label="Next image"
                  >
                    <IoChevronForward className="size-5" />
                  </button>
                </>
              )}
            </div>

            {/* Carousel Indicators */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-primary-500 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-3 lg:space-y-4">
            <div className="space-y-1.5 lg:space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-500">{author}</p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-primary-500">{title}</h2>
              <div className="flex items-baseline gap-2 lg:gap-3">
                {originalPrice && (
                  <span className="text-secondary-700 line-through text-sm lg:text-base">${originalPrice}</span>
                )}
                <span className="text-xl md:text-2xl lg:text-3xl font-black text-primary-100">${price}</span>
              </div>
            </div>

            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="text-base lg:text-lg font-semibold text-primary-300">Présentation et Résumé</h3>
              <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">{description}</p>

              {/* Audio player */}
              <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-100 rounded-lg">
                <button className="size-7 lg:size-8 rounded-full bg-primary-300 text-white flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <IoPlay className="size-3 lg:size-4" />
                </button>
                <div className="flex items-center gap-1.5 lg:gap-2 text-secondary-700 text-xs lg:text-sm rounded-full">
                  <div className="flex gap-0.5">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-0.5 h-2.5 lg:h-3 bg-secondary-700 rounded-full" />
                    ))}
                  </div>
                  <span className="font-medium text-xs lg:text-sm">{audioDuration}</span>
                  <button className="ml-0.5 lg:ml-1">
                    <IoVolumeHigh className="size-3.5 lg:size-4 text-secondary-700" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="text-base lg:text-lg font-semibold text-primary-300">Objectifs pédagogiques</h3>
              <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">{objectives}</p>
            </div>

            {/* Specs Table */}
            <div className="rounded-lg lg:rounded-xl border border-primary-300/50 overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-white">
                    {["ISBN", "Niveau scolaire", "Dimensions", "Pages"].map((label, idx) => (
                      <th
                        key={idx}
                        className={`px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm ${idx < 3 ? "border-r border-primary-300/30" : ""}`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: '#9B59B633' }}>
                    {specs.map((spec, idx) => (
                      <td
                        key={idx}
                        className={`px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm ${idx < 3 ? "border-r border-primary-300/30" : ""}`}
                      >
                        {spec.book1}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-in fade-in duration-300"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 z-50"
            aria-label="Close zoom"
          >
            <IoClose className="size-6" />
          </button>

          {/* Navigation Arrows in Modal */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 z-50"
                aria-label="Previous image"
              >
                <IoChevronBack className="size-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 z-50"
                aria-label="Next image"
              >
                <IoChevronForward className="size-6" />
              </button>
            </>
          )}

          {/* Zoomed Image */}
          <div 
            className="relative w-[90vw] h-[90vh] max-w-6xl cursor-zoom-in"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain transition-transform duration-500 ease-in-out"
                style={{
                  transform: isZoomed ? "scale(2.5)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Carousel Indicators in Modal */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
