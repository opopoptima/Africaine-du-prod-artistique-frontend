"use client";

import { useEffect, useState, use } from "react";
import CategoryForm from "../CategoryForm";
import CategoryService from "../../services/categoryService";

export default function EditCategoryPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await CategoryService.getById(id);
        if (res.success && res.data) {
          setInitialData(res.data);
        }
      } catch (error) {
        console.error("Error fetching category", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchCategory();
    }
  }, [id]);

  if (loading) return <div className="p-8">Chargement des données...</div>;
  if (!initialData) return <div className="p-8">Catégorie introuvable.</div>;

  return (
    <div className="p-8">
      <div className="text-sm text-gray-600 mb-6">
        <a href="/dashboard" className="hover:text-[#5B1E8C]">
          Dashboard
        </a>{" "}
        {"> "}
        <a href="/categories" className="hover:text-[#5B1E8C]">
          Catégories
        </a>{" "}
        {"> "}
        <span className="text-[#5B1E8C] font-semibold">Modifier</span>
      </div>

      <div className="max-w-4xl">
        <CategoryForm initialData={initialData} isEditing={true} />
      </div>
    </div>
  );
}
