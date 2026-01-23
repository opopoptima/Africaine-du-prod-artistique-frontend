// /models/Book.js

export function BookModel(data) {
  return {
    id : data._id || null,
    author: data.author || "Unknown Author",
    title: data.title || "Untitled",
    description: data.summary || data.description || "No description",
    cover: data.cover || "/images/default-cover.png",
    images: data.images?.length ? data.images : [data.cover],
    isbn: data.isbn || "N/A",
    dimensions: data.dimensions || "N/A",
    schoolLevel: data.schoolLevel || "N/A",
    pages: data.pages || "N/A",
    language: data.language || "N/A",
    type: data.type || "N/A",
    price: data.promo || "0.00",
    originalPrice: data.price || null,
    stock: data.stock || 0,
    isNew : data.isNew || false,
    isBestSeller : data.isBestSeller || false,
    publisher: data.publisher || "Unknown Publisher",
    category: data.category || "Uncategorized",
    pdfExtrait: data.pdfExtrait || null,
    printedFile: data.printedFile || null,
    technicalFile: data.technicalFile || null,
    collection : data.collection || null,
    objectives : data.objectives || null,
  };
}
