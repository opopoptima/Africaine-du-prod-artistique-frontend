import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LearningBanner() {
  return (
    <section className="relative overflow-hidden bg-primary-300 py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">

      {/* Decorative Elements */}
      <Image
              src="/images/learningBanner/vector-top.png"
              alt="vector decoration"
              width={80}
              height={80}
              quality={75}
              className="absolute top-2 "
            />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white z-10">
            

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Apprendre en
              <br />
              <span className="text-secondary-100 animate-pulse-slow">s&apos;amusant !</span>
            </h2>

            <p className="text-lg md:text-xl text-white/90 max-w-lg leading-relaxed">
              Découvrez nos livres classiques qui font briller les petits esprits ✨
            </p>
          </div>

          {/* Right Content - Books Display */}
          <div className="relative h-64 md:h-80 lg:h-96">
            {/* Book 1 */}
            <div className="absolute top-0 left-8 md:left-12 w-32 md:w-40 lg:w-48 transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:z-30 animate-float">
              <div className="relative aspect-[3/4] rounded-lg shadow-2xl overflow-hidden border-4 border-white/20">
                <Image
                src="/images/learningBanner/Imageone for two LearningBanner.jpg"
                  
                  alt="Book 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                />
                {/* Button positioned at bottom of first book */}
                
              </div>
            </div>

            {/* Book 2 - Center, larger */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-36 md:w-44 lg:w-52 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:z-30 animate-float-delayed z-20">
              <div className="relative aspect-[3/4] rounded-lg shadow-2xl overflow-hidden border-4 border-white/30">
                <Image
                  src="/images/learningBanner/Imageone for LearningBanner.png"
                  alt="Book 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                />
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full px-2">
                  <Button 
                    size="sm"
                    className="w-full bg-primary-100 text-white hover:bg-secondary-100 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:text-primary-100 group text-xs md:text-sm"
                  >
                    Explorer la boutique
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                </div>
            </div>

            {/* Book 3 */}
            <div className="absolute top-8 right-8 md:right-12 w-32 md:w-40 lg:w-48 transform rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:z-30 animate-float">
              <div className="relative aspect-[3/4] rounded-lg shadow-2xl overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/learningBanner/Image threefor LearningBanner.jpg"
                  alt="Book 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                />
              </div>
            </div>
          </div>
         

        </div>
      </div>
      <Image
  src="/images/learningBanner/vector-bottom.png"
  alt="vector decoration"
  width={120}
  height={120}
  quality={75}
  className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
  priority
/>

    </section>
  );
}