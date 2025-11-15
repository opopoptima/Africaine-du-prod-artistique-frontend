import Contact from "./Contact";
import Map from "./Carte";
import ContactInfos from "./contactInfo";
import HeroGeneral from "../components/HeroGeneral";

export default function ContactPage() {
  return (<div>
      <HeroGeneral title="Contactez-Nous" />
      <Contact />
      <div className="max-w-6xl mx-auto px-4 py-16">

      <div className="flex flex-col md:flex-row items-start gap-12">

        {/* MAP */}
        <div className="md:w-2/3 w-full">
          <Map />
        </div>

        {/* INFO */}
        <div className="md:w-1/3 w-full mt-10">
          <ContactInfos />
        </div>

      </div>

    </div>
    </div>
  );
}

