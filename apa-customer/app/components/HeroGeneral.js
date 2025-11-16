import Image from "next/image";

export default function HeroGeneral({ title, showLogo = true }) {
  return (
    <section className="relative h-[230px] md:h-[260px] overflow-hidden flex items-center">
      
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

      {/* Gradient Overlay: 70% white, 30% purple - Même que HeroSection */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/70 via-white/0 to-[var(--color-primary-300)]/50" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-12 md:mx-20 px-6 flex items-center justify-between w-full">

        {/* Title avec la couleur correcte */}
        <h1 className="text-3xl  md:text-5xl font-extrabold text-[var(--color-primary-500)]">
          {title}
        </h1>

        {/* Logo PLUS GRAND */}
        {showLogo && (
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
            <Image
              src="/images/apa-logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}