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

export default function VisitorChart() {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Visiteurs",
        data: [500, 450, 500, 400, 450, 350, 400, 300, 350, 250, 200, 150],
        borderColor: "#4B0082",
        backgroundColor: "rgba(75, 0, 130, 0.3)",
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
      x: {
        grid: { display: false },
        ticks: { color: "#616161" },
      },
      y: {
        grid: { color: "rgba(97, 97, 97, 0.1)" },
        ticks: { color: "#616161" },
      },
    },
  };

  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-secondary-900)]">Informations sur les visiteurs</h3>
        <button className="text-sm text-[var(--color-primary-300)] hover:underline">
          Voir plus →
        </button>
      </div>

      {/* Line Chart */}
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}