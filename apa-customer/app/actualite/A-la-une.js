import Link from "next/link";
import { Button } from "../components/ui/button"; // chemin vers ton bouton existant

export default function AlaUne({ actu }) {
  return (
    <section className="px-4 py-8 md:px-16">
      {/* Titre avec barre verticale */}
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-8 bg-primary-100 mr-3 rounded"></div>
        <h2 className="text-3xl text-primary-500 font-bold">À la une</h2>
      </div>

      {/* Carte image à gauche / texte à droite */}
      <div
  
  className="flex flex-col md:flex-row items-start rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white max-w-6xl mx-auto border border-black"

>
  {/* Image */}
  <div className="w-full md:w-1/2  h-64 lg:h-auto flex-shrink-0">
    <img
  src={actu.image}
  alt={actu.titre}
  className="w-full h-full sm:h-60 sm:w-120 md:w-full md:h-full object-cover object-center mx-auto rounded-xl sm:mt-3 md:mt-0"
/>

  </div>

  {/* Texte */}
  <div className="p-4 md:w-1/2 flex flex-col">
    <div>
      <h3 className="text-2xl font-bold mb-3 text-primary-500">
        {actu.titre}
      </h3>
      <p className=" text-gray-500  text-sm  lg:text-lg">
  {actu.description}
</p>
      <div className="flex flex-row mt-2 "><div className="flex flex-col justify-center mr-3">
  <div className="h-1 w-4 bg-primary-100 mb-1 rounded"></div>
  <div className="h-1 w-4 bg-primary-100 rounded"></div>
</div>
<p className="text-primary-300 text-sm">{actu.date}</p>
</div>
      
    </div>

    <Link
  href={`/actualite/${actu.id}`} className="mt-4">
      <Button className="rounded-full px-10 py-2 bg-primary-100 text-white pt-0 ">
        Lire la suite
      </Button>
    </Link>
  </div>
</div>

    </section>
  );
}
