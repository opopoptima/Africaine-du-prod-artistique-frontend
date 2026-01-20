import CategoryExplorer from "../home/CategoryExplorer"
import HeroSection from "../home/HeroSection"
import LearningBanner from "../home/LearningBanner"
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