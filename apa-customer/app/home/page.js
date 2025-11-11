import { Button } from "@/app/components/ui/button"
import LearningBanner from "./LearningBanner"
import HeroSection from "./HeroSection"
export default function Home() {
  return (
    <>
    <div className="bg-primary-500 p-4 text-accent-100">

      <Button>Click me </Button>
      
    </div>
    <HeroSection></HeroSection>
    <LearningBanner />
    
    </>
  )
}