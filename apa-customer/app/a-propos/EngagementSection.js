import IconCard from "../components/IconCard";

export default function EngagementSection() {
  const cards = [
    {
      imageSrc: "/images/engagement/inspiration.png",
      alt: "Inspiration",
      title: "Inspiration",
      description: "Puiser dans les histoires d’hier pour imaginer un avenir meilleur.",
    },
    {
      imageSrc: "/images/engagement/creation.png",
      alt: "Création",
      title: "Création",
      description: "Concevoir des livres faits pour être lus, manipulés, aimés et transmis.",
    },
    {
      imageSrc: "/images/engagement/impact.png",
      alt: "Impact",
      title: "Impact",
      description: "Contribuer à une société plus cultivée, créative et consciente.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-500)]">
            Notre engagement éducatif
          </h2>
          <p className="text-lg text-[var(--color-secondary-700)] mt-4 max-w-2xl mx-auto">
            Notre engagement repose sur la conviction que l'éducation est la clé de l'épanouissement et de la créativité des jeunes esprits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <IconCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}