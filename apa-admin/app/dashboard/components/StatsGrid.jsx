"use client";;
import { Card } from "../../components/ui/card";

export default function StatsGrid({ stats }) {
  return (
    <div className="flex gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid md:grid-rows-1">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative overflow-hidden border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col">
            {/* Icon + Trend */}
            <div className="mb-3 flex items-start justify-between">
              <div className="rounded-full bg-primary-300/10 p-2">
                <stat.icon className="h-5 w-5 text-primary-300" />
              </div>
              
            </div>

            {/* Value */}
            <p className="mb-2 text-3xl font-bold text-primary-500">
              {stat.value}
            </p>

            {/* Label */}
            <p className="mb-2 text-sm font-medium text-primary-300">
              {stat.label}
            </p>

            {/* Trend */}
            <p
              className={`text-xs ${
                stat.isPositive
                  ? "text-secondary-500"
                  : "text-primary-500"
              }`}
            >
              {stat.trend}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
