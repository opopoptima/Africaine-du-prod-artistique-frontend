"use client";

import { Star, BookOpen, ShoppingBag, DollarSign, Package, Users, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../../components/ui/card";

const stats = [
  {
    icon: Star,
    value: "50",
    label: "Nouvelles Collections",
    trend: "+10% vs semaine dernière",
    isPositive: true,
  },
  {
    icon: BookOpen,
    value: "425",
    label: "Nouveaux Livres",
    trend: "+10% vs année dernière",
    isPositive: true,
  },
  {
    icon: ShoppingBag,
    value: "50",
    label: "Commandes au total",
    trend: "+8% vs semaine dernière",
    isPositive: true,
  },
  {
    icon: DollarSign,
    value: "5.000 dt",
    label: "Ventes au total",
    trend: "+10% vs semaine dernière",
    isPositive: true,
  },
  {
    icon: Package,
    value: "9",
    label: "Produits Vendus",
    trend: "+2% vs hier",
    isPositive: true,
  },
  {
    icon: Users,
    value: "12",
    label: "Nouveaux Clients",
    trend: "+3% vs hier",
    isPositive: true,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative overflow-hidden border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col">
            {/* Icon and Trending Icon Row */}
            <div className="mb-3 flex items-start justify-between">
              <div className="rounded-full bg-[var(--color-primary-300)]/10 p-2">
                <stat.icon className="h-5 w-5 text-[var(--color-primary-300)]" />
              </div>
              <div className="rounded-full bg-[var(--color-primary-300)]/10 p-2">
                {stat.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-[var(--color-primary-300)]" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-[var(--color-primary-500)]" />
                )}
              </div>
            </div>

            {/* Value */}
            <p className="mb-2 text-3xl font-bold text-[var(--color-primary-500)]">{stat.value}</p>
            
            {/* Label */}
            <p className="mb-2 text-sm font-medium text-[var(--color-primary-300)]">{stat.label}</p>
            
            {/* Trend */}
            <p className={`text-xs ${stat.isPositive ? "text-[var(--color-secondary-500)]" : "text-[var(--color-primary-500)]"}`}>
              {stat.trend}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}