import { Button } from "@/app/components/ui/button"
import Header from "@/app/components/Header"
import CategoryExplorer from "@/app/home/CategoryExplorer"
import HeroSection from "@/app/home/HeroSection"
import LearningBanner from "@/app/home/LearningBanner"
export default function Home() {
  return (
    <div >
      <Header />
      <CategoryExplorer />
    <HeroSection></HeroSection>
    <LearningBanner />
    
    </div>
  )
}