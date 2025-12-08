"use client";
import { useState } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

export default function CardDetail({ article }) {
  // Safe destructure with defaults
  const {
    author = "Unknown Author",
    title = "Untitled",
    description = "No description",
    cover = "/images/placeholder.jpg",
    images: rawImages = [],
    isbn = "N/A",
    dimensions = "N/A",
    schoolLevel = "N/A",
    pages = "N/A",
    language = "N/A",
    type = "N/A",
    price = "0.00",
    originalPrice = null,
    stock = 0,
  } = article || {};

  // Ensure images array always has at least the cover
  const images = rawImages.length > 0 ? rawImages : [cover];

  const specs = [
    { label: "ISBN", value: isbn },
    { label: "Niveau scolaire", value: schoolLevel },
    { label: "Dimensions", value: dimensions },
    { label: "N° de pages", value: pages },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };
  const handleMouseLeave = () => setIsZoomed(false);
  const openModal = () => { setIsModalOpen(true); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { setIsModalOpen(false); setIsZoomed(false); document.body.style.overflow = 'unset'; };

  if (!article) {
    return (
      <div className="bg-white rounded-xl shadow-md w-full max-w-xl mx-auto p-6 text-center text-gray-500">
        Article non disponible
      </div>
    );
  }

  return (
    <>
      <section className="w-full bg-white overflow-hidden my-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-12 xl:gap-16 p-4 md:p-5 lg:p-8 items-center">
          
          {/* Cover photo */}
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="relative w-56 md:w-64 lg:w-72 aspect-[2/3] max-h-[80vh] overflow-hidden rounded-xl shadow-md border border-primary-300/40 cursor-pointer"
                 onClick={openModal}>
              <Image
                src={images[currentImageIndex]}
                alt={`${title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 20rem, 18rem"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 lg:space-y-4">
            <div className="space-y-1.5 lg:space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-500">{author}</p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-primary-500">{title}</h2>
              <div className="flex items-baseline gap-2 lg:gap-3">
                {originalPrice && <span className="text-secondary-700 line-through text-sm lg:text-base">${originalPrice}</span>}
                <span className="text-xl md:text-2xl lg:text-3xl font-black text-primary-100">${price}</span>
              </div>
            </div>

            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="text-base lg:text-lg font-semibold text-primary-300">Présentation et Résumé</h3>
              <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">{description}</p>
            </div>

            {/* --- MOBILE VERSION: vertical specs --- */}
            <div className="bg-white border border-primary-300/40 rounded-lg p-4 flex flex-col gap-3 sm:hidden">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center border-b last:border-b-0 border-primary-200/40 pb-2">
                  <span className="text-primary-500 font-semibold text-sm">{spec.label}</span>
                  <span className="text-secondary-900 font-medium text-sm">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* --- DESKTOP VERSION: table specs --- */}
            <div className="hidden sm:block rounded-lg lg:rounded-xl border border-primary-300/50 overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-white">
                    {specs.map((s, idx) => (
                      <th key={idx} className={`px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm ${idx < specs.length - 1 ? "border-r border-primary-300/30" : ""}`}>
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: "#9B59B633" }}>
                    {specs.map((s, idx) => (
                      <td key={idx} className={`px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm ${idx < specs.length - 1 ? "border-r border-primary-300/30" : ""}`}>
                        {s.value}
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-in fade-in duration-300" onClick={closeModal}>
          <button onClick={closeModal} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 z-50"><IoClose className="size-6" /></button>

          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 z-50"><IoChevronBack className="size-6" /></button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 z-50"><IoChevronForward className="size-6" /></button>
            </>
          )}

          <div className="relative w-[90vw] h-[90vh] max-w-6xl cursor-zoom-in" onClick={(e) => e.stopPropagation()} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain transition-transform duration-500 ease-in-out"
                style={{ transform: isZoomed ? "scale(2.5)" : "scale(1)", transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}