import Image from "next/image";

export default function EngagementSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Titre principal */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-500)]">
            Notre engagement éducatif
          </h2>
          <p className="text-lg text-[var(--color-secondary-700)] mt-4 max-w-2xl mx-auto">
            Notre engagement repose sur la conviction que l'éducation est la clé de l'épanouissement et de la créativité des jeunes esprits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Inspiration Card */}
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-[var(--color-primary-300)] min-w-[280px] mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/images/engagement/inspiration.png"
                alt="Inspiration"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary-500)] mb-4">
              Inspiration
            </h3>
            <p className="text-[var(--color-secondary-700)] leading-relaxed">
              Des livres qui éveillent la curiosité
            </p>
          </div>

          {/* Création Card */}
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-[var(--color-primary-300)] min-w-[280px] mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/images/engagement/creation.png"
                alt="Création"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary-500)] mb-4">
              Création
            </h3>
            <p className="text-[var(--color-secondary-700)] leading-relaxed">
              Une approche artistique et ludique
            </p>
          </div>

          {/* Impact Card */}
          <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-[var(--color-primary-300)] min-w-[280px] mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/images/engagement/impact.png"
                alt="Impact"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary-500)] mb-4">
              Impact
            </h3>
            <p className="text-[var(--color-secondary-700)] leading-relaxed">
              Un apprentissage durable et inclusif
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}