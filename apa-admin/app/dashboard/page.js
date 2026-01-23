"use client";

import { useEffect, useState } from "react";
import PeriodSelector from "./components/PeriodSelector";
import StatsGrid from "./components/StatsGrid";
import SalesChartCard from "./components/SalesChartCard";
import OrdersChartCard from "./components/OrdersChartCard";
import { KPIService } from "../services/kpiService";
import { ShoppingBag, DollarSign, Package } from "lucide-react";

export default function DashboardPage() {
  const today = new Date().toISOString().split("T")[0];

  const [mode, setMode] = useState("day");
  const [period, setPeriod] = useState({ start: today, end: today });
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKPI() {
      setLoading(true);
      try {
        const kpiData = await KPIService.getKPI({
          mode,
          start: period.start,
          end: period.end,
        });
        setKpi(kpiData);
      } catch (error) {
        console.error("Failed to fetch KPI data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchKPI();
  }, [mode, period]);

  if (loading)
    return <p className="p-8 text-center text-gray-500">Chargement des KPIs...</p>;

  const stats = [
    {
      icon: ShoppingBag,
      value: kpi.totalOrders,
      label: "Commandes au total",
      trend: kpi.trendText.orders,
      isPositive: kpi.trends.orders >= 0,
    },
    {
      icon: DollarSign,
      value: `${kpi.totalRevenue.toLocaleString()} DT`,
      label: "Ventes au total",
      trend: kpi.trendText.revenue,
      isPositive: kpi.trends.revenue >= 0,
    },
    {
      icon: Package,
      value: kpi.totalProducts,
      label: "Produits vendus",
      trend: kpi.trendText.products,
      isPositive: kpi.trends.products >= 0,
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-8">
      <PeriodSelector
        mode={mode}
        setMode={setMode}
        period={period}
        setPeriod={setPeriod}
      />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChartCard mode={mode} period={period} kpi={kpi} />
        <OrdersChartCard mode={mode} period={period} kpi={kpi} />
      </div>
    </div>
  );
}
