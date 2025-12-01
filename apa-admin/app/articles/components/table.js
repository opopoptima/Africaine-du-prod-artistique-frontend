"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { ArticleService } from "../../services/articleService";

export function BooksTable() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1, limit: 10 });
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pageSizes = [5, 10, 20, 50];

  const columns = useMemo(
    () => [
      { accessorKey: "isbn", header: "ISBN" },
      { accessorKey: "title", header: "Titre" },
      { accessorKey: "statut", header: "Statut" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "createdAt", header: "Date d’ajout" },
      { accessorKey: "price", header: "Prix" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {/* Redirection vers le formulaire avec l'ID */}
             <Link href={`/articles/fiche-article/${row.original._id}`}>
              <Button variant="ghost" size="sm">
                ✏️
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
                  try {
                    await ArticleService.delete(row.original._id || row.original.id);
                    fetchArticles(pagination.pageIndex + 1, pagination.pageSize);
                  } catch (err) {
                    console.error("Erreur suppression :", err);
                  }
                }
              }}
            >
              🗑️
            </Button>
          </div>
        ),
      },
    ],
    [pagination.pageIndex, pagination.pageSize]
  );

  const fetchArticles = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await ArticleService.list({ page, limit });
      setData(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      console.error("Erreur fetch articles :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: meta.pages,
  });

  return (
    <div className="p-4 ">
      {/* Ajouter un article */}
      <div className="mb-4 flex justify-end">
  <Link href="/articles/fiche-article/new">
    <Button className="bg-primary-300 text-white hover:bg-primary-500">
      + Ajouter un article
    </Button>
  </Link>
</div>



      {/* Loader */}
      {loading && <p className="text-primary-500 font-bold">Chargement des articles...</p>}

      {/* Table */}
      <table className="min-w-full border border-gray-200 overflow-hidden shadow-sm">
        <thead className="bg-primary-500 text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-left font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getPaginationRowModel().rows.map((row, i) => (
            <tr key={row.id} className={i % 2 !== 0 ? "bg-[#F8F3FF]" : "bg-white"}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-primary-500 font-bold">Lignes par page :</span>
          <select
            value={pagination.pageSize}
            onChange={e =>
              setPagination({
                ...pagination,
                pageSize: Number(e.target.value),
                pageIndex: 0,
              })
            }
            className="border rounded-3xl px-3 py-1"
          >
            {pageSizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-primary-500 font-bold">de {meta.total} lignes</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <Button
              key={i}
              size="sm"
              className={`rounded-full transition ${
                i === table.getState().pagination.pageIndex
                  ? "bg-primary-500 text-white shadow-md hover:bg-white hover:text-black"
                  : "bg-white text-gray-700 border hover:bg-primary-300"
              }`}
              onClick={() => table.setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}
