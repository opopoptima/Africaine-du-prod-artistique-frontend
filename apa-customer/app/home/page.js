import CategoryExplorer from "@/app/home/CategoryExplorer"
import HeroSection from "@/app/home/HeroSection"
import LearningBanner from "@/app/home/LearningBanner"
import { NewReleases } from "./NewReleases"
import PartnersSection from "./PartnersSection"
export default function Home() {
  return (
    <>
      <HeroSection/>
      <NewReleases/>
      <CategoryExplorer />
      
      <LearningBanner />
      <PartnersSection/>
    </>
  )
}