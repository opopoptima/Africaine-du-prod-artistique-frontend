"use client";
import { useState } from "react";

const SearchBar = ({ placeholder = "Rechercher...", buttonText = "Nouveauté", onSearch, onButtonClick }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className="flex  space-x-2 w-full  mt-4">
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 border border-secondary-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:shadow transition"
      />

      {/* Button beside it */}
      <button
        onClick={handleButtonClick}
        className="flex-shrink-0 flex items-center justify-center bg-white border border-primary-500 text-primary-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
      >
        {buttonText}
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
