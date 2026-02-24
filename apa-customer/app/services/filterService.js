import apiClient from "../lib/apiClient";

export const FilterService = {
  /** ----------------------------------------
   * GET ALL FILTERS (ADMIN)
   * GET /filter-configs
   ---------------------------------------- */
  getAll: async () => {
    const response = await apiClient.get("/filter-configs");
    const filters = Array.isArray(response.data?.data) ? response.data.data : [];
    return {
      success: response.data?.success ?? true,
      data: filters,
    };
  },

  /** ----------------------------------------
   * GET FILTER BY ID (ADMIN)
   * GET /filter-configs/:id
   ---------------------------------------- */
  getById: async (id) => {
    const response = await apiClient.get(`/filter-configs/${id}`);
    const filter = response.data?.data || null;
    return {
      success: response.data?.success ?? true,
      data: filter,
    };
  },

  /** ----------------------------------------
   * CREATE FILTER (ADMIN)
   * POST /filter-configs
   ---------------------------------------- */
  create: async (formData) => {
    const response = await apiClient.post("/filter-configs", formData);
    const filter = response.data?.data || null;
    return {
      success: response.data?.success ?? true,
      data: filter,
    };
  },

  /** ----------------------------------------
   * UPDATE FILTER (ADMIN)
   * PUT /filter-configs/:id
   ---------------------------------------- */
  update: async (id, formData) => {
    const response = await apiClient.put(`/filter-configs/${id}`, formData);
    const filter = response.data?.data || null;
    return {
      success: response.data?.success ?? true,
      data: filter,
    };
  },

  /** ----------------------------------------
   * DELETE FILTER (ADMIN)
   * DELETE /filter-configs/:id
   ---------------------------------------- */
  delete: async (id) => {
    const response = await apiClient.delete(`/filter-configs/${id}`);
    return {
      success: response.data?.success ?? true,
      data: response.data?.data || null,
    };
  },

  /** ----------------------------------------
   * GET ACTIVE FILTERS FOR FRONTEND
   * GET /filter-configs/active/frontend
   ---------------------------------------- */
  getActiveFrontend: async () => {
    const response = await apiClient.get("/filter-configs/active/frontend");
    const filters = Array.isArray(response.data?.data) ? response.data.data : [];
    return {
      success: response.data?.success ?? true,
      data: filters,
    };
  },
};

export default FilterService;
