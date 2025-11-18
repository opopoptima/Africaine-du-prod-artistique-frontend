"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Filtres statiques
const FILTERS = {
  language: ["Français", "Arabe", "Anglais"],
  type: ["Parascolaire", "Coloriage", "Coédition"],
  level: ["Préscolaire", "Primaire", "Collège", "Lycée"],
  collection: [
    { id: "c1", name: "Collection Maths" },
    { id: "c2", name: "Collection Lecture" },
    { id: "c3", name: "Collection Couleurs" }
  ]
};

// Articles statiques
const STATIC_ARTICLES = [
  { _id: "a1", title: "Maths Facile", language: "Français", type: "Parascolaire", level: "Primaire", collection: "c1" },
  { _id: "a2", title: "Coloriage Animaux", language: "Français", type: "Coloriage", level: "Préscolaire", collection: "c3" },
  { _id: "a3", title: "Science Fun", language: "Anglais", type: "Coédition", level: "Collège", collection: "c2" },
  { _id: "a4", title: "Lecture Express", language: "Français", type: "Parascolaire", level: "Primaire", collection: "c2" },
  { _id: "a5", title: "Arabic Basics", language: "Arabe", type: "Parascolaire", level: "Primaire", collection: "c1" }
];

export default function ArticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState(STATIC_ARTICLES);

  // Filtrage statique
  useEffect(() => {
    let filtered = STATIC_ARTICLES;

    FILTERS.language.forEach(key => {});
    // Filtrer selon l'URL
    const lang = searchParams.get("language");
    const type = searchParams.get("type");
    const level = searchParams.get("level");
    const collection = searchParams.get("collection");

    if (lang) filtered = filtered.filter(a => a.language === lang);
    if (type) filtered = filtered.filter(a => a.type === type);
    if (level) filtered = filtered.filter(a => a.level === level);
    if (collection) filtered = filtered.filter(a => a.collection === collection);

    setArticles(filtered);
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`/articles?${params.toString()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Liste des articles (Test)</h1>

      {/* Filtres */}
      <div className="flex gap-6 mb-6">

        {/* Langue */}
        <div>
          <label className="font-semibold">Langue</label>
          <select
            defaultValue={searchParams.get("language") || "all"}
            onChange={(e) => updateFilter("language", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Toutes</option>
            {FILTERS.language.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="font-semibold">Type</label>
          <select
            defaultValue={searchParams.get("type") || "all"}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Tous</option>
            {FILTERS.type.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Niveau */}
        <div>
          <label className="font-semibold">Niveau</label>
          <select
            defaultValue={searchParams.get("level") || "all"}
            onChange={(e) => updateFilter("level", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Tous</option>
            {FILTERS.level.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        {/* Collection */}
        <div>
          <label className="font-semibold">Collection</label>
          <select
            defaultValue={searchParams.get("collection") || "all"}
            onChange={(e) => updateFilter("collection", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Toutes</option>
            {FILTERS.collection.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

      </div>

      {/* Liste des articles */}
      <ul className="space-y-2">
        {articles.map(a => (
          <li key={a._id} className="p-3 border rounded">
            {a.title} — {a.language} — {a.type} — {a.level}
          </li>
        ))}
        {articles.length === 0 && <li>Aucun article trouvé</li>}
      </ul>
    </div>
  );
}
