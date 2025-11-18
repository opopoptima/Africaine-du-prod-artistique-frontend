import Link from "next/link";
import { Button } from "../../components/ui/button"; // chemin vers ton bouton existant
import { ArrowRight } from "lucide-react";


export default function ActualiteCard({ actu }) {
 return (

  <div
  className="block overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 
             bg-white max-w-sm w-full mx-auto mt-5"
>

    <img
      src={actu.image}
      alt={actu.titre}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl text-primary-500 font-bold mb-2">{actu.titre}</h3>
      <div className="flex ">
        <div>
        <p className="text-gray-600 text-sm mt-2">{actu.description}</p>
        <p className="text-primary-100 text-sm mt-2">{actu.date}</p>
       
      </div>
       <Link
  href={`/actualite/${actu.id}`} className=" position-relative mt-22">
      <Button className="rounded-full px-1 py-2 bg-primary-300 text-white pt-0   ">
        <ArrowRight size={16} />
      </Button>
    </Link>

      </div>
      
      
    </div>
  </div>
  
 );
}
