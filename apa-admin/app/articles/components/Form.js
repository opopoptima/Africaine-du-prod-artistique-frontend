"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { ArticleService } from "../../services/articleService";
import CategoryService from "../../services/categoryService";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";

// ────────────────────────────────────────────────
// Reusable form components
// ────────────────────────────────────────────────

const FormField = ({ label, children, required }) => (
  <div className="flex items-center gap-4 py-1.5">
    <label className="w-40 text-sm text-label shrink-0">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex-1">{children}</div>
  </div>
);

const FormInput = ({ name, value, onChange, placeholder, type = "text", required = false }) => {
  const isInvalid = required && value?.toString().trim() === "";
  return (
    <input
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full max-w-md h-8 px-3 border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary
        ${isInvalid ? "border-red-500" : "border-border"}`}
    />
  );
};

const FormSelect = ({ name, value, onChange, options, placeholder, required = false }) => {
  const isInvalid = required && (!value || value.toString().trim() === "");
  return (
    <select
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className={`w-full max-w-md h-8 px-3 border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary
        ${isInvalid ? "border-red-500" : "border-border"}`}
    >
      <option value="" disabled>{placeholder || "Sélectionnez..."}</option>
      {options.map((opt) => (
        <option key={opt._id} value={opt._id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
};

const FormTextArea = ({ name, value, onChange, placeholder, rows = 3, required = false }) => {
  const isInvalid = required && value?.toString().trim() === "";
  return (
    <textarea
      rows={rows}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary
        ${isInvalid ? "border-red-500" : "border-border"}`}
    />
  );
};

const UploadBox = ({ file, setFile, label, subtitle, preview, setPreview, existingUrl }) => (
  <div className="flex flex-col items-center">
    <div className="w-28 h-28 border-2 border-dashed border-upload-border rounded flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-background relative overflow-hidden">
      {preview || existingUrl ? (
        <div className="relative w-full h-full">
          <img
            src={preview || existingUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              setPreview("");
            }}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
          <Upload className="w-6 h-6 text-upload-icon" />
          <span className="text-xs text-primary font-medium">{label}</span>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
                // Create preview for images
                if (selectedFile.type.startsWith('image/')) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreview(reader.result);
                  };
                  reader.readAsDataURL(selectedFile);
                } else {
                  setPreview(""); // For PDFs, no preview
                }
              }
            }}
          />
        </label>
      )}
    </div>
    {subtitle && <span className="mt-2 text-xs text-muted-foreground">{subtitle}</span>}
    {file && <span className="mt-1 text-xs text-primary truncate max-w-28">{file.name}</span>}
    {!file && existingUrl && <span className="mt-1 text-xs text-green-600">Fichier existant</span>}
  </div>
);

const MultiUploadBox = ({ files, setFiles, label, subtitle, previews, setPreviews, existingUrls }) => (
  <div className="flex flex-col items-center">
    <div className="w-28 h-28 border-2 border-dashed border-upload-border rounded flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-background relative overflow-hidden p-2">
      {(previews.length > 0 || existingUrls.length > 0) ? (
        <div className="w-full h-full overflow-y-auto">
          <div className="grid grid-cols-2 gap-1">
            {/* Show existing images */}
            {existingUrls.map((url, idx) => (
              <div key={`existing-${idx}`} className="relative">
                <img
                  src={url}
                  alt={`Existing ${idx}`}
                  className="w-full h-10 object-cover rounded"
                />
              </div>
            ))}
            {/* Show new previews */}
            {previews.map((preview, idx) => (
              <div key={`new-${idx}`} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${idx}`}
                  className="w-full h-10 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviews(prev => prev.filter((_, i) => i !== idx));
                    setFiles(prev => prev.filter((_, i) => i !== idx));
                  }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  <X className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
          <Upload className="w-6 h-6 text-upload-icon" />
          <span className="text-xs text-primary font-medium text-center">{label}</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selected = Array.from(e.target.files || []);
              if (selected.length + files.length + existingUrls.length > 3) {
                alert("Vous ne pouvez pas ajouter plus de 3 images.");
                return;
              }

              // Add new files
              setFiles(prev => [...prev, ...selected]);

              // Create previews
              selected.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviews(prev => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
              });
            }}
          />
        </label>
      )}
    </div>
    {subtitle && <span className="mt-2 text-xs text-muted-foreground">{subtitle}</span>}
    {files.length > 0 && (
      <span className="mt-1 text-xs text-primary text-center max-w-28">
        {files.length} nouvelle(s)
      </span>
    )}
    {existingUrls.length > 0 && files.length === 0 && (
      <span className="mt-1 text-xs text-green-600 text-center">
        {existingUrls.length} existante(s)
      </span>
    )}
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-[#9B59B626] overflow-hidden mb-4">
    <div className="bg-[#9B59B633] px-4 py-2 border-b border-border">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────

export default function AjoutArticle({ articleId }) {
  const router = useRouter();
  const toast = useToast();

  const initialForm = {
    title: "", author: "", publisher: "", isbn: "", category: "",
    subCategory: "", recommendedAge: "", language: "", type: "",
    dimensions: "", collection: "", schoolLevel: "", pages: "",
    price: "", promo: "", stock: "", isNew: false, isBestSeller: false,
    description: "", summary: "", objectives: "", code: ""
  };

  const [form, setForm] = useState(initialForm);

  // File states
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [pdfExtrait, setPdfExtrait] = useState(null);
  const [technicalFile, setTechnicalFile] = useState(null);
  const [printedFile, setPrintedFile] = useState(null);

  // Preview states
  const [coverPreview, setCoverPreview] = useState("");
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [pdfExtraitPreview, setPdfExtraitPreview] = useState("");
  const [technicalFilePreview, setTechnicalFilePreview] = useState("");
  const [printedFilePreview, setPrintedFilePreview] = useState("");

  const [existingFiles, setExistingFiles] = useState({
    cover: "",
    images: [],
    pdfExtrait: "",
    technicalFile: "",
    printedFile: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getActive();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error("Erreur récupération catégories :", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!articleId || articleId === "new") {
      setLoadingData(false);
      return;
    }

    const fetchArticle = async () => {
      setLoadingData(true);
      try {
        const response = await ArticleService.getById(articleId);
        const article = response?.data?.article;

        console.log("Fetched article:", article);

        if (!article) {
          toast.error("❌ Article non trouvé.");
          return;
        }

        // Map API fields to form fields
        setForm({
          title: article.title || "",
          author: article.author || "",
          publisher: article.publisher || "",
          isbn: article.isbn || "",
          category: article.category?._id || article.category || "",
          subCategory: article.subCategory || "",
          recommendedAge: article.recommendedAge || "",
          language: article.language || "",
          type: article.type || "",
          dimensions: article.dimensions || "",
          collection: article.collection || "",
          schoolLevel: article.schoolLevel || "",
          pages: article.pages != null ? String(article.pages) : "",
          price: article.price != null ? String(article.price) : "",
          promo: article.promo != null ? String(article.promo) : "",
          stock: article.stock != null ? String(article.stock) : "",
          isNew: !!article.isNew,
          isBestSeller: !!article.isBestSeller,
          description: article.description || "",
          summary: article.summary || "",
          objectives: article.objectives || "",
          code: article.code || ""
        });

        setExistingFiles({
          cover: article.cover || "",
          images: Array.isArray(article.images) ? article.images : [],
          pdfExtrait: article.pdfExtrait || "",
          technicalFile: article.technicalFile || "",
          printedFile: article.printedFile || "",
        });
      } catch (err) {
        console.error("Erreur récupération article :", err);
        toast.error("Erreur lors de la récupération de l'article.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      { field: "title", label: "Titre" },
      { field: "author", label: "Auteur" },
      { field: "publisher", label: "Maison d'édition" },
      { field: "isbn", label: "ISBN" },
      { field: "category", label: "Catégorie" },
      { field: "subCategory", label: "Sous-catégorie" },
      { field: "pages", label: "N° de pages" },
      { field: "language", label: "Langue" },
      { field: "type", label: "Type" },
      { field: "dimensions", label: "Dimensions" },
      { field: "collection", label: "Collection" },
      { field: "schoolLevel", label: "Niveau scolaire" },
      { field: "price", label: "Prix" },
      { field: "stock", label: "Quantité" },
      { field: "description", label: "Description" },
      { field: "summary", label: "Résumé" },
      { field: "objectives", label: "Objectifs pédagogiques" },
    ];

    for (const { field, label } of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        toast.error(`Le champ "${label}" est requis.`);
        setLoading(false);
        return;
      }
    }

    if (Number(form.stock) < 1) {
      toast.error("La quantité minimale est de 1.");
      setLoading(false);
      return;
    }

    // Check existing files when editing
    const isEditing = articleId && articleId !== "new";
    if (!cover && (!isEditing || !existingFiles.cover)) {
      toast.error("La couverture est requise.");
      setLoading(false);
      return;
    }
    if (!pdfExtrait && (!isEditing || !existingFiles.pdfExtrait)) {
      toast.error("Le PDF extrait est requis.");
      setLoading(false);
      return;
    }
    if (!technicalFile && (!isEditing || !existingFiles.technicalFile)) {
      toast.error("La fiche technique est requise.");
      setLoading(false);
      return;
    }
    if (!printedFile && (!isEditing || !existingFiles.printedFile)) {
      toast.error("La fiche de lecture est requise.");
      setLoading(false);
      return;
    }
    if (images.length === 0 && (!isEditing || existingFiles.images.length === 0)) {
      toast.error("Au moins une image est requise.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value == null) return;
        if (typeof value === "boolean") {
          data.append(key, value.toString());
        } else if (["price", "promo", "stock", "pages"].includes(key)) {
          data.append(key, Number(value).toString());
        } else {
          data.append(key, value);
        }
      });

      if (cover) data.append("cover", cover);
      images.forEach(img => data.append("images", img));
      if (pdfExtrait) data.append("pdfExtrait", pdfExtrait);
      if (technicalFile) data.append("technicalFile", technicalFile);
      if (printedFile) data.append("printedFile", printedFile);

      try {
        if (isEditing) {
          await ArticleService.update(articleId, data);
          toast.success("✅ Article mis à jour avec succès !");
        } else {
          await ArticleService.create(data);
          toast.success("✅ Article créé avec succès !");
        }

        router.push("/articles");
        router.refresh();
      } catch (err) {
        console.error(err);
        const errorMsg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Erreur lors de l'opération.";

        toast.error(`❌ ${errorMsg}`);
      }
    } catch (err) {
      console.error("Erreur lors de la préparation de l'envoi :", err);
      toast.error("❌ Erreur lors de la préparation de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-primary-500 font-semibold">Chargement des données de l'article...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-lg font-semibold text-primary-500 mb-4 pl-3">
          {articleId && articleId !== "new" ? "MODIFICATION ARTICLE" : "FICHE ARTICLE"}
        </h1>

        <Section title="Informations générales">
          <FormField label="Titre :" required><FormInput name="title" value={form.title} onChange={handleChange} required /></FormField>
          <FormField label="Code langue:"><FormInput name="code" value={form.code} onChange={handleChange} /></FormField>
          <FormField label="Auteur :" required><FormInput name="author" value={form.author} onChange={handleChange} required /></FormField>
          <FormField label="Maison d'édition :" required><FormInput name="publisher" value={form.publisher} onChange={handleChange} required /></FormField>
          <FormField label="ISBN :" required><FormInput name="isbn" value={form.isbn} onChange={handleChange} required /></FormField>
          <FormField label="Catégorie :" required><FormSelect name="category" value={form.category} onChange={handleChange} options={categories} placeholder="Sélectionnez une catégorie" required /></FormField>
          <FormField label="Sous-catégorie :" required><FormInput name="subCategory" value={form.subCategory} onChange={handleChange} required /></FormField>
          <FormField label="Âge recommandé :"><FormInput name="recommendedAge" value={form.recommendedAge} onChange={handleChange} /></FormField>
          <FormField label="Langue :" required><FormInput name="language" value={form.language} onChange={handleChange} required /></FormField>
          <FormField label="Nombre de pages :" required><FormInput name="pages" value={form.pages} onChange={handleChange} type="number" required /></FormField>
          <FormField label="Dimensions :" required><FormInput name="dimensions" value={form.dimensions} onChange={handleChange} required /></FormField>
          <FormField label="Type :" required><FormInput name="type" value={form.type} onChange={handleChange} required /></FormField>
          <FormField label="Collection :" required><FormInput name="collection" value={form.collection} onChange={handleChange} required /></FormField>
          <FormField label="Niveau scolaire :" required><FormInput name="schoolLevel" value={form.schoolLevel} onChange={handleChange} required /></FormField>
        </Section>

        <Section title="Tarification">
          <FormField label="Prix :" required><FormInput name="price" value={form.price} onChange={handleChange} type="number" required /></FormField>
          <FormField label="Promo :"><FormInput name="promo" value={form.promo} onChange={handleChange} type="number" /></FormField>
        </Section>

        <Section title="Images & fichiers">
          <FormField label="Couverture :" required>
            <UploadBox
              file={cover}
              setFile={setCover}
              label="Upload Image"
              preview={coverPreview}
              setPreview={setCoverPreview}
              existingUrl={!cover ? existingFiles.cover : ""}
            />
          </FormField>

          <FormField label="Images (3 max) :" required>
            <MultiUploadBox
              files={images}
              setFiles={setImages}
              label="Upload Images"
              subtitle="Gallery"
              previews={imagesPreviews}
              setPreviews={setImagesPreviews}
              existingUrls={images.length === 0 ? existingFiles.images : []}
            />
          </FormField>

          <FormField label="PDF extrait :" required>
            <UploadBox
              file={pdfExtrait}
              setFile={setPdfExtrait}
              label="Upload PDF"
              preview={pdfExtraitPreview}
              setPreview={setPdfExtraitPreview}
              existingUrl={!pdfExtrait ? existingFiles.pdfExtrait : ""}
            />
          </FormField>

          <FormField label="Fiche technique (PDF) :" required>
            <UploadBox
              file={technicalFile}
              setFile={setTechnicalFile}
              label="Upload PDF"
              preview={technicalFilePreview}
              setPreview={setTechnicalFilePreview}
              existingUrl={!technicalFile ? existingFiles.technicalFile : ""}
            />
          </FormField>

          <FormField label="Fiche de lecture (PDF) :" required>
            <UploadBox
              file={printedFile}
              setFile={setPrintedFile}
              label="Upload PDF"
              preview={printedFilePreview}
              setPreview={setPrintedFilePreview}
              existingUrl={!printedFile ? existingFiles.printedFile : ""}
            />
          </FormField>
        </Section>

        <Section title="Stock">
          <FormField label="Quantité :" required>
            <FormInput
              name="stock"
              value={form.stock}
              onChange={(e) => {
                const val = e.target.value;
                setForm(prev => ({ ...prev, stock: val === "" ? "" : Math.max(1, Number(val)).toString() }));
              }}
              type="number"
              min={1}
            />
          </FormField>

          <FormField label="Nouvel article :">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} className="w-4 h-4" />
              <span>Marquer comme nouveau</span>
            </label>
          </FormField>

          <FormField label="Best Seller :">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isBestSeller" checked={form.isBestSeller} onChange={handleChange} className="w-4 h-4" />
              <span>Marquer comme best seller</span>
            </label>
          </FormField>
        </Section>

        <Section title="Description">
          <FormField label="Description :" required><FormTextArea name="description" value={form.description} onChange={handleChange} rows={5} required /></FormField>
          <FormField label="Résumé :" required><FormTextArea name="summary" value={form.summary} onChange={handleChange} rows={4} required /></FormField>
          <FormField label="Objectifs pédagogiques :" required><FormTextArea name="objectives" value={form.objectives} onChange={handleChange} rows={4} required /></FormField>
        </Section>

        <div className="flex justify-end gap-4 pt-4 pr-2">
          <button
            type="submit"
            disabled={loading || loadingData}
            className="px-6 h-8 py-1 bg-primary-500 text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Envoi...
              </>
            ) : (
              "Enregistrer"
            )}
          </button>

          <button
            type="button"
            className="px-6 h-8 py-1 border border-primary-500 text-primary-500 rounded-lg font-medium text-sm hover:bg-muted transition"
            onClick={() => router.back()}
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
}
