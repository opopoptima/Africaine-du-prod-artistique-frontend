"use client";

import { useEffect, useState } from "react";
import { useCategories } from "./useCategories";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import CategoryService from "../services/categoryService";
import { useToast } from "@/app/context/ToastContext";

export default function CategoriesPage() {
  const { categories, loading, load } = useCategories();
  const router = useRouter();
  const toast = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    load(); // chargement initial
  }, []);

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isDeleteModalOpen) {
        setIsDeleteModalOpen(false);
        setSelectedCategoryId(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDeleteModalOpen]);

  const handleOpenDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategoryId) return;
    setLoadingDelete(true);
    try {
      await CategoryService.delete(selectedCategoryId);
      toast.success("Catégorie supprimée avec succès !");
      load(); // recharge la liste
    } catch (err) {
      console.error("Erreur suppression:", err);
      toast.error("Erreur lors de la suppression de la catégorie.");
    } finally {
      setLoadingDelete(false);
      setIsDeleteModalOpen(false);
      setSelectedCategoryId(null);
    }
  };

  if (loading) return <p className="p-8">Chargement des catégories...</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between pb-6">
        <div className="text-sm text-gray-600">
          <a href="/dashboard" className="hover:text-[#5B1E8C]">
            Dashboard
          </a>{" "}
          {"> "}
          <span className="text-[#5B1E8C] font-semibold">Catégories</span>
        </div>
      </div>
      <div className="flex items-center justify-between pb-6">
        <div className="text-sm text-primary-300">
          <span className="text-primary-300 text-2xl">Tableau des catégories</span>
        </div>
        <button
          className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-6 py-2 transition-colors font-medium"
          onClick={() => router.push("/categories/nouveau")}
        >
          + Ajouter une catégorie
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-primary-500 text-white">
          <tr>
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Slug</th>
            <th className="p-2 text-left">Statut</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c._id} className="border-t">
              <td className="p-2 font-medium">{c.name}</td>
              <td className="p-2 text-gray-600">{c.slug}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {c.isActive ? "Actif" : "Inactif"}
                </span>
              </td>
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push(`/categories/${c._id}`)}
                    className="p-2 hover:bg-secondary-100/10 rounded transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4 text-secondary-700" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(c._id)}
                    className="p-2 hover:bg-red-100/20 rounded transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Aucune catégorie trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL DE CONFIRMATION DE SUPPRESSION */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          aria-modal="true"
          role="dialog"
          aria-labelledby="confirm-delete-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 transform transition-all animate-in fade-in zoom-in duration-200 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h3 id="confirm-delete-title" className="text-xl font-semibold text-gray-900">
                Êtes-vous sûr de vouloir supprimer cette catégorie ?
              </h3>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={loadingDelete}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Non
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={loadingDelete}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {loadingDelete ? 'Suppression...' : 'Oui !'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#9B59B680] mt-30 py-3 text-right">
        <p className="text-primary-500 font-semibold text-lg pr-15">
          Gérez vos catégories d'articles efficacement !
        </p>
      </footer>
    </div>
  );
}
