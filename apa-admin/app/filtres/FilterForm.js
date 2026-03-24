"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { useToast } from "@/app/context/ToastContext";

// All available filterable fields
const FILTERABLE_FIELDS = [
  { field: "language", label: "Langue" },
  { field: "type", label: "Type" },
  { field: "schoolLevel", label: "Niveau scolaire" },
  { field: "author", label: "Auteur" },
  { field: "publisher", label: "Maison d'édition" },
  { field: "collection", label: "Collection" },
  { field: "category", label: "Catégorie" },
  { field: "subCategory", label: "Sous-catégorie" },
  { field: "price", label: "Prix" }
];

export default function FilterForm({ filter, onSuccess, onCancel }) {
  const isEdit = Boolean(filter);
  const toast = useToast();
  const [existingFilters, setExistingFilters] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const [form, setForm] = useState(() =>
    filter
      ? {
        field: filter.field,
        label: filter.label,
        uiType: filter.uiType ?? "checkbox",
        order: filter.order ?? 0,
        isActive: filter.isActive ?? true,
        options: filter.options || []
      }
      : {
        field: "",
        label: "",
        uiType: "checkbox",
        order: 0,
        isActive: true,
        options: []
      }
  );

  // Load existing filters
  useEffect(() => {
    if (!isEdit) {
      const loadExistingFilters = async () => {
        setLoadingFilters(true);
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${API_URL}/filter-configs`);
          const result = await response.json();
          setExistingFilters(result.data || []);
        } catch (err) {
          console.error("Erreur lors du chargement des filtres:", err);
        } finally {
          setLoadingFilters(false);
        }
      };
      loadExistingFilters();
    }
  }, [isEdit]);

  // Auto-fill label when field is selected
  useEffect(() => {
    if (form.field && !isEdit) {
      const selectedField = FILTERABLE_FIELDS.find(f => f.field === form.field);
      if (selectedField && !form.label) {
        setForm(prev => ({ ...prev, label: selectedField.label }));
      }

      // Load options from backend
      const loadOptions = async () => {
        setLoadingOptions(true);
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${API_URL}/filter-configs/active/frontend`);
          const result = await response.json();
          if (result.success) {
            const fieldData = result.data.find(f => f.field === form.field);
            if (fieldData) {
              setForm(prev => ({ ...prev, options: fieldData.values || [] }));
            }
          }
        } catch (err) {
          console.error("Erreur lors du chargement des options :", err);
        } finally {
          setLoadingOptions(false);
        }
      };
      loadOptions();
    }
  }, [form.field, isEdit]);

  // Available fields
  const getAvailableFields = () => {
    if (isEdit) return FILTERABLE_FIELDS;
    const usedFields = new Set(existingFilters.map(f => f.field));
    return FILTERABLE_FIELDS.filter(f => !usedFields.has(f.field));
  };
  const availableFields = getAvailableFields();

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleOptionChange = (index, value) => {
    setForm(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  const addOption = () => setForm(prev => ({ ...prev, options: [...prev.options, ""] }));
  const removeOption = index => setForm(prev => {
    const newOptions = prev.options.filter((_, i) => i !== index);
    return { ...prev, options: newOptions };
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = isEdit
        ? `${API_URL}/filter-configs/${filter._id}`
        : `${API_URL}/filter-configs`;

      const response = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || "Erreur lors de la sauvegarde du filtre");
      }

      toast.success(isEdit ? "Filtre mis à jour avec succès !" : "Filtre créé avec succès !");
      onSuccess();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la sauvegarde du filtre : " + err.message);
    }
  };

  return (
    <div className="w-full px-12 py-10">
      <h1 className="text-2xl font-semibold text-primary-500 mb-6">
        {isEdit ? "Modifier le filtre" : "Créer un nouveau filtre"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-[#9B59B61A] rounded-xl p-8 space-y-6">
        {/* Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Champ filtrable *</label>
          <Select
            value={form.field}
            onValueChange={v => handleChange("field", v)}
            disabled={isEdit || loadingFilters}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={loadingFilters ? "Chargement..." : "Sélectionner un champ"} />
            </SelectTrigger>
            <SelectContent>
              {availableFields.length > 0 ? (
                availableFields.map(f => (
                  <SelectItem key={f.field} value={f.field}>
                    {f.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>Aucun champ disponible</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Label */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Nom affiché *</label>
          <Input
            value={form.label}
            onChange={e => handleChange("label", e.target.value)}
            placeholder="Ex : Langue du livre"
            required
          />
        </div>

        {/* UI Type */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Type d'affichage *</label>
          <Select value={form.uiType} onValueChange={v => handleChange("uiType", v)}>
            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="checkbox">Cases à cocher</SelectItem>
              <SelectItem value="radio">Boutons radio</SelectItem>
              <SelectItem value="range">Intervalle numérique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Options for checkbox/radio */}
        {(form.uiType === "checkbox" || form.uiType === "radio") && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Valeurs disponibles</label>
            {loadingOptions ? (
              <p className="text-gray-500 text-sm">Chargement des options...</p>
            ) : (
              form.options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={opt}
                    onChange={e => handleOptionChange(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="bg-white"
                  />
                  <Button type="button" variant="outline" onClick={() => removeOption(i)}>Supprimer</Button>
                </div>
              ))
            )}
            <Button type="button" onClick={addOption}>Ajouter une option</Button>
          </div>
        )}

        {/* Order */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Ordre d'affichage</label>
          <Input
            type="number"
            min={0}
            value={form.order}
            onChange={e => handleChange("order", Number(e.target.value))}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Statut *</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" checked={form.isActive} onChange={() => handleChange("isActive", true)} className="accent-primary-500" />
              Actif
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" checked={!form.isActive} onChange={() => handleChange("isActive", false)} className="accent-primary-500" />
              Désactivé
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
          <Button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white"
            disabled={!form.field || !form.label || (availableFields.length === 0 && !isEdit)}
          >
            {isEdit ? "Enregistrer" : "Créer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
