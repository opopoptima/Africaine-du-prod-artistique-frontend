import Image from "next/image";
import { Button } from "../components/ui/button";
import { IoEyeOutline, IoCartOutline } from "react-icons/io5";

export default function CardBoutique({ 
  title = "The secret garden", 
  description = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  imageSrc = "/images/learningBanner/Image threefor LearningBanner.jpg",
  linkText = "Voir plus",
}) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 p-4 md:p-5">
        {/* Image Section */}
        <div className="relative h-48 w-full sm:w-36 md:w-40 rounded-lg overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full sm:w-[105%] sm:h-[105%] sm:-translate-x-2 sm:-translate-y-1 sm:-rotate-2 overflow-hidden rounded-lg shadow-md">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, 180px"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-2 flex-1">
          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-500 leading-snug">
            {title}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-secondary-700 leading-relaxed">
            {description}
          </p>

          {/* Link */}
          <a 
            href="#" 
            className="text-secondary-500 font-medium text-sm sm:text-base transition-colors inline-flex items-center gap-1 w-fit"
          >
            {linkText}
          </a>

          {/* Buttons */}
          <div className="flex flex-row gap-2 mt-auto flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-2 rounded-full border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white text-sm md:text-base"
            >
              <IoEyeOutline className="w-4 h-4 mr-1" />
              Voir plus
            </Button>
            
            <Button
              size="sm"
              className="flex-1 bg-primary-300 rounded-full text-white hover:bg-primary-500 text-sm md:text-base px-3 py-1"
            >
              <IoCartOutline className="w-4 h-4 mr-1" />
              Commander
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
