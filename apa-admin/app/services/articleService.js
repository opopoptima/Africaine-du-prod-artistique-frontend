import adminApiClient from "../lib/adminApiClient";
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
    const params = { page, limit, q, sort, ...filters, t: Date.now() };

    const response = await adminApiClient.get("/articles", {
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
   * NOTE: Returns RAW article data for edit form compatibility
   ---------------------------------------- */
  getById: async (id) => {
    const response = await adminApiClient.get(`/articles/${id}`);

    // Extract data from nested structure
    const responseData = response.data?.data || response.data;
    const articleData = responseData?.article || responseData;

    const relatedByCollection = Array.isArray(responseData?.relatedByCollection)
      ? responseData.relatedByCollection
      : [];
    const relatedByLanguageOrType = Array.isArray(responseData?.relatedByLanguageOrType)
      ? responseData.relatedByLanguageOrType
      : [];

    // Return RAW article data (do NOT normalize for edit form)
    return {
      success: response.data?.success ?? true,
      data: {
        article: articleData, // Keep original field names
        relatedByCollection: relatedByCollection.map((item) => BookModel(item)),
        relatedByLanguageOrType: relatedByLanguageOrType.map((item) => BookModel(item)),
      },
    };
  },

  /** ----------------------------------------
   * CREATE ARTICLE
   * POST /articles
   ---------------------------------------- */
  create: async (formData, options = {}) => {
    const response = await adminApiClient.post("/articles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...options,
    });

    const articleData = response.data?.data || response.data;
    const normalizedArticle = BookModel(articleData);
    return { ...response, data: normalizedArticle };
  },

  /** ----------------------------------------
   * UPDATE ARTICLE
   * PUT /articles/:id
   ---------------------------------------- */
  update: async (id, formData, options = {}) => {
    const response = await adminApiClient.put(`/articles/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...options,
    });

    const articleData = response.data?.data || response.data;
    const normalizedArticle = BookModel(articleData);
    return { ...response, data: normalizedArticle };
  },

  /** ----------------------------------------
   * DELETE ARTICLE
   * DELETE /articles/:id
   ---------------------------------------- */
  delete: async (id) => {
    const response = await adminApiClient.delete(`/articles/${id}`);
    return response;
  },
};