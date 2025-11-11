import { Button } from "../components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroSection/heroSectionImageBackground.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
      </div>

      {/* Gradient Overlay: 70% white, 30% purple */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/70 via-white/0 to-[#9B59B6]/50" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            
           

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-primary-500"></span>
              <br />
              <span className="text-primary-300">L&apos;Africaine de Prod Artistique</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-secondary-700 max-w-2xl leading-relaxed">
              Des livres qui célèbrent l&apos;imagination et accompagnent l&apos;épanouissement de nos petits lecteurs
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-[#DAA520] text-white hover:bg-[#c89410] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Découvrir notre collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative h-[200px] md:h-[400px] lg:h-[600px] flex items-center justify-center">
            {/* Main Hero Image - Positioned as per Figma */}
            <div 
              className="absolute w-[300px] h-[257px] md:w-[300px] md:h-[343px] lg:w-[468px] lg:h-[401px] rounded-full overflow-hidden shadow-2xl z-10"
              style={{
                transform: 'matrix(-1, 0.01, -0.01, 1, 0, 0)',
              }}
            >
              <Image
                src="/images/heroSection/heroSectionImage.jpg"
                alt="L'Africaine de Prod Artistique"
                fill
                className="object-cover"
                priority
                quality={95}
              />
            </div>

            {/* Small decorative image positioned to the LEFT of the main image (keeps distance responsively) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-[140%] md:-translate-x-[160%] lg:-translate-x-[200%] w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden z-20 rounded-lg ">
              <Image
                src="/images/heroSection/image.png"
                alt="Decorative"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      
    </section>
  );
}
