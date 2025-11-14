import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-[var(--color-primary-300)] max-w-[280px] mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/images/MissionSection/Vector.png"
                alt="Mission"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary-500)] mb-4">
              Mission
            </h3>
            <p className="text-[var(--color-secondary-700)] leading-relaxed">
              Créer et diffuser des ouvrages éducatifs et artistiques pour éveiller la curiosité des enfants.
            </p>
          </div>

          {/* Vision Card */}
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-[var(--color-primary-300)] max-w-[280px] mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/images/MissionSection/Vision.png"
                alt="Vision"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary-500)] mb-4">
              Vision
            </h3>
            <p className="text-[var(--color-secondary-700)] leading-relaxed">
              Devenir une référence de l'édition éducative moderne et inclusive.
            </p>
          </div>

          {/* Valeurs Card */}
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-[var(--color-primary-300)] max-w-[280px]  mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/images/MissionSection/Mission.png"
                alt="Valeurs"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary-500)] mb-4">
              Valeurs
            </h3>
            <p className="text-[var(--color-secondary-700)] leading-relaxed">
              Éducation, créativité, ouverture, excellence, passion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}