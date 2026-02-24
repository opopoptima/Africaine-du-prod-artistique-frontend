"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import dynamic from "next/dynamic";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Dynamically import PdfFlipBook to avoid SSR issues
const PdfFlipBook = dynamic(() => import("./PdfFlipBook"), {
  ssr: false,
  loading: () => <div className="text-white">Chargement du PDF...</div>,
});
import { useToast } from "../../context/ToastContext";

export default function CardDetail({ article }) {
  const toast = useToast();
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
    objectives = "No objectives provided",
    pdfExtrait = null, // PDF URL
  } = article || {};

  // Ensure images array always has at least the cover
  const images = rawImages.length > 0 ? rawImages : [cover];

  const specs = [
    { label: "ISBN", value: isbn },
    { label: "Niveau scolaire", value: schoolLevel },
    { label: "Dimensions", value: dimensions },
    { label: "Nombre de pages", value: pages },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const utteranceRef = useRef(null);
  const timerRef = useRef(null);

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Also listen for voiceschanged event (some browsers need this)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Estimate duration based on word count (average speaking rate: 150 words/minute)
  useEffect(() => {
    if (description) {
      const wordCount = description.split(/\s+/).length;
      const estimatedDuration = (wordCount / 150) * 60; // in seconds
      setDuration(estimatedDuration);
    }
  }, [description]);

  const speakText = () => {
    if (!description) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Map language to speech synthesis language code
    const languageMap = {
      "English": "en-US",
      "Français": "fr-FR",
      "Arabe": "ar-SA",
      "arabe": "ar-SA",
      "Arabic": "ar-SA",
      "ar": "ar-SA",
      "fr": "fr-FR",
      "en": "en-US",
    };

    const speechLang = languageMap[language] || "en-US";
    console.log("Selected language:", language, "-> Speech lang:", speechLang);

    const utterance = new window.SpeechSynthesisUtterance(description);
    utterance.lang = speechLang;
    utterance.rate = 1;
    utterance.pitch = 1;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    console.log("Total voices available:", voices.length);

    // Try to select the best voice for the language
    if (speechLang.startsWith("ar")) {
      // For Arabic, try to find the best Arabic voice
      const arabicVoices = voices.filter(v => v.lang.startsWith("ar"));
      console.log("Arabic voices found:", arabicVoices.map(v => `${v.name} (${v.lang})`));

      if (arabicVoices.length > 0) {
        // Prefer Saudi Arabic (ar-SA) or any Arabic voice
        const preferredVoice = arabicVoices.find(v => v.lang === "ar-SA") || arabicVoices[0];
        utterance.voice = preferredVoice;
        console.log("Selected Arabic voice:", preferredVoice.name, preferredVoice.lang);
      } else {
        console.warn("No Arabic voice found. Speech may not work correctly for Arabic text.");
        toast.error("Aucune voix arabe n'est disponible sur votre navigateur. La lecture audio peut ne pas fonctionner correctement.");
      }
    } else if (speechLang.startsWith("fr")) {
      const frenchVoices = voices.filter(v => v.lang.startsWith("fr"));
      if (frenchVoices.length > 0) {
        utterance.voice = frenchVoices[0];
        console.log("Selected French voice:", frenchVoices[0].name);
      }
    } else if (speechLang.startsWith("en")) {
      const englishVoices = voices.filter(v => v.lang.startsWith("en"));
      if (englishVoices.length > 0) {
        utterance.voice = englishVoices[0];
        console.log("Selected English voice:", englishVoices[0].name);
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentTime(0);
      // Update progress timer
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            clearInterval(timerRef.current);
            return duration;
          }
          return prev + 0.1;
        });
      }, 100);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentTime(0);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentTime(0);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => setIsZoomed(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = "unset";
  };


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
            <div
              className="group relative w-56 md:w-64 lg:w-72 aspect-2/3 max-h-[80vh] overflow-hidden rounded-xl shadow-md border border-primary-300/40 cursor-pointer"
              onClick={openModal}
            >
              {/* Cover image */}
              <Image
                src={images[currentImageIndex]}
                alt={`${title} cover`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 20rem, 18rem"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary-500/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-white">
                  <FaEye className="text-2xl" />
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    Aperçus
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* Details */}
          <div className="space-y-3 lg:space-y-4">
            <div className="space-y-1.5 lg:space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-500">
                {author}
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-primary-500">
                {title}
              </h2>
              <div className="flex items-baseline gap-2 lg:gap-3">
                {originalPrice && (
                  <span className="text-secondary-700 line-through text-sm lg:text-base">
                    {originalPrice} dt
                  </span>
                )}
                <span className="text-xl md:text-2xl lg:text-3xl font-black text-primary-100">
                  {price} dt
                </span>
              </div>
            </div>

            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="text-base lg:text-lg font-semibold text-primary-300">
                Présentation et Résumé
              </h3>
              <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">
                {description}
              </p>
              {/* Compact Audio Player */}
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 shadow-sm">
                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={isSpeaking ? stopSpeech : speakText}
                  className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-all duration-200 flex items-center justify-center shrink-0"
                  aria-label={isSpeaking ? "Arrêter la lecture" : "Écouter le texte"}
                >
                  {isSpeaking ? (
                    <FaPause className="w-3 h-3" />
                  ) : (
                    <FaPlay className="w-3 h-3 ml-0.5" />
                  )}
                </button>

                {/* Waveform */}
                <div className="flex items-center gap-0.5 h-5">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-0.5 bg-gray-800 rounded-full transition-all duration-150 ${isSpeaking ? "animate-pulse" : ""
                        }`}
                      style={{
                        height: isSpeaking
                          ? `${Math.random() * 60 + 40}%`
                          : "30%",
                        animationDelay: `${i * 0.05}s`,
                        opacity: isSpeaking ? 0.8 : 0.4,
                      }}
                    />
                  ))}
                </div>

                {/* Time */}
                <span className="text-xs font-medium text-gray-600 min-w-10 text-right">
                  {formatTime(isSpeaking ? currentTime : duration)}
                </span>

                {/* Volume Icon */}
                <FaVolumeUp className="w-4 h-4 text-gray-600 shrink-0" />
              </div>

              <h3 className="text-base lg:text-lg font-semibold text-primary-300">
                Objectifs Pédagogiques
              </h3>
              <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">
                {objectives}
              </p>
            </div>

            {/* --- MOBILE VERSION: vertical specs --- */}
            <div className="bg-white border border-primary-300/40 rounded-lg p-4 flex flex-col gap-3 sm:hidden">
              {specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b last:border-b-0 border-primary-200/40 pb-2"
                >
                  <span className="text-primary-500 font-semibold text-sm">
                    {spec.label}
                  </span>
                  <span className="text-secondary-900 font-medium text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* --- DESKTOP VERSION: table specs --- */}
            <div className="hidden sm:block rounded-lg lg:rounded-xl border border-primary-300/50 overflow-x-auto">
              <table className="w-full min-w-125">
                <thead>
                  <tr className="bg-white">
                    {specs.map((s, idx) => (
                      <th
                        key={idx}
                        className={`px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm ${idx < specs.length - 1
                          ? "border-r border-primary-300/30"
                          : ""
                          }`}
                      >
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: "#9B59B633" }}>
                    {specs.map((s, idx) => (
                      <td
                        key={idx}
                        className={`px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm ${idx < specs.length - 1
                          ? "border-r border-primary-300/30"
                          : ""
                          }`}
                      >
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

      {/* Modal - PDF Flipbook or Image Zoom */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-9999 flex items-center justify-center "
          onClick={closeModal}
        >
          {/* Close button - also high z-index */}
          <button
            onClick={closeModal}
            className="absolute  top-24 sm:top-18 right-2 bg-gray-200 hover:bg-white/20 text-black rounded-full p-2 transition-all duration-200 z-999"
          >
            <IoClose className="size-8" />
          </button>

          {pdfExtrait ? (
            <PdfFlipBook
              pdfExtrait={pdfExtrait}
              cover={cover}
              title={title}
              author={author}
              onClose={closeModal}
            />
          ) : (
            <>
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all z-9999"
                  >
                    <IoChevronBack className="size-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all z-9999"
                  >
                    <IoChevronForward className="size-8" />
                  </button>
                </>
              )}

              <div
                className="relative w-[92vw] h-[92vh] max-w-7xl cursor-zoom-in"
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain transition-transform duration-500 ease-out"
                    style={{
                      transform: isZoomed ? "scale(2.5)" : "scale(1)",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                    sizes="92vw"
                    priority
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}