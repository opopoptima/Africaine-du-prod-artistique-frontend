import Image from "next/image";

export default function HeroSectionAct({ actu }) {
  return (
    <div className="relative w-full md:flex items-center justify-between  px-6 md:px-16 md:pb-10  shadow-md overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src="/images/heroSection/heroSectionImageBackground.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
      </div>

      {/* Violet overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-l from-primary-500/50 to-transparent"></div>


      {/* Contenu */}
      <div className="relative z-10 w-full flex flex-col-reverse mb-5  md:items-center md:flex-row md:justify-between">
        
        {/* Texte à gauche */}
        <div className="md:w-1/2 space-y-4 ">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-500">
            {actu.titre}
          </h1>

          <p className="text-black-200">
            {actu.sousTitre || "The event features renowned influencers and innovators shaping trends and driving creativity across various industries."}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm mt-6">
            <div>
              <p className="font-semibold text-primary-500">Date et heure</p>
              <p className="text-gray-500">{actu.date || "10/11/2025"}</p>
            </div>
            <div>
              <p className="font-semibold text-primary-500">Public concerné</p>
              <p className="text-gray-500">{actu.public || "Enseignants du primaire"}</p>
            </div>

            <div>
              <p className="font-semibold text-primary-500">Lieu</p>
              <p className="text-gray-500">{actu.lieu || "Centre de Formation de Dakar"}</p>
            </div>
            <div>
              <p className="font-semibold text-primary-500">Thèmes abordés</p>
              <p className="text-gray-500">{actu.themes || "Méthodes d’enseignement"}</p>
            </div>
          </div>
        </div>

        {/* Image à droite */}
        <div className="md:w-1/2 flex justify-center pt-0 mb-0  md:mt-0">
          <img
            src={actu.image}
            alt={actu.titre}
            className="w-56 h-56
    sm:w-64 sm:h-64
    md:w-72 md:h-72
    lg:w-80 lg:h-80
    xl:w-96 xl:h-116 object-cover rounded-[0%_0%_40%_40%] shadow-lg"
          />
        </div>

      </div>
    </div>
  );
}
