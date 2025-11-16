import Image from "next/image";

export default function IconCard({ imageSrc, alt, title, description }) {
  return (
    <div
      className="
        text-center p-4 sm:p-6 md:p-8 
        rounded-2xl 
        border border-[var(--color-primary-300)]
        bg-white/80 backdrop-blur-sm

        shadow-[0_4px_10px_rgba(0,0,0,0.10)]
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.15),0_0_15px_rgba(75,0,130,0.15)]
        hover:-translate-y-2
        hover:scale-[1.02]
        
        transition-all duration-300
        w-full sm:max-w-xs md:max-w-[280px] mx-auto
      "
    >
      
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 drop-shadow-[0_5px_8px_rgba(75,0,130,0.25)]">
        <Image src={imageSrc} alt={alt} fill className="object-contain" />
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-primary-500)] mb-3 sm:mb-4">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-[var(--color-secondary-700)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
