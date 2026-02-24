"use client";

import { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { FilterService } from "../services/filterService";
import { useSearchParams } from "next/navigation";

export default function SidebarFilters({ onApply, onReset }) {
  const searchParams = useSearchParams();
  const [filtersConfig, setFiltersConfig] = useState([]);
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // Load filters from backend
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await FilterService.getActiveFrontend();
        if (res.success) {
          setFiltersConfig(res.data);

          // Initialize selected values from URL or defaults
          const initialSelected = {};
          res.data.forEach((f) => {
            const urlValue = searchParams.get(f.field);
            if (urlValue) {
              initialSelected[f.field] = f.uiType === "checkbox" ? [urlValue] : urlValue;
            } else {
              initialSelected[f.field] = f.uiType === "checkbox" ? [] : "all";
            }
          });
          setSelected(initialSelected);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des filtres :", err);
      }
    };
    fetchFilters();
  }, [searchParams]);

  const handleChange = (field, value, isCheckbox = false) => {
    if (isCheckbox) {
      // Toggle checkbox selection
      const current = selected[field] || [];
      let newSelected;
      if (current.includes(value)) {
        newSelected = current.filter((v) => v !== value);
      } else {
        newSelected = [...current, value];
      }
      setSelected((prev) => ({
        ...prev,
        [field]: newSelected.length ? newSelected : []
      }));
    } else {
      setSelected((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleApply = () => {
    onApply(selected);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetSelected = {};
    filtersConfig.forEach((f) => {
      resetSelected[f.field] =
        f.uiType === "checkbox" ? [] : "all";
    });
    setSelected(resetSelected);
    onReset();
    setIsOpen(false);
  };

  const renderFilters = () => (
    <div className="w-72 h-full p-5 bg-white shadow-xl rounded-xl space-y-6 overflow-y-auto relative z-[5000]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <FaFilter className="text-primary-500" /> Filtre
        </h2>
        <button className="md:hidden" onClick={() => setIsOpen(false)}>
          <FaTimes className="text-gray-600 text-xl" />
        </button>
      </div>

      {filtersConfig.map((filter) => (
        <FilterGroup
          key={filter.field}
          title={filter.label}
          options={filter.options || []}
          selected={selected[filter.field]}
          setSelected={(value) =>
            handleChange(filter.field, value, filter.uiType === "checkbox")
          }
          allLabel="Tous"
          name={filter.field}
          uiType={filter.uiType}
        />
      ))}

      <div className="flex flex-col gap-3 mt-8">
        <button
          className="w-full bg-primary-500 text-white py-2 rounded-full hover:bg-primary-600 transition"
          onClick={handleApply}
        >
          Affiner la recherche
        </button>
        <button
          className="w-full border border-primary-500 text-primary-500 py-2 rounded-full hover:bg-primary-50 transition"
          onClick={handleReset}
        >
          Annuler les filtres
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="md:hidden fixed bottom-5 right-5 z-[5001] bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition"
        onClick={() => setIsOpen(true)}
      >
        <FaFilter />
      </button>

      <div
        className={`md:hidden fixed inset-0 z-[5000] transition-all ${isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-[calc(100%-4rem)] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {renderFilters()}
        </div>
      </div>

      <div className="hidden md:block sticky top-4">{renderFilters()}</div>
    </>
  );
}

// Handles both single (radio) and multiple (checkbox) filters
function FilterGroup({ title, options, selected, setSelected, allLabel, name, uiType }) {
  const isCheckbox = uiType === "checkbox";

  if (isCheckbox) {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.length === 0}
              onChange={() => setSelected([])}
              className="accent-primary-500"
            />
            {allLabel}
          </label>
          {options.map((o) => (
            <label key={o} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(o)}
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

  // Radio (single selection)
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
