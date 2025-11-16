import EngagementSection from "./EngagementSection";
import MissionSection from "./MissionSection";
import TeamSection from "./TeamSection";
import HeroGeneral from "../components/HeroGeneral";
import PartnersSection from "../home/PartnersSection";
import ContactSection from "../components/ContactSection";

export default function APropos() {
  return (
    <div className="min-h-screen">
      <HeroGeneral title="À propos" />
      <MissionSection />
      <TeamSection />
      < PartnersSection />
      <EngagementSection /> 
      <ContactSection/>               
    </div>
  );
}
