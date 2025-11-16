import IconCard from "@/app/components/IconCard";
export default function MissionSection() {
  const cards = [
    {
      imageSrc: "/images/MissionSection/Vector.png",
      alt: "Mission",
      title: "Mission",
      description:
        "Créer et diffuser des ouvrages éducatifs et artistiques pour éveiller la curiosité des enfants.",
    },
    {
      imageSrc: "/images/MissionSection/Vision.png",
      alt: "Vision",
      title: "Vision",
      description: "Devenir une référence de l'édition éducative moderne et inclusive.",
    },
    {
      imageSrc: "/images/MissionSection/Mission.png",
      alt: "Valeurs",
      title: "Valeurs",
      description: "Éducation, créativité, ouverture, excellence, passion.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <IconCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
