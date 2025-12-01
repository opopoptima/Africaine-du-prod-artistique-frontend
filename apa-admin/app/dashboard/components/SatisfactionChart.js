"use client";

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

export default function SatisfactionChart() {
  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Satisfaction",
        data: [55, 60, 65, 70, 75, 80, 85],
        borderColor: "#9B59B6",
        backgroundColor: "rgba(155, 89, 182, 0.3)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#FFFFFF",
        titleColor: "#000000",
        bodyColor: "#000000",
        borderColor: "rgba(97, 97, 97, 0.2)",
        borderWidth: 1,
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-secondary-900)]">Satisfaction Client</h3>
        <button className="text-sm text-[var(--color-primary-300)] hover:underline">
          Voir plus →
        </button>
      </div>

      {/* Line Chart */}
      <div className="mb-4 h-40">
        <Line data={data} options={options} />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around text-sm">
        <div>
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--color-primary-500)]"></span>
          <span className="text-[var(--color-secondary-700)]">Mois dernier</span>
          <span className="ml-2 font-semibold text-[var(--color-primary-500)]">82%</span>
        </div>
        <div>
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--color-secondary-500)]"></span>
          <span className="text-[var(--color-secondary-700)]">Ce mois ci</span>
          <span className="ml-2 font-semibold text-[var(--color-secondary-500)]">91%</span>
        </div>
      </div>
    </Card>
  );
}