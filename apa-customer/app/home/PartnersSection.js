import Image from "next/image";

const partners = [
  { name: "Librairie Aya Sofya", logo: "/images/unnamed.jpg", color: "text-purple-600", style: "italic font-light" },
  { name: "Dima Edition et Diffusion", logo: "/images/dima.png", color: "text-purple-600", style: "italic font-light" },


];

const PartnersSection = () => {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600">
            Nos partenaires
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Nous collaborons avec des institutions de confiance
          </p>
        </div>

        {/* Carousel on mobile / Grid on desktop */}
        <div
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 
            sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 sm:overflow-visible
          "
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="
                min-w-[75%] snap-center sm:min-w-0
                flex items-center justify-center p-6 sm:p-8 bg-white rounded-xl
                shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                cursor-pointer border border-gray-200
              "
            >
              <div className="text-center">
                <div className="relative w-40 h-40 sm:w-40 sm:h-40 mx-auto mb-3">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 640px) 128px, 160px"
                  />
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
