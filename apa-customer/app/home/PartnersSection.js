const partners = [
  {
    name: "iTravel Fitness",
    logo: "iTravel",
    color: "text-purple-600",
    style: "italic font-light"
  },
  {
    name: "Octane Fitness",
    logo: "Octane",
    color: "text-purple-700",
    style: "font-bold italic"
  },
  {
    name: "LA Fitness",
    logo: "LA Fitness",
    color: "text-blue-900",
    style: "font-black italic"
  },
  {
    name: "Smile",
    logo: "Smile",
    color: "text-purple-500",
    style: "font-bold"
  },
  {
    name: "TRUE Fitness",
    logo: "TRUE",
    color: "text-orange-500",
    style: "font-black"
  },
  {
    name: "CYBEX",
    logo: "CYBEX",
    color: "text-gray-900",
    style: "font-black italic"
  },
  {
    name: "Nautilus",
    logo: "Nautilus",
    color: "text-purple-600",
    style: "italic font-semibold"
  },
  {
    name: "PRECOR",
    logo: "PRECOR",
    color: "text-gray-800",
    style: "font-black"
  },
];

const PartnersSection = () => {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600">
            Nos partenaires
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Nous collaborons avec des institutions de confiance
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 sm:p-8 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-200"
            >
              <div className="text-center">
                <p className={`text-xl sm:text-2xl md:text-3xl ${partner.style} ${partner.color} transition-transform duration-300 hover:scale-110`}>
                  {partner.logo}
                </p>
                <p className="mt-2 text-sm sm:text-base text-gray-500">
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
