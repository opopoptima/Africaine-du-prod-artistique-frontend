"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Search, Plus, Edit2, Trash2, Bell, Settings, User } from "lucide-react";
import { FiTag, FiAward, FiCalendar } from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);

  // Fetch actualités from backend
  useEffect(() => {
    fetchActualites();
  }, []);

  const fetchActualites = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/news");
      const data = await response.json();
      setActualites(data);
      setFilteredActualites(data);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  useEffect(() => {
    let filtered = actualites;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterReference !== "all") {
      filtered = filtered.filter((item) => item.category === filterReference);
    }

    // Status filter
    if (filterStatut !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatut);
    }

    // Date filter
    if (filterDate !== "all") {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.publicationDate || a.createdAt);
        const dateB = new Date(b.publicationDate || b.createdAt);
        return filterDate === "recent" ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredActualites(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterReference, filterStatut, filterDate, actualites]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActualites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActualites.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      try {
        await fetch(`http://localhost:5000/api/news/${id}`, {
          method: "DELETE",
        });
        fetchActualites();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const handleEdit = (actualite) => {
    router.push(`/dashboard/actualites/form?id=${actualite._id}`);
  };

  const handleAddNew = () => {
    router.push("/dashboard/actualites/form");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-linear-to-r from-primary-500 to-primary-300 px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
              {/* Logo placeholder */}
              <span className="text-2xl font-bold text-primary-500">A</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="text-white/80 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/dashboard/articles" className="text-white/80 hover:text-white transition-colors">
              Articles
            </a>
            <a href="/dashboard/commandes" className="text-white/80 hover:text-white transition-colors">
              Commandes
            </a>
            <a href="/dashboard/actualites" className="text-white font-semibold bg-white/20 px-6 py-2 rounded-full">
              Actualités
            </a>
            <a href="/dashboard/filtres" className="text-white/80 hover:text-white transition-colors">
              Filtres
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="text-sm text-secondary-700">
          Dashboard &gt; <span className="font-semibold text-secondary-900">Actualités</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-8 py-6">
        {/* Search - Top row */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
            <Input
              type="text"
              placeholder="Recherche"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-2.5 w-80 border-secondary-700/20 rounded-full text-primary-300 placeholder:text-primary-300/60"
            />
          </div>
        </div>

        {/* Filters & Add Button - Second row */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Filters - Centered */}
          <div className="flex items-center gap-4">
            {/* Reference Filter */}
            <Select value={filterReference} onValueChange={setFilterReference}>
              <SelectTrigger className="w-40 border-secondary-700/20 rounded-[28px] px-4 py-3 h-auto">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-300/20 flex items-center justify-center">
                      <FiTag className="w-3 h-3 text-primary-500" />
                    </span>
                    <span className="text-sm font-medium">
                      {filterReference === "all" ? "Catégorie" : filterReference}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Livre">Livre</SelectItem>
                <SelectItem value="Événement">Événement</SelectItem>
                <SelectItem value="Promotion">Promotion</SelectItem>
                <SelectItem value="Blog">Blog</SelectItem>
              </SelectContent>
            </Select>

            {/* Statut Filter */}
            <Select value={filterStatut} onValueChange={setFilterStatut}>
              <SelectTrigger className="w-40 border-secondary-700/20 rounded-[28px] px-4 py-3 h-auto">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-300/20 flex items-center justify-center">
                      <FiAward className="w-3 h-3 text-primary-500" />
                    </span>
                    <span className="text-sm font-medium">
                      {filterStatut === "all" ? "Statut" : filterStatut}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Publié">Publié</SelectItem>
                <SelectItem value="Archivé">Archivé</SelectItem>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-40 border-secondary-700/20 rounded-[48px] px-4 py-3 h-auto">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-300/20 flex items-center justify-center">
                      <FiCalendar className="w-3 h-3 text-primary-500" />
                    </span>
                    <span className="text-sm font-medium">
                      {filterDate === "all" ? "Date" : filterDate === "recent" ? "Plus récent" : "Plus ancien"}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="older">Plus ancien</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Button - Positioned Absolute Right */}
          <div className="absolute right-0">
            <Button 
              onClick={handleAddNew}
              className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-10 py-4 font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter une actualité
            </Button>
          </div>
        </div>

        {/* Table */}
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
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="text-gray-500 font-semibold">Aucune actualité trouvée</p>
                      <Button 
                        onClick={handleAddNew}
                        className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-6 py-2"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une actualité
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((item, index) => (
                <TableRow 
                  key={item._id} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-primary-300/10'} hover:bg-primary-300/20`}
                >
                  <TableCell className="font-medium">ACT-2025-{item._id.slice(-3)}</TableCell>
                  <TableCell>{item.title || "Sans titre"}</TableCell>
                  <TableCell>{item.category || item.program || "Blog"}</TableCell>
                  <TableCell>
                    <Badge
                      className={`
                        ${item.status === "Publié" ? "bg-primary-300" : ""}
                        ${item.status === "Archivé" ? "bg-secondary-700" : ""}
                        ${item.status === "Brouillon" ? "border-primary-300 text-primary-300" : ""}
                      `}
                      variant={item.status === "Brouillon" ? "outline" : "default"}
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
                      >
                        <Edit2 className="w-4 h-4 text-secondary-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 hover:bg-secondary-100/10 rounded transition-colors"
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

        {/* Pagination */}
        {!loading && filteredActualites.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-primary-500 min-w-[120px]">Lignes par page</span>
            <Select value={itemsPerPage.toString()} onValueChange={(val) => setItemsPerPage(Number(val))}>
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
              de {filteredActualites.length} rangées
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              «
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
            >
              ›
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </Button>
          </div>
        </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary-300 mt-12 py-6 text-center">
        <p className="text-primary-500 font-semibold text-lg">
          Centralisez la gestion des commandes pour une organisation optimale et un meilleur suivi opérationnel !
        </p>
      </footer>
    </div>
  );
}
