"use client";

import { useEffect, useState } from "react";
import HeroGeneral from "../components/HeroGeneral";
import ContactSection from "../components/ContactSection";
import AlaUne from "./A-la-une";
import TousActualites from "./tous-actualites";
import {NewsService} from "../services/newsService";

export default function Actualite() {
  const [actuALaUne, setActuALaUne] = useState(null); // première actualité
  const [autresActualites, setAutresActualites] = useState([]); // toutes les autres
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await NewsService.getAll(); // récupère toutes les actualités
        const allNews = response.data;

        if (allNews.length > 0) {
          setActuALaUne(allNews[0]); // première actualité
          setAutresActualites(allNews.slice(1)); // toutes les autres
        }
      } catch (err) {
        setError(err.message);
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!actuALaUne) return <p>Aucune actualité disponible</p>;

  return (
    <div className="min-h-screen">
      <HeroGeneral title="Nos actualités" />
      
      {/* Première actualité */}
      <AlaUne actu={actuALaUne} />

      {/* Toutes les autres actualités */}
      <TousActualites actualites={autresActualites} />

      <ContactSection />               
    </div>
  );
}
