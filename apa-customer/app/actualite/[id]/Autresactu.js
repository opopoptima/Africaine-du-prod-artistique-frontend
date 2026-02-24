import Link from "next/link";
import { Button } from "../../components/ui/button"
import ActualiteCard from "../components/actualite";

export default function AutresActu({ actu1, actu2, actu3 }) {
  const actuList = [actu1, actu2, actu3].filter(Boolean);

  if (actuList.length === 0) return null;

  return (
    <section className="px-4 py-12 md:px-16 max-w-7xl mx-auto">
      {/* On centre uniquement le titre */}
      <h2 className="text-center text-3xl md:text-5xl text-primary-500 font-bold mb-10 md:mb-16">
        Autres actualités
      </h2>

      {/* Grille sans text-center → le texte des cartes reste aligné à gauche */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
        {actuList.map((actu) => (
          <ActualiteCard key={actu._id} actu={actu} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/actualite">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 sm:px-12 py-6 text-lg rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
          >
            Voir plus
          </Button>
        </Link>
      </div>
    </section>
  );
}