"use client";

import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

export default function SalesChartCard({ mode, period, kpi }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (kpi && kpi.sparklineRevenue && kpi.labels) {
      setChartData({
        labels: kpi.labels,
        datasets: [
          {
            label: "Revenus",
            data: kpi.sparklineRevenue,
            backgroundColor: kpi.sparklineRevenue.map((_, index) => {
              const opacity = 0.4 + (index / kpi.sparklineRevenue.length) * 0.6;
              return `rgba(139, 92, 246, ${opacity})`;
            }),
            borderColor: "#8B5CF6",
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      });
    }
  }, [kpi]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#8B5CF6",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y.toLocaleString()} DT`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
          callback: function (value) {
            return value.toLocaleString() + " DT";
          },
        },
      },
    },
  };

  if (!kpi) {
    return (
      <Card className="border-border bg-card p-6 shadow-sm">
        <p className="text-center text-gray-500">Chargement...</p>
      </Card>
    );
  }

  const isPositive = kpi.trends.revenueTrend >= 0;

  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-secondary-900">
          Revenus Totaux
        </h3>
      </div>

      {/* Stats */}
      <div className="mb-6 space-y-2">
        <p className="text-3xl font-bold text-secondary-900">
          {kpi.totalRevenue.toLocaleString()} DT
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {kpi.trendText.revenue}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(kpi.trends.revenueTrend).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">Aucune donnée disponible</p>
          </div>
        )}
      </div>
    </Card>
  );
}