"use client";

import CategoryForm from "../CategoryForm";

export default function AddCategoryPage() {
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
        <span className="text-[#5B1E8C] font-semibold">Ajouter</span>
      </div>

      <div className="max-w-4xl">
        <CategoryForm />
      </div>
    </div>
  );
}
