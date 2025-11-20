import Image from "next/image";

export default function HeroSectionAct({ news }) {
  return (
    <section className="relative w-full min1½-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroSection/heroSectionImageBackground.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center opacity-30"
          priority
          quality={90}
        />
      </div>

      {/* Violet overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-l from-primary-500/60 via-primary-500/30 to-transparent" />

      {/* Contenu */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center py-8 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full">

          {/* Texte à gauche */}
          <div className="space-y-5 md:space-y-10 order-2 lg:order-1 mt-5 md:mt-10 lg:mt-15 xl:mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-primary-500 drop-shadow-lg">
              {news.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-900 leading-relaxed max-w-lg">
              The event features renowned influencers and innovators shaping trends and driving creativity across various industries.
            </p>

            <div className="grid grid-cols-2 gap-5 sm:gap-7 mt-6">
              <div>
                <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Date et heure</p>
                <p className="text-gray-500 text-lg mt-1 font-medium">
                  {news.eventDate || "10/11/2025"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Public concerné</p>
                <p className="text-gray-500 text-lg mt-1 font-medium">Enseignants du primaire</p>
              </div>
              <div>
                <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Lieu</p>
                <p className="text-gray-500 text-lg mt-1 font-medium">
                  {news.lieu || "Centre de Formation de Dakar"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Thèmes abordés</p>
                <p className="text-gray-500 text-lg mt-1 font-medium">
                  {news.themes || "Méthodes d’enseignement"}
                </p>
              </div>
            </div>
          </div>

          {/* Image à droite - plus compacte, sans marge négative, sans bordure */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <img
              src="/images/actualites/actualite1.png"
              alt={news.title}
              className="
                w-56 h-72
                sm:w-64 sm:h-80
                md:w-72 md:h-96
                lg:w-80 lg:h-[440px]
                xl:w-96 xl:h-[520px]
                object-cover object-top
                rounded-[0%_0%_40%_40%]
                shadow-2xl
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}