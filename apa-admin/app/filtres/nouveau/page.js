"use client";

import { useRouter } from "next/navigation";
import FilterForm from "../FilterForm";

export default function NewFilterPage() {
  const router = useRouter();

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
                                      <span className="text-[#5B1E8C] font-semibold">Ajouter</span>
                                  </div>
                

      <FilterForm
        filter={null}
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
