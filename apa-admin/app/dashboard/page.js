"use client";;
import StatsGrid from "./components/StatsGrid";
import TopProducts from "./components/TopProducts";
import RevenueGauge from "./components/RevenueGauge";
import VisitorChart from "./components/VisitorChart";
import FeaturedCard from "./components/FeaturedCard";
import { Input } from "../components/input";
import { Search } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-primary-300">
            Bienvenue, [Mariem]<span className="text-secondary-900"></span>
          </h1>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Recherche"
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured Card */}
          <FeaturedCard />

          {/* Top Products */} 
          <TopProducts />

          
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue Gauge */}
          <RevenueGauge />

          {/* Visitor Chart */}
          <div className="lg:col-span-2">
            <VisitorChart />
          </div>
        </div>
      </div>
    </div>
  );
}