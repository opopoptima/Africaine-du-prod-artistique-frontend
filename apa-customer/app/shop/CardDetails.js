import Image from "next/image";
import { IoPlay, IoVolumeHigh, IoEyeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "../components/ui/button";

const defaultSpecs = [
  { label: "ISBN", book1: "979-3-1264-5678-9", book2: "978-1-2345-6789-0" },
  { label: "Niveau scolaire", book1: "CE1 - CM2", book2: "CE2 - CM1" },
  { label: "Dimensions", book1: "21 x 28 cm", book2: "19 x 26 cm" },
  { label: "Pages", book1: "84", book2: "96" },
];

const defaultBookTitles = {
  first: "Les Contes de l'Afrique",
  second: "Mythes d'Afrique Moderne"
};

export default function CardDetail({
  author = "JANE AUSTIN",
  title = "Les Contes de l'Afrique",
  price = "19.99",
  originalPrice = "29.99",
  description =
    "Ce livre rassemble les plus beaux contes traditionnels d'Afrique, transmis de génération en génération. Chaque histoire est soigneusement illustrée et adaptée pour captiver l'imagination des jeunes lecteurs, tout en préservant l'authenticité et la richesse culturelle de ces récits ancestraux.",
  objectives =
    "Développer l'imagination, transmettre les valeurs culturelles africaines et enrichir le vocabulaire.",
  audioDuration = "0:65",
  imageSrc = "/images/learningBanner/Imageone for two LearningBanner.jpg",
  specs = defaultSpecs,
  bookTitles = defaultBookTitles,
}) {
  return (
    <section className="w-full bg-white rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-12 xl:gap-16 p-4 md:p-5 lg:p-8 items-center">
        {/* Cover - centered and larger, taking 70% of card height */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-[280px] lg:max-w-[350px] aspect-3/4 overflow-hidden rounded-lg group cursor-pointer">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 280px"
              priority
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/60 transition-all duration-300">
              {/* Aperçu text above the band */}
              <div className="absolute bottom-[120px] left-0 right-0 h-10 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-lg font-semibold text-white">Aperçu</p>
              </div>
              {/* Bottom band with eye icon */}
              <div className="absolute bottom-15 left-0 right-0 bg-primary-300 h-12 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IoEyeOutline className="size-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 lg:space-y-4">
          <div className="space-y-1.5 lg:space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-500">
              {author}
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-primary-500">
              {title}
            </h2>
            <div className="flex items-baseline gap-2 lg:gap-3">
              {originalPrice && (
                <span className="text-secondary-700 line-through text-sm lg:text-base">
                  ${originalPrice}
                </span>
              )}
              <span className="text-xl md:text-2xl lg:text-3xl font-black text-primary-100">
                ${price}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 lg:space-y-2">
            <h3 className="text-base lg:text-lg font-semibold text-primary-300">
              Présentation et Résumé
            </h3>
            <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">
              {description}
            </p>

            {/* Audio player */}
            <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-100 rounded-lg">
              <button className="size-7 lg:size-8 rounded-full bg-primary-300 text-white flex items-center justify-center hover:bg-primary-500 transition-colors">
                <IoPlay className="size-3 lg:size-4" />
              </button>
              <div className="flex items-center gap-1.5 lg:gap-2 text-secondary-700 text-xs lg:text-sm rounded-full">
                <div className="flex gap-0.5">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-0.5 h-2.5 lg:h-3 bg-secondary-700 rounded-full" />
                  ))}
                </div>
                <span className="font-medium text-xs lg:text-sm">{audioDuration}</span>
                <button className="ml-0.5 lg:ml-1">
                  <IoVolumeHigh className="size-3.5 lg:size-4 text-secondary-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 lg:space-y-2">
            <h3 className="text-base lg:text-lg font-semibold text-primary-300">
              Objectifs pédagogiques
            </h3>
            <p className="text-xs md:text-sm text-secondary-700 leading-relaxed">
              {objectives}
            </p>
          </div>

          {/* Specs Table - Horizontal layout matching reference */}
          <div className="rounded-lg lg:rounded-xl border border-primary-300/50 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-white">
                  <th className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm border-r border-primary-300/30">
                    ISBN
                  </th>
                  <th className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm border-r border-primary-300/30">
                    Niveau scolaire
                  </th>
                  <th className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm border-r border-primary-300/30">
                    Dimensions
                  </th>
                  <th className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center font-bold text-primary-500 text-xs lg:text-sm">
                    Pages
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#9B59B633' }}>
                  <td className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm border-r border-primary-300/30">
                    {specs[0].book1}
                  </td>
                  <td className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm border-r border-primary-300/30">
                    {specs[1].book1}
                  </td>
                  <td className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm border-r border-primary-300/30">
                    {specs[2].book1}
                  </td>
                  <td className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-center text-secondary-900 font-medium text-xs lg:text-sm">
                    {specs[3].book1}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div className="flex flex-wrap gap-3 pt-2">
            <Button className="bg-primary-300 text-white hover:bg-primary-500 px-5 py-2 rounded-full text-base transition-colors">
              <IoCartOutline className="mr-2 size-5" />
              Ajouter au panier
            </Button>
            <Button variant="outline" className="rounded-full border-2 border-primary-300 text-primary-500 hover:bg-primary-300/10 px-5 py-2 text-base transition-colors">
              Télécharger un extrait
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
