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

import FilterService from "../services/filterService";

const FILTERABLE_FIELDS = [
  { field: "language", label: "Langue" },
  { field: "type", label: "Type" },
  { field: "schoolLevel", label: "Niveau scolaire" },
  { field: "author", label: "Auteur" },
  { field: "publisher", label: "Maison d'édition" },
  { field: "price", label: "Prix" }
];

export default function FilterForm({ filter, onSuccess, onCancel }) {
  const isEdit = Boolean(filter);
  const [existingFilters, setExistingFilters] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);

  const [form, setForm] = useState(() =>
    filter
      ? {
          field: filter.field,
          label: filter.label,
          uiType: filter.uiType ?? "checkbox",
          order: filter.order ?? 0,
          isActive: filter.isActive ?? true
        }
      : {
          field: "",
          label: "",
          uiType: "checkbox",
          order: 0,
          isActive: true
        }
  );

  // Charger les filtres existants pour exclure les champs déjà utilisés
  useEffect(() => {
    if (!isEdit) {
      const loadExistingFilters = async () => {
        setLoadingFilters(true);
        try {
          const res = await FilterService.getAll();
          setExistingFilters(res.data || []);
        } catch (err) {
          console.error("Erreur lors du chargement des filtres:", err);
        } finally {
          setLoadingFilters(false);
        }
      };
      loadExistingFilters();
    }
  }, [isEdit]);

  // Filtrer les champs disponibles (exclure ceux déjà utilisés)
  const getAvailableFields = () => {
    if (isEdit) {
      // En mode édition, on affiche tous les champs (le champ actuel est déjà sélectionné)
      return FILTERABLE_FIELDS;
    }
    
    // En mode création, on exclut les champs déjà utilisés
    const usedFields = new Set(existingFilters.map(f => f.field));
    return FILTERABLE_FIELDS.filter(f => !usedFields.has(f.field));
  };

  const availableFields = getAvailableFields();

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await FilterService.update(filter._id, form);
    } else {
      await FilterService.create(form);
    }

    onSuccess();
  };

  return (
    <div className="w-full px-12 py-10">

      {/* Titre */}
      <h1 className="text-2xl font-semibold text-primary-500 mb-6">
        Formulaire du filtre
      </h1>

      {/* Carte */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#9B59B61A] rounded-xl p-8 space-y-6"
      >
        {/* Champ filtrable */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Champ filtrable
          </label>

          <Select
            value={form.field}
            onValueChange={(v) => handleChange("field", v)}
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
                <SelectItem value="" disabled>
                  Aucun champ disponible (tous les champs sont déjà utilisés)
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {isEdit && (
            <p className="text-xs text-gray-500">
              Le champ ne peut pas être modifié
            </p>
          )}
          {!isEdit && availableFields.length === 0 && (
            <p className="text-xs text-red-500">
              Tous les champs filtrables sont déjà utilisés. Supprimez un filtre existant pour en créer un nouveau.
            </p>
          )}
        </div>

        {/* Nom affiché */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Nom affiché
          </label>
          <Input
            className="bg-white"
            value={form.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Ex : Langue du livre"
            required
          />
        </div>

        {/* Type d’affichage */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Type d’affichage
          </label>
          <Select
            value={form.uiType}
            onValueChange={(v) => handleChange("uiType", v)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checkbox">Checkbox (multi)</SelectItem>
              <SelectItem value="radio">Radio (choix unique)</SelectItem>
              <SelectItem value="range">Intervalle (prix)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ordre */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Ordre d’affichage
          </label>
          <Input
            className="bg-white"
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => handleChange("order", Number(e.target.value))}
          />
        </div>

        {/* Statut */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Statut
          </label>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={form.isActive}
                onChange={() => handleChange("isActive", true)}
              />
              Actif
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={!form.isActive}
                onChange={() => handleChange("isActive", false)}
              />
              Désactivé
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6"
          >
            Annuler
          </Button>

          <Button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6"
          >
            {isEdit ? "Enregistrer" : "Créer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
