"use client";

import { useEffect, useState } from "react";
import HeroGeneral from "../components/HeroGeneral";
import ContactSection from "../components/ContactSection";
import AlaUne from "./A-la-une";
import TousActualites from "./tous-actualites";
import { NewsService } from "../services/newsService";

export default function Actualite() {
  const [actuALaUne, setActuALaUne] = useState(null);
  const [autresActualites, setAutresActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchActualites();
  }, [currentPage]);

  const fetchActualites = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await NewsService.getAll({
        page: currentPage,
        limit: itemsPerPage,
        sort: "createdAt:desc",
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || "Failed to fetch news");
      }

      const { featured = null, items = [] } = response.data.data || {};
      const meta = response.data.meta || {};

      // ⭐ À la une only on first page
      setActuALaUne(currentPage === 1 ? featured : null);

      // 📃 Autres actualités
      setAutresActualites(Array.isArray(items) ? items : []);

      // Pagination info
      setTotalPages(meta.pages || 1);
      setTotalItems(meta.total || 0);

    } catch (err) {
      console.error("Erreur lors du chargement des actualités:", err);
      setError(err.message || "Erreur lors du chargement des actualités");
      setActuALaUne(null);
      setAutresActualites([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Loading state
  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-primary-500 font-semibold text-lg">
            Chargement des actualités...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        <HeroGeneral title="Nos actualités" />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-500 font-semibold text-xl">{error}</p>
        </div>
        <ContactSection />
      </div>
    );
  }

  // No news state
  if (!loading && !actuALaUne && (!autresActualites || autresActualites.length === 0)) {
    return (
      <div className="min-h-screen">
        <HeroGeneral title="Nos actualités" />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 font-semibold text-xl">
            Aucune actualité disponible pour le moment
          </p>
        </div>
        <ContactSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroGeneral title="Nos actualités" />

      {/* ⭐ À la une (only on first page) */}
      {actuALaUne && currentPage === 1 && <AlaUne actu={actuALaUne} />}

      {/* 📃 Autres actualités */}
      {autresActualites && autresActualites.length > 0 && (
        <TousActualites
          actualites={autresActualites}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      )}

      <ContactSection />
    </div>
  );
}
