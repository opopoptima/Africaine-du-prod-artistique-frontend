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
    <div className="flex space-x-2 w-full mt-4">
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 border border-secondary-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:shadow transition"
      />

      {/* Nouveauté toggle */}
      <button
        onClick={onToggleNew}
        className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border transition focus:outline-none focus:ring-2 focus:ring-primary-500
          ${
            isNewActive
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white text-primary-500 border-primary-500 hover:bg-primary-50"
          }
        `}
      >
        {isNewActive ? "Tous les articles" : "Nouveauté"}
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${
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
