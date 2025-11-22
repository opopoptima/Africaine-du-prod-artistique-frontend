import ContactSection from '@/app/components/ContactSection';
import CardDetail from './CardDetails';
import QuantityOrder from './QuantityOrder';
import Image from "next/image";
import CardBoutique from '../CardBoutique';

export default function BookPage({ params }) {
  const { id } = params;

  // Ici tu peux récupérer les données réelles via API ou un tableau local
  const bookData = {
    id,
    title: `Livre n°${id}`,
    author: "Auteur Exemple",
    price: "19.99",
    originalPrice: "29.99",
    description: "Description détaillée du livre...",
    objectives: "Objectifs pédagogiques...",
    imageSrc: "/images/learningBanner/Imageone for two LearningBanner.jpg"
  };
  const products = [
  {
    id: "book-1",
    title: "The Secret Garden",
    description: "Un classique intemporel pour petits et grands.",
    imageSrc: "/images/learningBanner/Image threefor LearningBanner.jpg",
  },
  {
    id: "book-2",
    title: "Les Contes de l'Afrique",
    description: "Découvrez la richesse des contes africains.",
    imageSrc: "/images/learningBanner/Imageone for two LearningBanner.jpg",
  },
];


  return (
  <>
    <section className="relative h-auto overflow-hidden">
          
          {/* Background Image with Opacity */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/heroSection/heroSectionImageBackground.jpg"
              alt="Hero Background"
              fill
              className="object-cover opacity-30"
              priority
              quality={90}
            />
          </div>
    
          {/* Gradient Overlay: 70% white, 30% purple - Même que HeroSection */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/70 via-white/0 to-[var(--color-primary-300)]/50" />
    
          {/* CONTENT */}
          <div className="relative z-10 container w-full">
    
           
            <CardDetail {...bookData} />
            <QuantityOrder />

            
          </div>
        </section>
        
        <div className="space-y-10 my-8">
          <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-primary-500 leading-snug justify-center text-center">
                Produits similaires</h2>
            {/** Affiche les cartes en 2 par 2 **/}
            {Array.from({ length: Math.ceil(products.length / 2) }).map((_, rowIndex) => (
              <div className="flex gap-6" key={rowIndex}>
                {products
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((product) => (
                    <CardBoutique
                      key={product.id}
                      id={product.id} 
                      title={product.title}
                      description={product.description}
                      imageSrc={product.imageSrc}
                    />
                  ))}
              </div>
            ))}

          </div>




  <ContactSection />
  </>
  );
}
