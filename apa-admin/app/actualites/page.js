"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/select";
import { Badge } from "@/app/components/badge";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { FiTag, FiAward, FiCalendar } from "react-icons/fi";
import ConfirmDeleteModal from "./form/delete";

// Adjust the import path according to your project structure
import { NewsService } from "../services/newsService";

export default function ActualitesPage() {
  const router = useRouter();

  const [actualites, setActualites] = useState([]);
  const [filteredActualites, setFilteredActualites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterReference, setFilterReference] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [filterDate, setFilterDate] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    fetchActualites();
  }, [currentPage, itemsPerPage]);

  const fetchActualites = async () => {
    setLoading(true);
    try {
      // Use the service with pagination params
      const response = await NewsService.getAll({
        page: currentPage,
        limit: itemsPerPage,
        // You can add q: searchTerm if you want server-side search later
        // sort: "createdAt:desc"  ← optional
      });

      // The service returns axios-like response → response.data
      const result = response.data;

      // Extract items (same structure as before)
      const newsItems = Array.isArray(result?.data?.items)
        ? result.data.items
        : Array.isArray(result?.data)
        ? result.data
        : [];

      setActualites(newsItems);
      setFilteredActualites(newsItems);
      setTotalPages(result.meta?.pages || 1);
      setTotalItems(result.meta?.total || 0);
    } catch (err) {
      console.error("Erreur lors du chargement des actualités:", err);
      setActualites([]);
      setFilteredActualites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Array.isArray(actualites)) {
      setFilteredActualites([]);
      return;
    }

    let filtered = [...actualites];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterReference !== "all") {
      filtered = filtered.filter((i) => i.category === filterReference);
    }

    if (filterStatut !== "all") {
      filtered = filtered.filter((i) => i.status === filterStatut);
    }

    if (filterDate !== "all") {
      filtered = [...filtered].sort((a, b) => {
        const da = new Date(a.publicationDate || a.createdAt || 0);
        const db = new Date(b.publicationDate || b.createdAt || 0);
        return filterDate === "recent" ? db - da : da - db;
      });
    }

    setFilteredActualites(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterReference, filterStatut, filterDate, actualites]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    setLoadingDelete(true);
    try {
      // Use the service for delete
      await NewsService.delete(selectedId);

      // Refresh list
      fetchActualites();
      setIsModalOpen(false);
      setSelectedId(null);
      alert("Actualité supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert(`Erreur lors de la suppression : ${err.message || "Erreur inconnue"}`);
    } finally {
      setLoadingDelete(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActualites.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (actualite) => {
    router.push(`/actualites/form?id=${actualite._id}`);
  };

  const handleAddNew = () => {
    router.push("/actualites/form");
  };

  return (
    <div className="min-h-screen bg-white relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <ConfirmDeleteModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedId(null);
            }}
            onConfirm={handleConfirmDelete}
            loading={loadingDelete}
          />
        </div>
      )}

      <div className="px-8 pt-4 pb-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <a href="/dashboard" className="hover:text-[#5B1E8C]">
              Dashboard
            </a>
            {" > "}
            <span className="text-[#5B1E8C] font-semibold">Actualités</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleAddNew}
              className="bg-[#5B1E8C] hover:bg-[#4a1870] text-white rounded-full h-9 px-4 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 cursor:pointer" />
              Ajouter
            </Button>
            <div className="relative w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B58AD9]" />
              <Input
                type="text"
                placeholder="Recherche"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 h-9 w-full border-[#E0D5F5] rounded-full text-sm text-[#5B1E8C] placeholder:text-[#B58AD9]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[150px]">
            <Select value={filterReference} onValueChange={setFilterReference}>
              <SelectTrigger className="w-[150px] h-9 rounded-full border-[#E0D5F5] px-3 py-0 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F5F1FF] flex items-center justify-center">
                    <FiTag className="w-3 h-3 text-[#5B1E8C]" />
                  </span>
                  <SelectValue placeholder="Catégorie" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Livre">Livre</SelectItem>
                <SelectItem value="Événement">Événement</SelectItem>
                <SelectItem value="Promotion">Promotion</SelectItem>
                <SelectItem value="Blog">Blog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[150px]">
            <Select value={filterStatut} onValueChange={setFilterStatut}>
              <SelectTrigger className="w-[150px] h-9 rounded-full border-[#E0D5F5] px-3 py-0 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F5F1FF] flex items-center justify-center">
                    <FiAward className="w-3 h-3 text-[#5B1E8C]" />
                  </span>
                  <SelectValue placeholder="Statut" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Publié">Publié</SelectItem>
                <SelectItem value="Archivé">Archivé</SelectItem>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[150px]">
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[150px] h-9 rounded-full border-[#E0D5F5] px-3 py-0 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F5F1FF] flex items-center justify-center">
                    <FiCalendar className="w-3 h-3 text-[#5B1E8C]" />
                  </span>
                  <SelectValue placeholder="Date" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="older">Plus ancien</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <main className="px-8 py-4">
        <div className="bg-white rounded-lg border border-secondary-700/20 overflow-hidden">
          <Table>
            <TableHeader className="bg-primary-500">
              <TableRow>
                <TableHead className="text-white font-semibold">ID Article</TableHead>
                <TableHead className="text-white font-semibold">Titre</TableHead>
                <TableHead className="text-white font-semibold">Catégorie</TableHead>
                <TableHead className="text-white font-semibold">Statut</TableHead>
                <TableHead className="text-white font-semibold">Date de publication</TableHead>
                <TableHead className="text-white font-semibold">Auteur / Rédacteur</TableHead>
                <TableHead className="text-white font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
                      <p className="text-primary-500 font-semibold">Chargement des actualités...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <p className="text-gray-500 font-semibold">Aucune actualité trouvée</p>
                    <button
                      onClick={fetchActualites}
                      className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Recharger
                    </button>
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-primary-300/10"} hover:bg-primary-300/20`}
                  >
                    <TableCell className="font-medium">
                      ACT-
                      {new Date(item.publicationDate || item.createdAt).getFullYear()}-
                      {item._id ? item._id.slice(-4) : "0000"}
                    </TableCell>
                    <TableCell>{item.title || "Sans titre"}</TableCell>
                    <TableCell>{item.category || item.program || "Blog"}</TableCell>
                    <TableCell>
                      <Badge
                        className={`px-3 py-1 rounded-full ${
                          item.status === "Publié"
                            ? "bg-green-500 text-white"
                            : item.status === "Archivé"
                            ? "bg-gray-500 text-white"
                            : item.status === "Brouillon"
                            ? "bg-orange-400 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                        variant="default"
                      >
                        {item.status || "Brouillon"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.publicationDate
                        ? new Date(item.publicationDate).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>{item.author || "Admin, Librairie"}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 hover:bg-secondary-100/10 rounded transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4 text-secondary-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className="p-2 hover:bg-secondary-100/10 rounded transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!loading && filteredActualites.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold text-primary-500 min-w-[120px]">
                Lignes par page
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(val) => setItemsPerPage(Number(val))}
              >
                <SelectTrigger className="w-14 h-10 rounded-full border-primary-500 px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm font-semibold text-primary-500 min-w-[100px]">
                {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredActualites.length)} sur{" "}
                {filteredActualites.length} résultats
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="rounded-full"
              >
                «
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-full"
              >
                ‹
              </Button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={
                      currentPage === pageNum
                        ? "bg-primary-500 text-white rounded-full"
                        : "rounded-full"
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full"
              >
                ›
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="rounded-full"
              >
                »
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-primary-300 mt-12 py-6 text-center">
        <p className="text-primary-500 font-semibold text-lg">
          Centralisez la gestion des actualités pour une organisation optimale et un meilleur suivi opérationnel !
        </p>
      </footer>
    </div>
  );
}