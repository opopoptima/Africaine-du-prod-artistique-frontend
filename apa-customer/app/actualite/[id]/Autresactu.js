import ActualiteCard from "../components/actualite";

export default function AutresActu({ actu1, actu2 }) {
  const actuList = [actu1, actu2].filter(Boolean);

  if (actuList.length === 0) return null;

  return (
    <section className="px-4 py-12 md:px-16 max-w-7xl mx-auto">
      {/* On centre uniquement le titre */}
      <h2 className="text-center text-3xl md:text-5xl text-primary-500 font-bold mb-10 md:mb-16">
        Autres actualités
      </h2>

      {/* Grille sans text-center → le texte des cartes reste aligné à gauche */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
        {actuList.map((actu) => (
          <ActualiteCard key={actu._id} actu={actu} />
        ))}
      </div>
    </section>
  );
}