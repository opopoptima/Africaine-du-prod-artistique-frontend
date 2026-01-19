import adminApiClient from "../lib/adminApiClient";

/**
 * Service de gestion des filtres (Admin)
 * Utilise le même client Axios que ArticleService
 * => cohérence, auth, baseURL déjà configurée
 */

const FilterService = {
  /** ----------------------------------------
   * GET ALL FILTER CONFIGS (ADMIN)
   * GET /filter-configs
   * Retourne la liste des filtres avec itemsCount calculé côté backend
   ---------------------------------------- */
  getAll: async () => {
    const response = await adminApiClient.get("/filter-configs");

    return {
      success: response.data?.success ?? true,
      data: response.data?.data ?? [],
    };
  },

  /** ----------------------------------------
   * GET ACTIVE FILTERS (FRONTEND SIDEBAR)
   * GET /filter-configs/active/frontend
   * Retourne les filtres + valeurs distinctes
   ---------------------------------------- */
  getActiveForFrontend: async () => {
    const response = await adminApiClient.get(
      "/filter-configs/active/frontend"
    );

    return {
      success: response.data?.success ?? true,
      data: response.data?.data ?? [],
    };
  },

  /** ----------------------------------------
   * CREATE FILTER
   * POST /filter-configs
   ---------------------------------------- */
  create: async (data) => {
    const response = await adminApiClient.post("/filter-configs", data);

    return {
      success: response.data?.success ?? true,
      data: response.data?.data,
    };
  },

  /** ----------------------------------------
   * UPDATE FILTER
   * PUT /filter-configs/:id
   ---------------------------------------- */
  update: async (id, data) => {
    const response = await adminApiClient.put(
      `/filter-configs/${id}`,
      data
    );

    return {
      success: response.data?.success ?? true,
      data: response.data?.data,
    };
  },

  getById: async (id) => {
  const response = await adminApiClient.get(`/filter-configs/${id}`);

  return {
    success: response.data?.success ?? true,
    data: response.data?.data,
  };
},


  /** ----------------------------------------
   * DELETE FILTER
   * DELETE /filter-configs/:id
   ---------------------------------------- */
  delete: async (id) => {
    const response = await adminApiClient.delete(
      `/filter-configs/${id}`
    );

    return {
      success: response.data?.success ?? true,
    };
  },
};

export default FilterService;
