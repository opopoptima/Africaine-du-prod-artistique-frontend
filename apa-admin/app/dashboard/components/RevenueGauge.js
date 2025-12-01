"use client";

import { Card } from "../../components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RevenueGauge() {
  const percentage = 80;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          "#9B59B6",
          "#FFFFFF",
        ],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-secondary-900)]">Revenus</h3>
        <button className="text-sm text-[var(--color-primary-300)] hover:underline">
          Voir plus →
        </button>
      </div>

      {/* Numbers */}
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-[var(--color-secondary-900)]">6 078,76 DT</p>
          <p className="text-sm text-[var(--color-secondary-500)]">+48% vs mois dernier</p>
        </div>

        {/* Gauge */}
        <div className="relative mx-auto h-40 w-full">
          <Doughnut data={data} options={options} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="text-4xl font-bold text-[var(--color-primary-500)]">{percentage}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}