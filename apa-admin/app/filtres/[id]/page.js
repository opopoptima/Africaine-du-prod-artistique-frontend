"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import FilterForm from "../FilterForm";
import FilterService from "../../services/filterService";

export default function EditFilterPage() {
  const router = useRouter();
  const { id } = useParams();

  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await FilterService.getById(id);
        setFilter(res.data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!filter) return <p>Filtre introuvable</p>;

  return (
     <div className="w-full px-12 py-10">
      <div className="text-sm text-gray-600">
                                      <a href="/dashboard" className="hover:text-[#5B1E8C]">
                                          Dashboard
                                      </a>{" "}
                                      {"> "}
                                      <a href="/filtres" className="hover:text-[#5B1E8C]">
                                          Filtres
                                      </a>{" "}
                                      {"> "}
                                      <span className="text-[#5B1E8C] font-semibold">Modifier</span>
                                  </div>

      <FilterForm
        filter={filter}
        onCancel={() => router.push("/filtres")}
        onSuccess={() => router.push("/filtres")}
      />

      <footer className="bg-[#9B59B680] mt-30 py-3 text-right  ">
          <p className="text-primary-500 font-semibold text-lg pr-15">
            Optimisez l’organisation de votre catalogue en gérant les filtres disponibles !
          </p>
        </footer>
    </div>
    
  );
}
