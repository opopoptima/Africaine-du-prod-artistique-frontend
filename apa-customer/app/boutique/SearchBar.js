"use client";
import { useState } from "react";

export default function SearchBar({
  placeholder = "Rechercher...",
  isNewActive = false,
  onSearch,
  onToggleNew,
}) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    /* 1. Changed 'flex' to 'flex-col sm:flex-row' (stack on mobile)
       2. Changed 'space-x-2' to 'gap-3' for better spacing control
    */
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
      
      {/* Search input - takes full width on mobile */}
      <div className="relative w-full flex-1">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full border border-secondary-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:shadow transition"
        />
      </div>

      {/* Nouveauté toggle - full width on mobile, auto-width on desktop */}
      <button
        onClick={onToggleNew}
        className={`w-full sm:w-auto flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium border transition focus:outline-none focus:ring-2 focus:ring-primary-500 whitespace-nowrap
          ${
            isNewActive
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white text-primary-500 border-primary-500 hover:bg-primary-50"
          }
        `}
      >
        <span>{isNewActive ? "Tous les articles" : "Nouveauté"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isNewActive ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
