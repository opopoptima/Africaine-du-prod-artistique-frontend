const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const newsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) throw new Error("Erreur lors du chargement des actualités");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (!response.ok) throw new Error("Actualité non trouvée");
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la création");
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la mise à jour");
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression");
    return response.json();
  },
};
