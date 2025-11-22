"use client";
import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const FILTERS = {
  type: ["Parascolaire", "Coloriage", "Coédition"],
  language: ["Français", "Anglais", "Arabe"],
  level: ["Petite section", "Moyenne section", "Grande section"],
};

export default function SidebarFilters({ onApply, onReset }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply({
      type: selectedType,
      language: selectedLanguage,
      level: selectedLevel,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedType("all");
    setSelectedLanguage("all");
    setSelectedLevel("all");
    onReset();
    setIsOpen(false);
  };

  const renderFilters = () => (
    <div
      className="w-72 h-full p-5 bg-white shadow-xl rounded-xl
                 space-y-6 overflow-y-auto relative z-[5000]"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <FaFilter className="text-primary-500" />
          Filtre
        </h2>
        <button className="md:hidden" onClick={() => setIsOpen(false)}>
          <FaTimes className="text-gray-600 text-xl" />
        </button>
      </div>

      {/* Groups */}
      <FilterGroup
        title="Categories"
        options={FILTERS.type}
        selected={selectedType}
        setSelected={setSelectedType}
        allLabel="Tous les genres"
        name="type"
      />

      <FilterGroup
        title="Langue du livre"
        options={FILTERS.language}
        selected={selectedLanguage}
        setSelected={setSelectedLanguage}
        allLabel="Toutes les langues"
        name="language"
      />

      <FilterGroup
        title="Niveau"
        options={FILTERS.level}
        selected={selectedLevel}
        setSelected={setSelectedLevel}
        allLabel="Tous les niveaux"
        name="level"
      />

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-8">
        <button
          className="w-full bg-primary-500 text-white py-2 rounded-full
                     hover:bg-primary-600 transition"
          onClick={handleApply}
        >
          Affiner la recherche
        </button>

        <button
          className="w-full border border-primary-500 text-primary-500 py-2 
                     rounded-full hover:bg-primary-50 transition"
          onClick={handleReset}
        >
          Annuler les filtres
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating button */}
      <button
        className="md:hidden fixed bottom-5 right-5 z-[5001] bg-primary-500 text-white 
                   p-4 rounded-full shadow-lg hover:bg-primary-600 transition"
        onClick={() => setIsOpen(true)}
      >
        <FaFilter />
      </button>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[5000] transition-all
                    ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity
                      ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-[calc(100%-4rem)] 
                      transition-transform duration-300
                      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {renderFilters()}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-4">
        {renderFilters()}
      </div>
    </>
  );
}

function FilterGroup({ title, options, selected, setSelected, allLabel, name }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">{title}</h3>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={selected === "all"}
            onChange={() => setSelected("all")}
            className="accent-primary-500"
          />
          {allLabel}
        </label>

        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              checked={selected === o}
              onChange={() => setSelected(o)}
              className="accent-primary-500"
            />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}
