"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryService from "../services/categoryService";
import { useToast } from "@/app/context/ToastContext";

export default function CategoryForm({ initialData, isEditing = false }) {
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    image: initialData?.image || "",
    isActive: initialData?.isActive ?? true,
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await CategoryService.update(initialData._id, formData);
        toast.success("Catégorie mise à jour avec succès");
      } else {
        await CategoryService.create(formData);
        toast.success("Catégorie créée avec succès");
      }
      router.push("/categories");
    } catch (error) {
      console.error("Erreur d'enregistrement", error);
      toast.error(
        error.response?.data?.message || "Erreur lors de l'enregistrement."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xs max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {isEditing ? "Modifier la catégorie" : "Nouvelle catégorie"}
      </h2>

      <div className="space-y-6">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de la catégorie *
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Romans, Informatique..."
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image / Icône de la catégorie
          </label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 shrink-0">
                <img
                  src={formData.image}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-colors"
              onChange={handleImageChange}
            />
          </div>
        </div>



        <div className="flex items-center gap-6">


          {/* Actif */}
          <div className="flex-1 flex flex-col justify-end pb-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <span className="text-sm font-medium text-gray-700">
                Catégorie active
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/categories")}
          className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-xs"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
