"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSectionAct from "./HeroSection";
import AproposActu from "./Apropos-actu";
import AutresActu from "./Autresactu";
import GalleryCarousel from "./gallerie";
import VideoSection from "./VideoSection";
import { NewsService } from "../../services/newsService";

export default function NewsDetail() {
  const { id } = useParams(); // récupère l'id depuis l'URL dynamique
  const [news, setNews] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Récupérer la news principale et les news liées en une seule fois (Backend optimisé)
        const response = await NewsService.getById(id);
        
        if (!response?.data?.success) {
          throw new Error(response?.data?.error || "News not found");
        }

        setNews(response.data.data);
        setOtherNews(response.data.related || []);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des actualités");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-500 font-semibold text-lg">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
      </div>
    );

  if (!news)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-semibold text-lg">Actualité introuvable</p>
      </div>
    );

  return (
    <div>
      {/* Section principale */}
      <HeroSectionAct news={news} />
      <AproposActu news={news} />
      <VideoSection videoUrl={news.videoUrl} />
      <GalleryCarousel images={news.galleryImages || news.images || []} />


      {/* Deux autres news */}
      {otherNews.length > 0 && (
        <AutresActu
          actu1={otherNews[0]}
          actu2={otherNews[1] || null}
          actu3={otherNews[2] || null} // safeguard if only 1 other news
        />
      )}
    </div>
  );
}
