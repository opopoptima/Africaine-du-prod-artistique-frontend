"use client";

import { useState, useEffect, useCallback } from "react";
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
import { FiAward, FiCalendar, FiBook } from "react-icons/fi";
import { ArticleService } from "../../services/articleService";
import ConfirmDeleteModal from "./delete";
import { BookModel } from "../../models/BookModel";

export default function ArticlesPage() {
  const router = useRouter();

  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1, limit: 10 });
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        q: searchTerm || undefined,
        sort: `createdAt:${sortOrder}`,
        ...(filterType !== "all" && { type: filterType }),
        ...(filterStatut !== "all" && { statut: filterStatut }),
      };

      const res = await ArticleService.getAll(params);

      // Map backend data using BookModel to ensure all fields exist
      const normalizedArticles = (res.data || res.articles || []).map(BookModel);

      setArticles(normalizedArticles);
      setMeta(res.meta || { total: 0, page: 1, pages: 1, limit: itemsPerPage });
    } catch (err) {
      console.error("Error fetching articles:", err);
      setArticles([]);
      setMeta({ total: 0, page: 1, pages: 1, limit: itemsPerPage });
      
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, filterType, filterStatut, sortOrder]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setLoadingDelete(true);
    try {
      await ArticleService.delete(selectedId);
      fetchArticles();
    } catch (err) {
      console.error("Erreur suppression:", err);
    } finally {
      setLoadingDelete(false);
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleEdit = (article) => {
    router.push(`/articles/fiche-article/${article.id}`);
  };

  const handleAddNew = () => {
    router.push("/articles/fiche-article/new");
  };

  return (
    <div>
      <div className={`min-h-screen bg-white transition-all duration-300 ${isModalOpen ? "blur-sm" : ""}`}>
        {/* Header */}
       

        {/* Breadcrumb */}
        <div className="px-8 py-4">
          <div className="text-sm text-gray-600">
            <a href="/dashboard" className="hover:text-primary-500">Dashboard</a>{" > "}
            <a href="/articles" className="hover:text-primary-500">Articles</a>
          </div>
        </div>

        {/* Main */}
        <main className="px-8 py-6">
          {/* Search */}
          <div className="flex justify-end mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
              <Input
                type="text"
                placeholder="Rechercher un livre..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 pr-4 py-2.5 w-80 border-secondary-700/20 rounded-full text-primary-300 placeholder:text-primary-300/60"
              />
            </div>
          </div>

          {/* Filters + Add button */}
          <div className="relative flex items-center justify-center mb-6 gap-4">
            {/* Type */}
            <Select value={filterType} onValueChange={(v) => { setFilterType(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-44 border-secondary-700/20 rounded-[28px] px-4 py-3 h-auto">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-300/20 flex items-center justify-center">
                      <FiBook className="w-3 h-3 text-primary-500" />
                    </span>
                    <span className="text-sm font-medium">{filterType === "all" ? "Type" : filterType}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Coloriage">Coloriage</SelectItem>
              </SelectContent>
            </Select>

            {/* Statut */}
            <Select value={filterStatut} onValueChange={(v) => { setFilterStatut(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-44 border-secondary-700/20 rounded-[28px] px-4 py-3 h-auto">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-300/20 flex items-center justify-center">
                      <FiAward className="w-3 h-3 text-primary-500" />
                    </span>
                    <span className="text-sm font-medium">{filterStatut === "all" ? "Statut" : filterStatut}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="En stock">En stock</SelectItem>
                <SelectItem value="Rupture">Rupture</SelectItem>
                <SelectItem value="Précommande">Précommande</SelectItem>
              </SelectContent>
            </Select>

            {/* Date */}
            <Select value={sortOrder} onValueChange={(v) => { setSortOrder(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-44 border-secondary-700/20 rounded-[48px] px-4 py-3 h-auto">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary-300/20 flex items-center justify-center">
                      <FiCalendar className="w-3 h-3 text-primary-500" />
                    </span>
                    <span className="text-sm font-medium">{sortOrder === "desc" ? "Plus récent" : "Plus ancien"}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="desc">Plus récent</SelectItem>
                <SelectItem value="asc">Plus ancien</SelectItem>
              </SelectContent>
            </Select>

            <div className="absolute right-0">
              <Button onClick={handleAddNew} className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-10 py-4 font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Ajouter un article
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-secondary-700/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-primary-500">
                <TableRow>
                  <TableHead className="text-white font-semibold">ISBN / Ref</TableHead>
                  <TableHead className="text-white font-semibold">Titre</TableHead>
                  <TableHead className="text-white font-semibold">Type</TableHead>
                  <TableHead className="text-white font-semibold">Statut</TableHead>
                  <TableHead className="text-white font-semibold">Prix</TableHead>
                  <TableHead className="text-white font-semibold">Ajouté le</TableHead>
                  <TableHead className="text-white font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow key="loading">
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
                        <p className="text-primary-500 font-semibold">Chargement des articles...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : articles.length === 0 ? (
                  <TableRow key="no-articles">
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-gray-500 font-semibold">Aucun article trouvé</p>
                        <Button onClick={handleAddNew} className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-6 py-2">
                          <Plus className="w-4 h-4 mr-2" /> Ajouter un article
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  articles.map((item, index) => (
                    <TableRow
                      key={item.id} 

                      className={`${index % 2 === 0 ? "bg-white" : "bg-primary-300/10"} hover:bg-primary-300/20`}
                    >
                      <TableCell className="font-medium">{item.isbn || "N/A"}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.title || "Sans titre"}</TableCell>
                      <TableCell>{item.type || "Non défini"}</TableCell>
                      <TableCell>
                        <Badge className={
                          item.statut === "En stock" ? "bg-green-500 text-white" :
                          item.statut === "Rupture" ? "bg-red-500 text-white" :
                          item.statut === "Précommande" ? "bg-orange-500 text-white" : ""
                        }>
                          {item.statut || "Inconnu"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.price ? `${parseFloat(item.price).toFixed(2)} €` : "N/A"}</TableCell>
                      <TableCell>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleEdit(item)} className="p-2 hover:bg-secondary-100/10 rounded transition-colors">
                            <Edit2 className="w-4 h-4 text-secondary-700" />
                          </button>
                          <button onClick={() => handleOpenModal(item._id)} className="p-2 hover:bg-red-100/20 rounded transition-colors">
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
          {!loading && articles.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-primary-500 min-w-[120px]">Lignes par page</span>
                <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                  <SelectTrigger className="w-14 h-10 rounded-full border-primary-500 px-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm font-semibold text-primary-500">
                  de {meta.total} article{meta.total > 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</Button>
                {Array.from({ length: Math.min(5, meta.pages) }, (_, i) => {
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage > meta.pages - 3 ? meta.pages - 4 + i : currentPage - 2 + i;
                  if (pageNum < 1 || pageNum > meta.pages) return null;
                  return (
                    <Button key={pageNum} variant={currentPage === pageNum ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(pageNum)} className={currentPage === pageNum ? "bg-primary-500 text-white rounded-full" : "rounded-full"}>
                      {pageNum}
                    </Button>
                  );
                })}
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(meta.pages, p + 1))} disabled={currentPage === meta.pages}>›</Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(meta.pages)} disabled={currentPage === meta.pages}>»</Button>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-primary-300 mt-12 py-6 text-center">
          <p className="text-primary-500 font-semibold text-lg">
            Gérez facilement votre catalogue de livres, BD, magazines et papeterie en un clin d’œil !
          </p>
        </footer>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loadingDelete}
      />
    </div>
  );
}
