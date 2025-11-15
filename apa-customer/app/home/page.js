import CategoryExplorer from "@/app/home/CategoryExplorer"
import HeroSection from "@/app/home/HeroSection"
import LearningBanner from "@/app/home/LearningBanner"
import { NewReleases } from "./NewReleases"
import PartnersSection from "./PartnersSection"
import CardBoutique from "../shop/CardBoutique"
import CardDetails from "../shop/CardDetails"

export default function Home() {
  return (
    <>
      <HeroSection/>
      <NewReleases/>
      <CategoryExplorer />
      
      {/* Test Section - CardBoutique */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-primary-500 mb-8">Test du composant CardBoutique</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CardBoutique />
          <CardBoutique />
          <CardBoutique 
            title="Le Petit Prince"
            description="Un aviateur, exilé dans le désert du Sahara, y fait la rencontre d'un petit garçon venu d'ailleurs."
            
          />
        </div>
      </section>

      {/* Test Section - CardDetails */}
      <div className="flex justify-center px-6 py-12">
        <div className="w-full max-w-[70%]">
          <CardDetails />
        </div>
      </div>
      
      <LearningBanner />
      <PartnersSection/>
      
    </>
  )
}