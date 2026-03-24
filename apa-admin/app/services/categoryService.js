import adminApiClient from "../lib/adminApiClient";

const CategoryService = {
  // GET all categories (admin)
  getAll: async () => {
    const response = await adminApiClient.get("/categories");
    return {
      success: response.data?.success ?? true,
      data: response.data?.data ?? [],
    };
  },

  // GET active categories only (frontend / article forms)
  getActive: async () => {
    const response = await adminApiClient.get("/categories/active");
    return {
      success: response.data?.success ?? true,
      data: response.data?.data ?? [],
    };
  },

  // GET category by ID
  getById: async (id) => {
    const response = await adminApiClient.get(`/categories/${id}`);
    return {
      success: response.data?.success ?? true,
      data: response.data?.data,
    };
  },

  // CREATE category
  create: async (data) => {
    const response = await adminApiClient.post("/categories", data);
    return {
      success: response.data?.success ?? true,
      data: response.data?.data,
    };
  },

  // UPDATE category
  update: async (id, data) => {
    const response = await adminApiClient.put(`/categories/${id}`, data);
    return {
      success: response.data?.success ?? true,
      data: response.data?.data,
    };
  },

  // DELETE category
  delete: async (id) => {
    const response = await adminApiClient.delete(`/categories/${id}`);
    return {
      success: response.data?.success ?? true,
    };
  },
};

export default CategoryService;
