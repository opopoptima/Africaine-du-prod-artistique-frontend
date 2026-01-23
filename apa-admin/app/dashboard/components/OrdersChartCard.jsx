"use client";

import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function OrdersChartCard({ mode, period, kpi }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (kpi && kpi.sparklineOrders && kpi.labels) {
      setChartData({
        labels: kpi.labels,
        datasets: [
          {
            label: "Commandes",
            data: kpi.sparklineOrders,
            borderColor: "#4B0082",
            backgroundColor: "rgba(75, 0, 130, 0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#4B0082",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
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
        borderColor: "#4B0082",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `${value} commande${value > 1 ? 's' : ''}`;
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
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  if (!kpi) {
    return (
      <Card className="border-border bg-card p-6 shadow-sm">
        <p className="text-center text-gray-500">Chargement...</p>
      </Card>
    );
  }

  const isPositive = kpi.trends.ordersTrend >= 0;

  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-secondary-900">
          Commandes
        </h3>
      </div>

      {/* Stats */}
      <div className="mb-6 space-y-2">
        <p className="text-3xl font-bold text-secondary-900">
          {kpi.totalOrders}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {kpi.trendText.orders}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(kpi.trends.ordersTrend).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-64">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">Aucune donnée disponible</p>
          </div>
        )}
      </div>
    </Card>
  );
}