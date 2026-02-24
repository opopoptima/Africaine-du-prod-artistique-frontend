import IconCard from "../components/IconCard";
export default function MissionSection() {
  const cards = [
    {
      imageSrc: "/images/MissionSection/Vector.png",
      alt: "Mission",
      title: "Mission",
      description:
        "Créer et diffuser des livres jeunesse accessibles, vivants et porteurs de sens.",
    },
    {
      imageSrc: "/images/MissionSection/Vision.png",
      alt: "Vision",
      title: "Vision",
      description: "Bâtir une édition jeunesse enracinée dans notre culture et ouverte sur le monde.",
    },
    {
      imageSrc: "/images/MissionSection/Mission.png",
      alt: "Valeurs",
      title: "Valeurs",
      description: "Transmission, créativité et engagement au service de l’enfant.",
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
