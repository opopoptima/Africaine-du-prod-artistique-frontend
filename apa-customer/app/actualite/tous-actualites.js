import ActualiteCard from "./components/actualite";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { NewsService } from "../services/newsService";

export default function TousActualites() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);
  const [showMore, setShowMore] = useState(false);

  // Récupérer les données du backend CENTRALISÉ
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await NewsService.getAll(); 
        const data = response.data;

        // Transformer les données de l'API vers le format attendu
        const transformedData = data.map((item) => ({
          id: item._id,
          titre: item.title,
          description: item.description,
          image:
            item.images && item.images.length > 0
              ? item.images[0]
              : "/images/actualites/default.png",
          date: new Date(item.eventDate).toISOString().split("T")[0],
        }));

        setActualites(transformedData);
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []);

  // Détecter la taille de l'écran
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width >= 768) setDisplayCount(3);
      else if (width >= 640) setDisplayCount(2);
      else setDisplayCount(1);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const visibleCategories = showMore
    ? actualites
    : actualites.slice(0, displayCount);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Chargement des actualités...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-8 bg-purple-500 mr-3 rounded ml-5 md:ml-10 lg:ml-17"></div>
        <h2 className="text-3xl font-bold text-primary-500">
          Toutes les actualités
        </h2>
      </div>

      {actualites.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">
            Aucune actualité disponible pour le moment.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-16 mb-16">
            {visibleCategories.map((actu) => (
              <ActualiteCard key={actu.id} actu={actu} />
            ))}
          </div>

          {!showMore && displayCount < actualites.length && (
            <div className="text-center mt-8 sm:mt-12">
              <Button
                size="lg"
                onClick={() => setShowMore(true)}
                className="bg-white text-primary-300 
                 border border-primary-300 
                 hover:bg-secondary-100 hover:text-primary-300 
                 px-8 sm:px-12 py-4 sm:py-6 
                 text-lg sm:text-xl rounded-full shadow-lg 
                 transition-all hover:shadow-xl hover:scale-105 mb-16"
              >
                Voir plus d'actualités
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
