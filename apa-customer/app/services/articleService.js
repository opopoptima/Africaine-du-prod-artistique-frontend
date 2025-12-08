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
    // API returns: { success: true, data: { article, relatedByCollection, relatedByLanguageOrType } }
    const articleData = response.data?.article || response.data;
    const relatedByCollection = Array.isArray(response.data?.relatedByCollection) 
      ? response.data.relatedByCollection 
      : [];
    const relatedByLanguageOrType = Array.isArray(response.data?.relatedByLanguageOrType) 
      ? response.data.relatedByLanguageOrType 
      : [];
    // Normalize the main article
    const normalizedArticle = BookModel(articleData.data.article);

    // Normalize related articles
    const normalizedRelatedByCollection = relatedByCollection.map((item) => BookModel(item));
    const normalizedRelatedByLanguageOrType = relatedByLanguageOrType.map((item) => BookModel(item));

    return {
      success: response.success ?? true,
      data: {
        article: normalizedArticle,
        relatedByCollection: normalizedRelatedByCollection,
        relatedByLanguageOrType: normalizedRelatedByLanguageOrType,
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

