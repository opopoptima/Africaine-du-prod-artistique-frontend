import Image from "next/image";
import { Button } from "../components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

export default function CardBoutique({ 
  title = "The secret garden", 
  description = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  imageSrc = "/images/learningBanner/Image threefor LearningBanner.jpg",
  linkText = "Voir plus",
  
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {/* Image Section - Left side */}
        <div className="relative h-80 w-full sm:w-44 h-56 sm:h-64 rounded-xl overflow-hidden sm:overflow-visible">
          {/* enlarged, rotated image that can overflow the card on larger screens */}
          <div className="absolute left-0 top-0 w-full h-full sm:w-[110%] sm:h-[110%] md:w-[110%] md:h-[110%] sm:-translate-x-4 md:-translate-x-8 sm:-translate-y-2 md:-translate-y-4 sm:-rotate-3 md:-rotate-6 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, 220px"
            />
          </div>
        </div>

        {/* Content Section - Right side */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500 leading-tight text-center">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-secondary-700 leading-relaxed">
            {description}
          </p>

          {/* Link */}
          <a 
            href="#" 
            className="text-secondary-500 font-semibold text-lg transition-colors inline-flex items-center gap-1 w-fit"
          >
            {linkText}
            
          </a>

          {/* Buttons - keep on same line */}
          <div className="flex flex-row gap-3 mt-auto flex-wrap">
            <Button
              size="default"
              variant="outline"
              className="flex-1 border-2 rounded-full border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white"
            >
              <IoEyeOutline className="w-5 h-5" />
              Voir plus
            </Button>
            
            <Button
              size="sm"
              className="flex-1 bg-primary-300 rounded-full text-white hover:bg-primary-500 text-lg px-4 py-1"
            >
              <IoCartOutline className="w-5 h-5" />
              Commander
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}