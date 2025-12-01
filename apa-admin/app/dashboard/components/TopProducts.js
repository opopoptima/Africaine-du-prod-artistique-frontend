"use client";

import { Card } from "../../components/ui/card";

const products = [
  { name: "Hôtel Moche Seyne", sales: 88, popularity: 88 },
  { name: "Disney Princess Dress", sales: 17, popularity: 17 },
  { name: "Bathroom Essentials", sales: 15, popularity: 15 },
  { name: "Apple Smart watch", sales: 23, popularity: 23 },
];

export default function TopProducts() {
  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-secondary-900)]">Top Produits</h3>
        <button className="text-sm text-[var(--color-primary-300)] hover:underline">
          Voir plus →
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 text-sm font-medium text-[var(--color-secondary-700)] pb-2">
          <span>#</span>
          <span>Nom</span>
          <span className="text-right">Popularité</span>
          <span className="text-right">Ventes</span>
        </div>

        {products.map((product, index) => (
          <div key={index} className="grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center">
            <span className="text-[var(--color-secondary-700)]">{index + 1}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-secondary-900)] mb-1">
                {product.name}
              </p>
              <div className="h-2 w-full bg-[var(--color-secondary-100)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-primary-300)] rounded-full"
                  style={{ width: `${product.popularity}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-[var(--color-primary-300)] bg-[var(--color-primary-300)]/10 px-2 py-1 rounded">
              {product.sales}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}