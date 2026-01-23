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
import { FiAward, FiCalendar, FiTruck } from "react-icons/fi";
import ConfirmDeleteModal from "./delete";
import orderService from "../../services/orderService";

export default function CommandesTable() {
    const router = useRouter();

    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatutCommande, setFilterStatutCommande] = useState("all");
    const [filterStatutPaiement, setFilterStatutPaiement] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc");

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    // Récupérer les commandes au chargement
    useEffect(() => {
        fetchCommandes();
    }, []);

    const fetchCommandes = async () => {
        try {
            setLoading(true);
            const data = await orderService.getAllOrders();
            setCommandes(data);
        } catch (error) {
            console.error("Erreur lors du chargement des commandes:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculer le total de la commande
    const calculateTotal = (order) => {
        if (!order.articles || order.articles.length === 0) {
            return order.livraisonPrice || 0;
        }
     
        const articlesTotal = order.articles.reduce((sum, item) => {
            if (!item.article) return sum;
            
            // Use promotional price if available, otherwise use regular price
            const price = item.article.promo && item.article.promo > 0 
                ? item.article.promo 
                : item.article.price || 0;
            
            return sum + (price * item.quantity);
        }, 0);
        
        return articlesTotal + (order.livraisonPrice || 0);
    };

    // Filtrage des commandes
    const filteredCommandes = commandes
        .filter((cmd) => {
            const matchSearch =
                !searchTerm ||
                cmd.commandeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cmd.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cmd.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatutCmd =
                filterStatutCommande === "all" ||
                cmd.statusCommande === filterStatutCommande;
            const matchStatutPay =
                filterStatutPaiement === "all" ||
                cmd.paimentStatus === filterStatutPaiement;
            return matchSearch && matchStatutCmd && matchStatutPay;
        })
        .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });

    // Pagination
    const totalPages = Math.ceil(filteredCommandes.length / itemsPerPage);
    const paginatedCommandes = filteredCommandes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenModal = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        try {
            setLoadingDelete(true);
            await orderService.deleteOrder(selectedId);
            setCommandes(commandes.filter((cmd) => cmd._id !== selectedId));
            setIsModalOpen(false);
            setSelectedId(null);
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            alert("Erreur lors de la suppression de la commande");
        } finally {
            setLoadingDelete(false);
        }
    };

    const handleEdit = (commande) => {
        router.push(`/commandes/fiche-commande/${commande._id}`);
    };

    const handleAddNew = () => {
        router.push("/commandes/fiche-commande/new");
    };

    const getStatutCommandeBadgeClass = (statut) => {
        switch (statut) {
            case "En attente":
                return "bg-orange-400 text-white";
            case "Livrée":
                return "bg-green-500 text-white";
            case "Annulée":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-300 text-gray-700";
        }
    };

    const getStatutPaiementBadgeClass = (statut) => {
        switch (statut) {
            case "Payée":
                return "bg-green-500 text-white";
            case "En attente":
                return "bg-orange-400 text-white";
            case "Réfusée":
                return "bg-red-500 text-white";
            case "Remboursée":
                return "bg-purple-500 text-white";
            default:
                return "bg-gray-300 text-gray-700";
        }
    };

    return (
        <div>
            <div
                className={`min-h-screen bg-white transition-all duration-300 ${
                    isModalOpen ? "blur-sm" : ""
                }`}
            >
                {/* HEADER */}
                <div className="px-8 pt-4 pb-2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            <a href="/dashboard" className="hover:text-[#5B1E8C]">
                                Dashboard
                            </a>{" "}
                            {"> "}
                            <span className="text-[#5B1E8C] font-semibold">Commandes</span>
                        </div>

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

                    {/* Filtres */}
                    <div className="flex items-center gap-4">
                        <div className="w-[150px]">
                            <Select
                                value={filterStatutCommande}
                                onValueChange={(v) => {
                                    setFilterStatutCommande(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-full h-9 rounded-full border-[#E0D5F5] px-3 py-0 text-xs text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-[#F5F1FF] flex items-center justify-center">
                                            <FiTruck className="w-3 h-3 text-[#5B1E8C]" />
                                        </span>
                                        <SelectValue placeholder="Statut commande" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectItem value="all">Tous</SelectItem>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="Livrée">Livrée</SelectItem>
                                    <SelectItem value="Annulée">Annulée</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-[150px]">
                            <Select
                                value={filterStatutPaiement}
                                onValueChange={(v) => {
                                    setFilterStatutPaiement(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-full h-9 rounded-full border-[#E0D5F5] px-3 py-0 text-xs text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-[#F5F1FF] flex items-center justify-center">
                                            <FiAward className="w-3 h-3 text-[#5B1E8C]" />
                                        </span>
                                        <SelectValue placeholder="Statut paiement" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectItem value="all">Tous</SelectItem>
                                    <SelectItem value="Payée">Payée</SelectItem>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="Réfusée">Réfusée</SelectItem>
                                    <SelectItem value="Remboursée">Remboursée</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-[150px]">
                            <Select
                                value={sortOrder}
                                onValueChange={(v) => {
                                    setSortOrder(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-full h-9 rounded-full border-[#E0D5F5] px-3 py-0 text-xs text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-[#F5F1FF] flex items-center justify-center">
                                            <FiCalendar className="w-3 h-3 text-[#5B1E8C]" />
                                        </span>
                                        <SelectValue placeholder="Date" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectItem value="desc">Plus récent</SelectItem>
                                    <SelectItem value="asc">Plus ancien</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <main className="px-8 py-4">
                    <div className="bg-white rounded-lg border border-secondary-700/20 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-primary-500">
                                <TableRow>
                                    <TableHead className="text-white font-semibold">
                                        Référence
                                    </TableHead>
                                    <TableHead className="text-white font-semibold">
                                        Client
                                    </TableHead>
                                    <TableHead className="text-white font-semibold">
                                        Statut commande
                                    </TableHead>
                                    <TableHead className="text-white font-semibold">
                                        Statut paiement
                                    </TableHead>
                                    <TableHead className="text-white font-semibold">
                                        Total
                                    </TableHead>
                                    <TableHead className="text-white font-semibold">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-white font-semibold text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
                                                <p className="text-primary-500 font-semibold">
                                                    Chargement des commandes...
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedCommandes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <p className="text-gray-500 font-semibold">
                                                    Aucune commande trouvée
                                                </p>
                                                <Button
                                                    onClick={handleAddNew}
                                                    className="bg-primary-300 hover:bg-primary-500 text-white rounded-full px-6 py-2"
                                                >
                                                    <Plus className="w-4 h-4 mr-2" /> Ajouter une commande
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedCommandes.map((item, index) => (
                                        <TableRow
                                            key={item._id}
                                            className={`${
                                                index % 2 === 0 ? "bg-white" : "bg-primary-300/10"
                                            } hover:bg-primary-300/20`}
                                        >
                                            <TableCell className="font-medium">
                                                {item.commandeId || "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                {item.name} {item.lastName}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatutCommandeBadgeClass(
                                                        item.statusCommande
                                                    )}
                                                >
                                                    {item.statusCommande}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatutPaiementBadgeClass(
                                                        item.paimentStatus
                                                    )}
                                                >
                                                    {item.paimentStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {calculateTotal(item).toFixed(2)} TND
                                            </TableCell>
                                            <TableCell>
                                                {new Date(item.createdAt).toLocaleDateString(
                                                    "fr-FR",
                                                    {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 hover:bg-secondary-100/10 rounded transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-secondary-700" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenModal(item._id)}
                                                        className="p-2 hover:bg-red-100/20 rounded transition-colors"
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
                    {!loading && paginatedCommandes.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-semibold text-primary-500 min-w-[120px]">
                                    Lignes par page
                                </span>
                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(v) => {
                                        setItemsPerPage(Number(v));
                                        setCurrentPage(1);
                                    }}
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
                                <span className="text-sm font-semibold text-primary-500">
                                    de {filteredCommandes.length} commande
                                    {filteredCommandes.length > 1 ? "s" : ""}
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
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNum =
                                        currentPage <= 3
                                            ? i + 1
                                            : currentPage > totalPages - 3
                                            ? totalPages - 4 + i
                                            : currentPage - 2 + i;
                                    if (pageNum < 1 || pageNum > totalPages) return null;
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
                        Gérez facilement vos commandes et suivez leur statut en temps réel !
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