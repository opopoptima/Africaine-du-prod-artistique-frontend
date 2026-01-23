import apiClient from "../lib/apiClient";
import { BookModel } from "../models/BookModel";

export const ArticleService = {
  /** ----------------------------------------
   * GET ALL ARTICLES
   * Supports:
   * - Pagination: page & limit
   * - Search: q
   * - Dynamic filters: language, type, schoolLevel, etc.
   * - Sorting: sort=field:asc|desc
   * Example: /articles?page=1&limit=10&q=roman&type=roman&language=fr&sort=price:asc
   ---------------------------------------- */
  getAll: async ({
  page = 1,
  limit = 20,
  q = "",
  sort = "createdAt:desc",
  filters = {},
} = {}) => {
  const params = { page, limit, q, sort, ...filters, t: Date.now() }; // cache-busting

  const response = await apiClient.get("/articles", {
    params,
  });

  const articles = Array.isArray(response.data?.data) ? response.data.data : [];
  const meta = response.data?.meta || { total: 0, page: 1, limit: 20, pages: 0 };

  const normalizedArticles = articles.map((item) => BookModel(item));

  return {
    success: response.data?.success ?? true,
    data: normalizedArticles,
    meta,
  };
},


  /** ----------------------------------------
   * GET ARTICLE BY ID
   * GET /articles/:id
   * Returns: { article, relatedByCollection, relatedByLanguageOrType }
   ---------------------------------------- */
  getById: async (id) => {
  const response = await apiClient.get(`/articles/${id}`);

  const payload = response.data;

  const article = payload?.data?.article;
    const relatedByLanguageOrType = Array.isArray(payload?.data?.relatedByLanguageOrType)
      ? payload.data.relatedByLanguageOrType
      : [];

    const relatedByCollection = Array.isArray(payload?.data?.relatedByCollection)
      ? payload.data.relatedByCollection
      : [];

  // Normalize main article
  const normalizedArticle = article ? BookModel(article) : null;

  // Normalize related articles
  const normalizedRelatedByLanguageOrType =
    relatedByLanguageOrType.map((item) => BookModel(item));
  // Normalize related articles
  const normalizedRelatedByCollection =
    relatedByCollection.map((item) => BookModel(item));

  return {
    success: payload?.success ?? true,
    data: {
      article: normalizedArticle,
      relatedByLanguageOrType: normalizedRelatedByLanguageOrType,
      relatedByCollection: normalizedRelatedByCollection,
    },
  };
},


  /** ----------------------------------------
   * CREATE ARTICLE
   * POST /articles
   ---------------------------------------- */
  create: async (formData) => {
    const response = await apiClient.post("/articles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const normalizedArticle = BookModel(response.data);
    return { ...response, data: normalizedArticle };
  },

};

