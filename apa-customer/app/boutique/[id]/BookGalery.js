
"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function BookGallery({ images = [], title = "Book" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) return null;

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => setIsZoomed(false);

  return (
    <>
      {/* Gallery - Carousel on mobile, static on desktop */}
      <div className="md:bg-white md:rounded-2xl shadow-lg md:p-4 mb-4 sm:mb-8">
        {/* Mobile Carousel */}
        <div className="sm:hidden relative w-full flex flex-col items-center">
          <div className="relative w-48 aspect-2/3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${title} - ${currentIndex + 1}`}
              className="w-full h-full object-contain cursor-zoom-in"
              onClick={() => openModal(currentIndex)}
            />
          </div>

          {/* Mobile Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Mobile Indicators */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? "bg-gray-800 w-6"
                    : "bg-gray-300 hover:bg-gray-500 w-2"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop Static Gallery */}
        <div className="hidden sm:flex gap-8">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative shrink-0 w-40 md:w-48 cursor-zoom-in overflow-hidden aspect-2/3"
              onClick={() => openModal(index)}
            >
              <img
                src={src}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Zoom */}
          <div
            className="relative w-[90vw] h-[90vh] max-w-4xl cursor-zoom-in"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <img
                src={images[currentIndex]}
                alt={`${title} - ${currentIndex + 1}`}
                className="w-full h-full object-contain transition-transform duration-500"
                style={{
                  transform: isZoomed ? "scale(2.5)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/75 w-2"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}