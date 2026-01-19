import { useState } from "react";
import FilterService from "../services/filterService";

export function useFilters() {
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await FilterService.getAll();
      setFilters(res.data);
    } finally {
      setLoading(false);
    }
  };

  return { filters, loading, load };
}
