"use client";
import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const FILTERS = {
  type: ["Parascolaire", "Coloriage", "Coédition"],
  language: ["Français", "Anglais", "Arabe"],
  level: ["Petite section", "Moyenne section", "Grande section"]
};

export default function SidebarFilters({ onApply, onReset }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isOpen, setIsOpen] = useState(false); // toggle for mobile

  const handleApply = () => {
    onApply({
      type: selectedType,
      language: selectedLanguage,
      level: selectedLevel
    });
    setIsOpen(false); // close on mobile after apply
  };

  const handleReset = () => {
    setSelectedType("all");
    setSelectedLanguage("all");
    setSelectedLevel("all");
    onReset();
    setIsOpen(false); // close on mobile after reset
  };

  const renderFilters = () => (
    <div className="w-64 flex-shrink-0 p-4 md:p-6 border rounded-xl bg-white space-y-6 shadow-lg shadow-gray-400 h-[calc(100vh-2rem)] overflow-y-auto m-2 ">
      <h2 className="font-bold text-lg mb-2 flex items-center justify-between md:justify-start">
        <FaFilter className="text-primary-500 mr-2" /> Filtre
        <button className="md:hidden" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
      </h2>

      {/* Categories */}
      <FilterGroup
        title="Categories"
        options={FILTERS.type}
        selected={selectedType}
        setSelected={setSelectedType}
        allLabel="Tous les genres"
        name="type"
      />

      {/* Languages */}
      <FilterGroup
        title="Langue du livre"
        options={FILTERS.language}
        selected={selectedLanguage}
        setSelected={setSelectedLanguage}
        allLabel="Tous les langues"
        name="language"
      />

      {/* Levels */}
      <FilterGroup
        title="Niveau"
        options={FILTERS.level}
        selected={selectedLevel}
        setSelected={setSelectedLevel}
        allLabel="Tous les niveaux"
        name="level"
      />

      {/* Buttons */}
      <div className="flex flex-col space-y-2 mt-4">
        <button
          className="w-full bg-primary-300 border-2 text-secondary-100 border-primary-300 hover:bg-primary-500 hover:border-primary-500 py-2 px-4 rounded-full"
          onClick={handleApply}
        >
          Affiner la recherche
        </button>
        <button
          className="w-full bg-secondary-100 border-2 text-primary-300 border-primary-300 hover:bg-primary-300 hover:text-secondary-100 hover:border-primary-300 py-2 px-4 rounded-full"
          onClick={handleReset}
        >
          Annuler les filtres
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="md:hidden fixed bottom-4 right-4 bg-primary-500 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        <FaFilter />
      </button>

      {/* Sidebar / mobile drawer */}
      {isOpen ? (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden flex justify-end">
          {renderFilters()}
        </div>
      ) : (
        <div className="hidden md:block">{renderFilters()}</div>
      )}
    </>
  );
}

// Reusable filter group component
function FilterGroup({ title, options, selected, setSelected, allLabel, name }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 space-y-1">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="all"
            checked={selected === "all"}
            onChange={() => setSelected("all")}
            className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:bg-primary-500 checked:border-primary-500 focus:outline-none"
          />
          <span>{allLabel}</span>
        </label>
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
              className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:bg-primary-500 checked:border-primary-500 focus:outline-none"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
