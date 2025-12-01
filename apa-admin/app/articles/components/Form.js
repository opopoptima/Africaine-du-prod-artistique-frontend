"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { ArticleService } from "../../services/articleService";
import { useSearchParams, useRouter } from "next/navigation";

// Composants réutilisables
const FormField = ({ label, children }) => (
  <div className="flex items-center gap-4 py-1.5">
    <label className="w-40 text-sm text-label flex-shrink-0">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

const FormInput = ({ name, value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full max-w-md h-8 px-3 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
  />
);

const FormTextArea = ({ name, value, onChange, placeholder, rows = 3 }) => (
  <textarea
    rows={rows}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-3 py-2 border border-border rounded bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
  />
);

const UploadBox = ({ file, setFile, label, subtitle }) => (
  <div className="flex flex-col items-center">
    <label className="cursor-pointer">
      <div className="w-28 h-28 border-2 border-dashed border-upload-border rounded flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-background">
        <Upload className="w-6 h-6 text-upload-icon" />
        <span className="text-xs text-primary font-medium">{label}</span>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
    </label>
    {subtitle && <span className="mt-2 text-xs text-muted-foreground">{subtitle}</span>}
    {file && <span className="mt-1 text-xs text-primary truncate max-w-28">{file.name}</span>}
  </div>
);

const MultiUploadBox = ({ files, setFiles, label, subtitle }) => (
  <div className="flex flex-col items-center">
    <label className="cursor-pointer">
      <div className="w-28 h-28 border-2 border-dashed border-upload-border rounded flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-background">
        <Upload className="w-6 h-6 text-upload-icon" />
        <span className="text-xs text-primary font-medium">{label}</span>
      </div>
      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => setFiles([...e.target.files])}
      />
    </label>
    {subtitle && <span className="mt-2 text-xs text-muted-foreground">{subtitle}</span>}
    {files.length > 0 && (
      <span className="mt-1 text-xs text-primary truncate max-w-28">
        {files.map(f => f.name).join(", ")}
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

const AjoutArticle = ({ articleId: articleIdProp }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Utiliser la prop si fournie, sinon chercher dans les query params
  const articleId = articleIdProp || searchParams.get("id"); // "new" ou un ID existant

  const initialForm = {
    title: "", author: "", publisher: "", isbn: "", category: "",
    subCategory: "", recommendedAge: "", language: "", type: "",
    dimensions: "", collection: "", schoolLevel: "", price: "", promo: "",
    stock: "", isNew: false, description: "", summary: "", objectives: ""
  };

  const [form, setForm] = useState(initialForm);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [pdfExtrait, setPdfExtrait] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [message, setMessage] = useState("");

  // Pré-remplir le formulaire si modification
  useEffect(() => {
    if (!articleId || articleId === "new") {
      setLoadingData(false);
      return;
    }

    const fetchArticle = async () => {
      setLoadingData(true);
      try {
        console.log("Récupération de l'article avec ID:", articleId);
        const res = await ArticleService.getById(articleId);
        console.log("Réponse API:", res);
        const article = res.data?.data?.article;
        console.log("Article récupéré:", article);

        
        setForm({
          title: article.title || "",
          author: article.author || "",
          publisher: article.publisher || "",
          isbn: article.isbn || "",
          category: article.category || "",
          subCategory: article.subCategory || "",
          recommendedAge: article.recommendedAge || "",
          language: article.language || "",
          type: article.type || "",
          dimensions: article.dimensions || "",
          collection: article.collection || "",
          schoolLevel: article.schoolLevel || "",
          price: article.price?.toString() || "",
          promo: article.promo?.toString() || "",
          stock: article.stock?.toString() || "",
          isNew: article.isNew || false,
          description: article.description || "",
          summary: article.summary || "",
          objectives: article.objectives || "",
        });
        // fichiers existants (généralement des URLs, pas des fichiers)
        // Note: Les fichiers existants sont généralement des URLs, pas des File objects
        // setCover(article.cover || null);
        // setImages(article.images || []);
        // setPdfExtrait(article.pdfExtrait || null);
        // setPdfFile(article.pdfFile || null);
        // setPreviewFile(article.previewFile || null);
      } catch (err) {
        console.error("Erreur récupération article :", err);
        setMessage("❌ Erreur lors de la récupération de l'article.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  // Validation basique des champs requis
  if (!form.title || form.title.trim() === "") {
    setMessage("❌ Le titre est requis.");
    setLoading(false);
    return;
  }
  if (!form.type || form.type.trim() === "") {
    setMessage("❌ Le type est requis.");
    setLoading(false);
    return;
  }
  if (!form.language || form.language.trim() === "") {
    setMessage("❌ La langue est requise.");
    setLoading(false);
    return;
  }

  try {
    const data = new FormData();

    // Ajouter tous les champs du formulaire
    Object.entries(form).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      // Ne pas envoyer les ObjectId vides (ex: collection)
      if (key === "collection" && value === "") return;

      // Convertir les booléens en string
      if (typeof value === "boolean") {
        data.append(key, value.toString());
      } 
      // Pour les champs numériques
      else if (["price", "promo", "stock"].includes(key)) {
        if (value !== "") {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            data.append(key, numValue.toString());
          }
        }
      } 
      // Pour les autres champs texte
      else {
        data.append(key, value);
      }
    });

    // Ajouter les fichiers
    if (cover) data.append("cover", cover);
    images.forEach(img => { if (img) data.append("images", img); });
    if (pdfExtrait) data.append("pdfExtrait", pdfExtrait);
    if (pdfFile) data.append("pdfFile", pdfFile);
    if (previewFile) data.append("previewFile", previewFile);

    // Log pour déboguer
    console.log("=== DONNÉES ENVOYÉES ===");
    for (let [key, value] of data.entries()) {
      const displayValue = value instanceof File 
        ? `[File: ${value.name}, size: ${value.size}]` 
        : value;
      console.log(`${key}:`, displayValue);
    }
    console.log("======================");

    // Création ou mise à jour
    if (articleId && articleId !== "new") {
      const response = await ArticleService.update(articleId, data);
      console.log("Réponse update:", response);
      setMessage("✅ Article mis à jour !");
    } else {
      const response = await ArticleService.create(data);
      console.log("Réponse create:", response);
      setMessage("✅ Article ajouté !");
      setForm(initialForm);
      setCover(null);
      setImages([]);
      setPdfExtrait(null);
      setPdfFile(null);
      setPreviewFile(null);
    }
  } catch (err) {
    console.error("=== ERREUR COMPLÈTE ===", err);
    let errorMessage = "Erreur lors de l'enregistrement.";
    if (err.response?.data) {
      if (typeof err.response.data === "string") errorMessage = err.response.data;
      else if (err.response.data.message) errorMessage = err.response.data.message;
      else if (err.response.data.error) errorMessage = err.response.data.error;
      else if (Array.isArray(err.response.data)) errorMessage = err.response.data.join(", ");
      else errorMessage = JSON.stringify(err.response.data);
    } else if (err.message) {
      errorMessage = err.message;
    }
    setMessage(`❌ ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};



  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-lg font-semibold text-primary-500 mb-4 pl-3">
          {articleId && articleId !== "new" ? "MODIFICATION ARTICLE" : "FICHE ARTICLE"}
        </h1>
        
        {loadingData && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-700">Chargement des données de l'article...</p>
          </div>
        )}

        {/* Informations générales */}
        <Section title="Informations générales">
          <FormField label="Titre :"><FormInput name="title" value={form.title} onChange={handleChange} /></FormField>
          <FormField label="Auteur :"><FormInput name="author" value={form.author} onChange={handleChange} /></FormField>
          <FormField label="Maison d'édition :"><FormInput name="publisher" value={form.publisher} onChange={handleChange} /></FormField>
          <FormField label="ISBN :"><FormInput name="isbn" value={form.isbn} onChange={handleChange} /></FormField>
          <FormField label="Catégorie :"><FormInput name="category" value={form.category} onChange={handleChange} /></FormField>
          <FormField label="Sous-catégorie :"><FormInput name="subCategory" value={form.subCategory} onChange={handleChange} /></FormField>
          <FormField label="Âge conseillé :"><FormInput name="recommendedAge" value={form.recommendedAge} onChange={handleChange} /></FormField>
          <FormField label="Langue :"><FormInput name="language" value={form.language} onChange={handleChange} /></FormField>
          <FormField label="Dimensions :"><FormInput name="dimensions" value={form.dimensions} onChange={handleChange} /></FormField>
          <FormField label="Type :"><FormInput name="type" value={form.type} onChange={handleChange} /></FormField>
          <FormField label="Collection :"><FormInput name="collection" value={form.collection} onChange={handleChange} /></FormField>
          <FormField label="Niveau scolaire :"><FormInput name="schoolLevel" value={form.schoolLevel} onChange={handleChange} /></FormField>
        </Section>

        {/* Tarification */}
        <Section title="Tarification">
          <FormField label="Prix :"><FormInput name="price" value={form.price} onChange={handleChange} type="number" /></FormField>
          <FormField label="Promo :"><FormInput name="promo" value={form.promo} onChange={handleChange} type="number" /></FormField>
        </Section>

        {/* Images & fichiers */}
        <Section title="Images & fichiers">
          <FormField label="Couverture :"><UploadBox file={cover} setFile={setCover} label="Upload Image" /></FormField>
          <FormField label="Images (3 max) :"><MultiUploadBox files={images} setFiles={setImages} label="Upload more" subtitle="Image" /></FormField>
          <FormField label="PDF extrait :"><UploadBox file={pdfExtrait} setFile={setPdfExtrait} label="Upload PDF" /></FormField>
          <FormField label="PDF Fiches Techniques :"><UploadBox file={pdfFile} setFile={setPdfFile} label="Upload PDF" /></FormField>
          <FormField label="PDF Fiches Imprimées :"><UploadBox file={previewFile} setFile={setPreviewFile} label="Upload PDF" /></FormField>
        </Section>

        {/* Stock */}
        <Section title="Stock">
          <FormField label="Quantité :"><FormInput name="stock" value={form.stock} onChange={handleChange} type="number" /></FormField>
          <FormField label="Statut produit :">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} className="w-4 h-4" />
              <span>Nouvel article</span>
            </label>
          </FormField>
        </Section>

        {/* Description */}
        <Section title="Description">
          <FormField label="Description :"><FormTextArea name="description" value={form.description} onChange={handleChange} rows={5} /></FormField>
          <FormField label="Résumé :"><FormTextArea name="summary" value={form.summary} onChange={handleChange} rows={4} /></FormField>
          <FormField label="Objectifs pédagogiques :"><FormTextArea name="objectives" value={form.objectives} onChange={handleChange} rows={4} /></FormField>
        </Section>

        {/* Boutons */}
        <div className="flex justify-end gap-4 pt-4 pr-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 h-8 py-1 bg-primary-500 text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {loading ? "Envoi..." : "Enregistrer"}
          </button>

          <button
            type="button"
            className="px-6 h-8 py-1 border border-primary-500 text-primary-500 rounded-lg font-medium text-sm hover:bg-muted transition"
            onClick={() => router.back()}
          >
            Annuler
          </button>
        </div>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </form>
  );
};

export default AjoutArticle;
