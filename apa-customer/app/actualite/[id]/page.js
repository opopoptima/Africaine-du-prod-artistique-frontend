"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSectionAct from "./HeroSection";
import AproposActu from "./Apropos-actu";
import AutresActu from "./Autresactu";
import GalleryCarousel from "./gallerie";
import {NewsService} from "../../services/newsService";

export default function NewsDetail() {
  const { id } = useParams(); // récupère l'id depuis l'URL dynamique
  const [news, setNews] = useState(null);
  const [otherNews, setOtherNews] = useState([]); // pour les deux autres news
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer la news principale
        const response = await NewsService.getById(id);
        setNews(response.data);

        // Récupérer toutes les news
        const allResponse = await NewsService.getAll();
        const others = allResponse.data
          .filter((item) => item._id !== id) // exclure la news courante
          .slice(0, 2); // prendre 2 autres actualités
        setOtherNews(others);
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!news) return <p>News not found</p>;

  return (
    <div>
      {/* Section principale */}
      <HeroSectionAct news={news} />
      <AproposActu news={news} />
      <GalleryCarousel  />

      {/* Deux autres news */}
      {otherNews.length >= 2 && (
        <AutresActu actu1={otherNews[0]} actu2={otherNews[1]} />
      )}
    </div>
  );
}
