import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function ActualiteCard({ actu }) {
  return (
    <Link href={`/actualite/${actu._id}`} className="group block">
      <article
        className="
          bg-white shadow-xl hover:shadow-2xl 
          transition-all duration-500 hover:-translate-y-3 
          border-2 border-gray-300
          aspect-square flex flex-col
        "
        style={{ borderRadius: 0 }}
      >
        {/* IMAGE : on utilise flex + grow pour qu’elle prenne le maximum possible */}
        <div className="relative flex-1 min-h-0 bg-gray-50">
          <img
            src={ "/images/actualites/actualite1.png"}
            alt={actu.title}
            className="w-full h-full object-cover"
            style={{ borderRadius: 0 }}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* TEXTE + DATE + BOUTON : hauteur fixe raisonnable */}
        <div className="p-5 flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-bold text-primary-500 text-base leading-tight line-clamp-2">
              {actu.title}
            </h3>
            <p className="text-gray-600 text-xs mt-2 line-clamp-2">
              {actu.description}
            </p>
          </div>

          {/* Toujours visible, même sur très petit écran */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-primary-100 text-xs font-medium">
              <Calendar size={14} />
              <span className="truncate">{actu.eventDate}</span>
            </span>

            {/* Cercle parfait */}
            <div className="w-11 h-11 bg-primary-300 rounded-full flex items-center justify-center group-hover:bg-primary-500 hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0">
              <ArrowRight size={20} strokeWidth={3} className="text-white" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}