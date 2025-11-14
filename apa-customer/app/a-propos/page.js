import EngagementSection from "../components/a-propos/EngagementSection";
import MissionSection from "../components/a-propos/MissionSection";
import TeamSection from "../components/a-propos/TeamSection";
import HeroGeneral from "../components/HeroGeneral";
import PartnersSection from "../home/PartnersSection";

export default function APropos() {
  return (
    <div className="min-h-screen">
<HeroGeneral title="À propos" />
<MissionSection />
<TeamSection />
< PartnersSection />
<EngagementSection />                
    </div>
  );
}
