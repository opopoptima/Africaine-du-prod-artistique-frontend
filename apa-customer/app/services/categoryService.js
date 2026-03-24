import apiClient from "../lib/apiClient";

export const CategoryService = {
  /** ----------------------------------------
   * GET ACTIVE CATEGORIES
   * GET /categories/active
   * Returns active categories for the frontend
   ---------------------------------------- */
  getActiveCategories: async () => {
    try {
      const response = await apiClient.get("/categories/active");
      const categories = Array.isArray(response.data?.data) ? response.data.data : [];
      return categories;
    } catch (error) {
      console.error("Error fetching active categories:", error);
      return [];
    }
  },
};
