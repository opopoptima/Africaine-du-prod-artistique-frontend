"use client";
import { useState, useEffect, useMemo } from "react";
import CardBoutique from "./CardBoutique";
import SearchBar from "./SearchBar";
import SidebarFilters from "./SidebarFilters";
import Pagination from "./Pagination";
import BottomBanner from "./BottomBanner";
import HeroGeneral from "../components/HeroGeneral";
import { ArticleService } from "../services/articleService";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    language: "all",
    level: "all",
  });
  const [search, setSearch] = useState("");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      const activeFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          activeFilters[key] = value;
        }
      });

      // Backend filter (preferred)
      if (showNewOnly) {
        activeFilters.isNew = true;
      }

      try {
        const res = await ArticleService.getAll({
          page,
          limit,
          q: search,
          filters: activeFilters,
        });

        setArticles(res.data || []);
        setTotalPages(res.meta?.pages || 1);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setArticles([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters, search, page, showNewOnly]);

  // ✅ FRONTEND GUARANTEE
  const visibleArticles = useMemo(() => {
    if (!showNewOnly) return articles;
    return articles.filter((article) => article.isNew === true);
  }, [articles, showNewOnly]);

  return (
    <>
      <HeroGeneral title="Boutique" />

      <div className="flex min-h-screen">
        <SidebarFilters
          onApply={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
          onReset={() => {
            setFilters({ type: "all", language: "all", level: "all" });
            setPage(1);
          }}
        />

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <SearchBar
            placeholder="Rechercher un article..."
            isNewActive={showNewOnly}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onToggleNew={() => {
              setShowNewOnly((prev) => !prev);
              setPage(1);
            }}
          />

          <div className="space-y-10 mt-6">
            {loading ? (
              <p className="text-center">Chargement...</p>
            ) : visibleArticles.length === 0 ? (
              <p className="text-center text-gray-500">
                Aucun article trouvé
              </p>
            ) : (
              Array.from({
                length: Math.ceil(visibleArticles.length / 2),
              }).map((_, rowIndex) => (
                <div className="flex gap-6" key={rowIndex}>
                  {visibleArticles
                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                    .map((article) => (
                      <CardBoutique
                        key={article.id}
                        article={article}
                      />
                    ))}
                </div>
              ))
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </main>
      </div>

      <BottomBanner />
    </>
  );
}
