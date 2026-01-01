"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useFilters } from "./useFilters";
import FilterForm from "./FilterForm";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import FilterService from "../services/filterService";


export default function FiltersPage() {
  const { filters, loading, load } = useFilters();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    load(); // chargement initial
  }, []);

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isDeleteModalOpen) {
        setIsDeleteModalOpen(false);
        setSelectedFilterId(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDeleteModalOpen]);

  const handleOpenDeleteModal = (filterId) => {
    setSelectedFilterId(filterId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedFilterId) return;
    setLoadingDelete(true);
    try {
      await FilterService.delete(selectedFilterId);
      load(); // recharge la liste
    } catch (err) {
      console.error("Erreur suppression:", err);
    } finally {
      setLoadingDelete(false);
      setIsDeleteModalOpen(false);
      setSelectedFilterId(null);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between pb-6">
                        <div className="text-sm text-gray-600">
                                      <a href="/dashboard" className="hover:text-[#5B1E8C]">
                                          Dashboard
                                      </a>{" "}
                                      {"> "}
                                      <span className="text-[#5B1E8C] font-semibold">Filtres</span>
                                  </div>
                

                        
       </div>
       <div className="flex items-center justify-between pb-6">
                        <div className="text-sm text-primary-300">
                                      
                                      <span className="text-[#9B59B6]  text-2xl">Tableau des filtres</span>
                                  </div>
                                  {/* AJOUT */}
                <Button
            className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-6 py-2"
            onClick={() => router.push("/filtres/nouveau")}
          >
            + Ajouter un filtre
          </Button>


                        
       </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-primary-500 text-white">
          <tr>
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Champ</th>
            <th className="p-2 text-left">Items</th>
            <th className="p-2 text-left">Statut</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filters.map(f => (
            <tr key={f._id} className="border-t">
              <td className="p-2">{f.label}</td>
              <td className="p-2">{f.field}</td>
              <td className="p-2">{f.itemsCount}</td>
              <td className="p-2">
                {f.isActive ? "Actif" : "Désactivé"}
              </td>
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => router.push(`/filtres/${f._id}`)} 
                    className="p-2 hover:bg-secondary-100/10 rounded transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4 text-secondary-700" />
                  </button>
                  <button 
                    onClick={() => handleOpenDeleteModal(f._id)} 
                    className="p-2 hover:bg-red-100/20 rounded transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <FilterForm
              filter={editingFilter}
              onCancel={() => setIsOpen(false)}
              onSuccess={() => {
                setIsOpen(false);
                load(); // recharge la liste
              }}
            />
          </div>
        </div>
      )}

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
                Êtes-vous sûr de vouloir supprimer ce filtre ?
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

      <footer className="bg-[#9B59B680] mt-30 py-3 text-right  ">
          <p className="text-primary-500 font-semibold text-lg pr-15">
            Optimisez l'organisation de votre catalogue en gérant les filtres disponibles !
          </p>
        </footer>
    </div>
    
  );
}
