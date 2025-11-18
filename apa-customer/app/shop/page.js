"use client";;
import { useState } from "react";
import CardBoutique from "./CardBoutique";
import SearchBar from "./SearchBar";
import SidebarFilters from "./SidebarFilters";
import Pagination from "./Pagination";

export default function Home() {
  const [filters, setFilters] = useState({
    type: "all",
    language: "all",
    level: "all"
  });

  const handleApplyFilters = (newFilters) => setFilters(newFilters);
  const handleResetFilters = () =>
    setFilters({ type: "all", language: "all", level: "all" });

  return (
    <div className="flex min-h-screen">
      {/* SidebarFilters handles desktop & mobile internally */}
      <SidebarFilters onApply={handleApplyFilters} onReset={handleResetFilters} />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <SearchBar placeholder="Rechercher un article..." buttonText="Nouveauté" />

        {/* Content */}
        <div className="space-y-10 mt-6">
          <div className="flex  gap-6">
            <CardBoutique />
            <CardBoutique />
          </div>

          <div className="flex  gap-6">
            <CardBoutique />
            <CardBoutique />
          </div>
          <Pagination/>

        </div>
      </main>
    </div>
  );
}
