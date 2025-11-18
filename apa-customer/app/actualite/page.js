"use client";
import HeroGeneral from "../components/HeroGeneral";
import ContactSection from "../components/ContactSection";
import AlaUne from "./A-la-une";
import TousActualites from "./tous-actualites";

const actualites = [
  {
    id: 1,
    titre: "Lancement de notre nouvelle collection parascolaire",
    description: "Découvrez notre toute nouvelle collection de livres parascolaires conçus pour accompagner les élèves du primaire dans leur apprentissage. Des contenus riches, colorés et adaptés au programme sénégalais",
    image: "/images/actualites/actualite1.png",
    date: "2024-06-15"
  },
]

export default function Actualite() {
  const actuALaUne = actualites[0];
  

  return (
    <div className="min-h-screen">
      <HeroGeneral title="Nos actualités" />
      <AlaUne actu={actuALaUne} />
      <TousActualites />
      
      <ContactSection/>               
    </div>
  );
}