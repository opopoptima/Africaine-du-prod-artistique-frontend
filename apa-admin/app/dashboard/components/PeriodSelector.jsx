"use client";

export default function PeriodSelector({ mode, setMode, period, setPeriod }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Mode Buttons */}
      <div className="flex flex-wrap gap-3">
        {["day", "quarter", "year", "custom"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`
              px-5 py-2 rounded-xl font-medium text-sm shadow-sm
              transition-colors duration-200
              ${
                mode === m
                  ? "bg-[var(--color-primary-300)] text-white shadow-md"
                  : "bg-card text-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)]"
              }
            `}
          >
            {label(m)}
          </button>
        ))}
      </div>

      {/* Custom Date Inputs */}
      {mode === "custom" && (
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="date"
            value={period.start}
            onChange={(e) =>
              setPeriod({ ...period, start: e.target.value })
            }
            className="px-4 py-2 rounded-xl border border-[var(--color-border)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
          />
          <span className="text-sm font-medium text-[var(--color-primary-300)]">
            à
          </span>
          <input
            type="date"
            value={period.end}
            onChange={(e) =>
              setPeriod({ ...period, end: e.target.value })
            }
            className="px-4 py-2 rounded-xl border border-[var(--color-border)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
          />
        </div>
      )}
    </div>
  );
}

function label(m) {
  if (m === "day") return "Par jour";
  if (m === "quarter") return "Par trimestre";
  if (m === "year") return "Par année";
  return "Période personnalisée";
}
