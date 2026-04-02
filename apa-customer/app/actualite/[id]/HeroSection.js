"use client";

import Image from "next/image";

export default function HeroSectionAct({ news }) {
  if (!news) return null;

  const formatShortDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("fr-FR", optionsDate);
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    return `${date.toLocaleDateString("fr-FR", optionsDate)} à ${date.toLocaleTimeString("fr-FR", optionsTime)}`;
  };

  const renderDate = () => {
    if (news.startDate && news.endDate) {
      return (
        <span className="block leading-relaxed">
          Du {formatFullDate(news.startDate)} <br /> Au {formatFullDate(news.endDate)}
        </span>
      );
    }
    return formatFullDate(news.eventDate || news.publicationDate || news.createdAt);
  };

  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] overflow-hidden">
      {/* Background */}
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

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-l from-primary-500/60 via-primary-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start w-full">

          {/* Left Text */}
          <div className="space-y-5 order-2 lg:order-1 mt-3">
            {news.title && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-primary-500 drop-shadow-lg">
                {news.title}
              </h1>
            )}

            {news.subtitle && (
              <p className="text-base sm:text-lg text-gray-900 leading-relaxed max-w-lg">
                {news.subtitle}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 mt-4">
              {(news.startDate || news.eventDate) && (
                <div>
                  <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Date et heure</p>
                  <p className="text-gray-500 text-sm mt-1 font-medium">{renderDate()}</p>
                </div>
              )}
              {news.publicCible && (
                <div>
                  <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Public concerné</p>
                  <p className="text-gray-500 text-lg mt-1 font-medium">{news.publicCible}</p>
                </div>
              )}
              {news.lieu && (
                <div>
                  <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Lieu</p>
                  <p className="text-gray-500 text-lg mt-1 font-medium">{news.lieu}</p>
                </div>
              )}
              {news.themes && (
                <div>
                  <p className="font-semibold text-primary-500 text-xs uppercase tracking-wider">Thèmes abordés</p>
                  <p className="text-gray-500 text-lg mt-1 font-medium">{news.themes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          {news.mainImage && (
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <img
                src={news.mainImage}
                alt={news.title || "Image de l'actualité"}
                className="
                  w-48 h-64
                  sm:w-56 sm:h-72
                  md:w-64 md:h-80
                  lg:w-72 lg:h-96
                  object-cover object-top
                  rounded-[0%_0%_40%_40%]
                  shadow-2xl
                "
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
