// lib/KPIService.js
import adminApiClient from "../lib/adminApiClient";

export const KPIService = {
  getKPI: async ({ mode, start, end }) => {
    try {
      const params = new URLSearchParams();
      if (mode) params.append("mode", mode);
      if (start) params.append("start", start);
      if (end) params.append("end", end);

      const response = await adminApiClient.get(`/orders/kpi?${params.toString()}`);
      return response.data; // should contain total, trendText, labels, sparkline
    } catch (error) {
      console.error("Failed to fetch KPI", error);
      throw error;
    }
  },
};
