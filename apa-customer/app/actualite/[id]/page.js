"use client";

import { useParams } from "next/navigation";
import  HeroSectionAct  from "./HeroSection";
import AproposActu from "./Apropos-actu";
import AutresActu from "./Autresactu";
import GalleryCarousel from "./gallerie";

const actualites = [
  { id: 1, titre: "Evenement A", 
    description1: "Un atelier créatif pour éveiller l'imagination des enfants autour de la lecture. Les participants découvriront nos nouvelles collections à travers des activités ludiques et interactives qui stimulent la créativité et le plaisir de lire.", 
    description2:"Cet atelier est conçu pour initier les enfants au monde merveilleux de la lecture à travers une approche créative et participative. Les enfants exploreront différents genres littéraires, créeront leurs propres histoires illustrées, et participeront à des jeux de rôle basés sur nos contes africains. Chaque participant repartira avec un livre cadeau et un certificat de participation.", 
    image: "/images/actualites/actualite1.png", 
    date: "2024-06-15" },
  { id: 2, titre: "Evenement B", description: "…", image: "/images/actualites/actualite1.png", date: "2024-06-15" },
  { id: 3, titre: "Evenement C", description: "…", image: "/images/actualites/actualite1.png", date: "2024-06-15" },
  { id: 4, titre: "Evenement A", description: "…", image: "/images/actualites/actualite1.png", date: "2024-06-15" },
  { id: 5, titre: "Evenement B", description: "…", image: "/images/actualites/actualite1.png", date: "2024-06-15" },
  { id: 6, titre: "Evenement C", description: "…", image: "/images/actualites/actualite1.png", date: "2024-06-15" },
];

export default function Page() {
  const { id } = useParams();
  const actu = actualites.find(a => a.id === Number(id));

  

  return (
    <div>
  <HeroSectionAct actu={actu} />
  <AproposActu actu={actu} />
  <GalleryCarousel />
  <AutresActu actu1={actualites[0]} actu2={actualites[1]} />
  

    </div>
);
}
