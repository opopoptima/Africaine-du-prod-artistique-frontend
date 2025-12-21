"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { ArticleService } from "../../services/articleService";
import { useSearchParams, useRouter } from "next/navigation";

// Composants réutilisables
const FormField = ({ label, children }) => (
  <div className="flex items-center gap-4 py-1.5">
    <label className="w-40 text-sm text-label shrink-0">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

const FormInput = ({ name, value, onChange, placeholder, type = "text", required = false }) => {
  const isInvalid = required && value.toString().trim() === "";
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full max-w-md h-8 px-3 border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary
        ${isInvalid ? "border-red-500" : "border-border"}`}
    />
  );
};


const FormTextArea = ({ name, value, onChange, placeholder, rows = 3, required = false }) => {
  const isInvalid = required && value.toString().trim() === "";
  return (
    <textarea
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary
        ${isInvalid ? "border-red-500" : "border-border"}`}
    />
  );
};


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
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files);
          if (selectedFiles.length + files.length > 3) {
            alert("Vous ne pouvez pas ajouter plus de 3 images.");
            return;
          }
          setFiles([...files, ...selectedFiles]);
        }}
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
  const articleId = articleIdProp || searchParams.get("id");

  const initialForm = {
    title: "", author: "", publisher: "", isbn: "", category: "",
    subCategory: "", recommendedAge: "", language: "", type: "",
    dimensions: "", collection: "", schoolLevel: "", price: "", promo: "",
    stock: "", isNew: false, isBestSeller: false, description: "", summary: "", objectives: ""
  };

  const [form, setForm] = useState(initialForm);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [pdfExtrait, setPdfExtrait] = useState(null);
  const [technicalFile, setTechnicalFile] = useState(null);
  const [printedFile, setPrintedFile] = useState(null);

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
        const response = await ArticleService.getById(articleId);
        console.log("Réponse complète:", response);
        
        // La structure est: { success: true, data: { article, relatedByCollection, relatedByLanguageOrType } }
        const article = response.data?.article;
        console.log("Article récupéré:", article);

        if (!article) {
          setMessage("❌ Article non trouvé.");
          return;
        }
        
        setForm({
          title: article.title || "",
          author: article.author || "",
          publisher: article.publisher || "",
          isbn: article.isbn || "",
          category: article.category || "",
          subCategory: article.subCategory || "",
          pages: article.pages || "",
          language: article.language || "",
          type: article.type || "",
          dimensions: article.dimensions || "",
          collection: article.collection?._id || article.collection || "",
          schoolLevel: article.schoolLevel || "",
          price: article.price?.toString() || "",
          promo: article.promo?.toString() || "",
          stock: article.stock?.toString() || "",
          isNew: article.isNew || false,
          isBestSeller: article.isBestSeller || false,
          description: article.description || "",
          summary: article.summary || "",
          objectives: article.objectives || "",
        });
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

  // Validation de tous les champs requis
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
    { field: "promo", label: "Promo" },
    { field: "stock", label: "Quantité" },
    { field: "description", label: "Description" },
    { field: "summary", label: "Résumé" },
    { field: "objectives", label: "Objectifs pédagogiques" },
  ];

  for (const { field, label } of requiredFields) {
    if (!form[field] || form[field].toString().trim() === "") {
      setMessage(`❌ Le champ "${label}" est requis.`);
      setLoading(false);
      return;
    }
  }

  // Stock minimum 1
  if (Number(form.stock) < 1) {
    setMessage("❌ La quantité minimale est de 1.");
    setLoading(false);
    return;
  }

  // Fichiers requis
  if (!cover) {
    setMessage("❌ La couverture est requise.");
    setLoading(false);
    return;
  }
  if (!pdfExtrait) {
    setMessage("❌ Le PDF extrait est requis.");
    setLoading(false);
    return;
  }
  if (!technicalFile) {
    setMessage("❌ La fiche technique est requise.");
    setLoading(false);
    return;
  }
  if (!printedFile) {
    setMessage("❌ La fiche imprimée est requise.");
    setLoading(false);
    return;
  }

  // Limite des images (1 à 3)
  if (images.length < 1) {
    setMessage("❌ Au moins une image est requise.");
    setLoading(false);
    return;
  }
  if (images.length > 3) {
    setMessage("❌ Vous ne pouvez pas ajouter plus de 3 images.");
    setLoading(false);
    return;
  }

  try {
    const data = new FormData();

    // Ajouter tous les champs
    Object.entries(form).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (typeof value === "boolean") {
        data.append(key, value.toString());
      } else if (["price", "promo", "stock"].includes(key)) {
        data.append(key, Number(value).toString());
      } else {
        data.append(key, value);
      }
    });

    // Ajouter les fichiers
    data.append("cover", cover);
    images.forEach(img => data.append("images", img));
    data.append("pdfExtrait", pdfExtrait);
    data.append("technicalFile", technicalFile);
    data.append("printedFile", printedFile);

    // Création ou mise à jour
    if (articleId && articleId !== "new") {
      const response = await ArticleService.update(articleId, data);
      setMessage("✅ Article mis à jour !");
      setTimeout(() => router.push("/admin/articles"), 1500);
    } else {
      const response = await ArticleService.create(data);
      setMessage("✅ Article ajouté !");
      setForm(initialForm);
      setCover(null);
      setImages([]);
      setPdfExtrait(null);
      setTechnicalFile(null);
      setPrintedFile(null);
    }
  } catch (err) {
    console.error("Erreur lors de l'enregistrement :", err);
    setMessage("❌ Erreur lors de l'enregistrement.");
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
          <FormField label="Langue :"><FormInput name="language" value={form.language} onChange={handleChange} /></FormField>
          <FormField label="N° de pages :"><FormInput name="pages" value={form.pages} onChange={handleChange} /></FormField>
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
          <FormField label="PDF extrait :">
  <UploadBox
    file={pdfExtrait}
    setFile={setPdfExtrait}
    label="Upload PDF"
  />
</FormField>

<FormField label="Fiche technique (PDF) :">
  <UploadBox
    file={technicalFile}
    setFile={setTechnicalFile}
    label="Upload PDF"
  />
</FormField>

<FormField label="Fiche imprimée (PDF) :">
  <UploadBox
    file={printedFile}
    setFile={setPrintedFile}
    label="Upload PDF"
  />
</FormField>

        </Section>

        {/* Stock */}
        <Section title="Stock">
          <FormField label="Quantité :" required>
  <FormInput
    name="stock"
    value={form.stock}
    onChange={(e) => {
      const value = Number(e.target.value);
      setForm((prev) => ({
        ...prev,
        stock: value < 1 || isNaN(value) ? 1 : value
      }));
    }}
    type="number"
    min={1} // Prevent using keyboard arrows to go below 1
    required
  />
</FormField>

<FormField label="Statut produit :">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="isNew"
      checked={form.isNew}
      onChange={handleChange}
      className="w-4 h-4"
    />
    <span>Nouvel article</span>
  </label>
</FormField>

<FormField label="Statut produit :">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="isBestSeller"
      checked={form.isBestSeller}
      onChange={handleChange}
      className="w-4 h-4"
    />
    <span>Best Seller</span>
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
            disabled={loading || loadingData}
            className="px-6 h-8 py-1 bg-primary-500 text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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

        {message && (
          <div className={`mt-4 p-3 rounded ${
            message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default AjoutArticle;