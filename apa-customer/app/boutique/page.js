"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import CardBoutique from "./CardBoutique";
import SearchBar from "./SearchBar";
import SidebarFilters from "./SidebarFilters";
import Pagination from "./Pagination";
import BottomBanner from "./BottomBanner";
import HeroGeneral from "../components/HeroGeneral";
import { ArticleService } from "../services/articleService";
import { useSearchParams } from "next/navigation";

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      if (key === "q") setSearch(value);
      else if (key === "isNew") setShowNewOnly(value === "true");
      else params[key] = value;
    });
    if (Object.keys(params).length > 0) {
      setFilters(params);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      const activeFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        // Only add non-empty filters and exclude "all" defaults
        const isValidValue = Array.isArray(value) ? value.length > 0 : (value && value !== "all");
        if (isValidValue) {
          activeFilters[key] = value;
        }
      });

      if (showNewOnly) activeFilters.isNew = true;

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

  const visibleArticles = useMemo(() => {
    if (!showNewOnly) return articles;
    return articles.filter((article) => article.isNew === true);
  }, [articles, showNewOnly]);

  return (
    <>
      <HeroGeneral title="Boutique" />

      <div className="flex flex-col md:flex-row min-h-screen container mx-auto px-4 py-8 gap-8">
        <SidebarFilters
          onApply={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
          onReset={() => {
            setFilters({});
            setPage(1);
          }}
        />

        <main className="flex-1 overflow-x-hidden">
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

          <div className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : visibleArticles.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Aucun article trouvé</p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {visibleArticles.map((article) => (
                  <CardBoutique key={article.id} article={article} />
                ))}
              </div>
            )}

            <div className="mt-12">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </main>
      </div>

      <BottomBanner />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-primary-500 animate-pulse">Chargement de la boutique...</p>
      </div>
    }>
      <BoutiqueContent />
    </Suspense>
  );
}
