"use client";

import { useState, useEffect } from "react";
import { Upload, Bell, Settings, User } from "lucide-react";
import { ArticleService } from "../../services/articleService";
import { useSearchParams, useRouter } from "next/navigation";

// Composants réutilisables
const FormField = ({ label, children }) => (
  <div className="flex items-center gap-4 py-1.5">
    <label className="w-40 text-sm text-label flex-shrink-0">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

const UploadBox = ({ file, setFile, label, subtitle }) => (
  <div className="flex flex-col items-center">
    <label className="cursor-pointer">
      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary-500 transition-colors bg-gray-50">
        <Upload className="w-7 h-7 text-primary-500" />
        <span className="text-sm text-primary-500 font-medium">{label}</span>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
    </label>
    {subtitle && <span className="mt-2 text-xs text-gray-500">{subtitle}</span>}
    {file && (
      <span className="mt-1 text-sm text-primary-500 truncate max-w-32">
        {file.name}
      </span>
    )}
  </div>
);

const MultiUploadBox = ({ files, setFiles, label, subtitle }) => (
  <div className="flex flex-col items-center">
    <label className="cursor-pointer">
      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary-500 transition-colors bg-gray-50">
        <Upload className="w-7 h-7 text-primary-500" />
        <span className="text-sm text-primary-500 font-medium">{label}</span>
      </div>
      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => setFiles([...e.target.files])}
      />
    </label>
    {subtitle && <span className="mt-2 text-xs text-gray-500">{subtitle}</span>}
    {files.length > 0 && (
      <span className="mt-1 text-sm text-primary-500 truncate max-w-32">
        {files.map((f) => f.name).join(", ")}
      </span>
    )}
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
        const res = await ArticleService.getById(articleId);
        const article = res.data?.data?.article;

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
          statut: article.statut || "",
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

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === "collection" && value === "") return;

        if (typeof value === "boolean") data.append(key, value.toString());
        else if (["price", "promo", "stock"].includes(key) && value !== "") data.append(key, Number(value).toString());
        else data.append(key, value);
      });

      if (cover) data.append("cover", cover);
      images.forEach(img => { if (img) data.append("images", img); });
      if (pdfExtrait) data.append("pdfExtrait", pdfExtrait);
      if (pdfFile) data.append("pdfFile", pdfFile);
      if (previewFile) data.append("previewFile", previewFile);

      if (articleId && articleId !== "new") {
        await ArticleService.update(articleId, data);
        alert("✅ Article mis à jour !");
      } else {
        await ArticleService.create(data);
        alert("✅ Article ajouté !");
        setForm(initialForm);
        setCover(null);
        setImages([]);
        setPdfExtrait(null);
        setPdfFile(null);
        setPreviewFile(null);
      }
      router.push("/articles");
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#4B0082] to-[#9B59B6] px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
            <a href="/articles" className="text-white font-semibold bg-white/20 px-6 py-2 rounded-full">Articles</a>
            <a href="/commandes" className="text-white/80 hover:text-white transition-colors">Commandes</a>
            <a href="/actualites" className="text-white/80 hover:text-white transition-colors">Actualités</a>
            <a href="/filtres" className="text-white/80 hover:text-white transition-colors">Filtres</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="text-sm text-gray-600">
          <a href="/dashboard" className="hover:text-[#4B0082]">Dashboard</a>{" > "}
          <a href="/articles" className="hover:text-[#4B0082]">Articles</a>{" > "}
          <span className="font-semibold text-gray-900">{articleId && articleId !== "new" ? "Modifier" : "Ajouter"}</span>
        </div>
      </div>

      {/* Main Form */}
      <main className="px-8 py-6">
        <div className="relative bg-[#9B59B626] rounded-lg mx-auto" style={{ maxWidth: '1268px' }}>
          <div className="px-7 py-4">
            <h1 className="text-[32px] font-medium text-[#4B0082]" style={{ lineHeight: '48px' }}>
              FICHE ARTICLE
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="px-0 py-8 space-y-8">
            {/* Informations générales */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3 ">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>Informations générales</h2>
            </div>

            <div className="space-y-6 px-15">
              {[
                { label: "Titre", name: "title" },
                { label: "Auteur", name: "author" },
                { label: "Maison d'édition", name: "publisher" },
                { label: "ISBN", name: "isbn" },
                { label: "Catégorie", name: "category" },
                { label: "Sous-catégorie", name: "subCategory" },
                { label: "Âge conseillé", name: "recommendedAge" },
                { label: "Langue", name: "language" },
                { label: "Dimensions", name: "dimensions" },
                { label: "Type", name: "type" },
                { label: "Collection", name: "collection" },
                { label: "Niveau scolaire", name: "schoolLevel" },
              ].map((field) => (
                <div key={field.name} className="flex items-center gap-8">
                  <label className="text-black w-72 text-left font-medium text-xl">{field.label} :</label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-3"
                  />
                </div>
              ))}
            </div>

            {/* Tarification */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>Tarification</h2>
            </div>
            <div className="flex items-center gap-8 px-15">
              <label className="text-black w-72 text-left font-medium text-xl">Prix :</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-3"
              />
            </div>
            <div className="flex items-center gap-8 px-15">
              <label className="text-black w-72 text-left font-medium text-xl">Promo :</label>
              <input
                type="number"
                name="promo"
                value={form.promo}
                onChange={handleChange}
                className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-3"
              />
            </div>

            {/* Images & fichiers */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>Images & fichiers</h2>
            </div>
            <div className="px-15 py-8 space-y-8">
              <div className="flex items-center ml-30">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl flex-shrink-0">Couverture :</label>
                <UploadBox file={cover} setFile={setCover} label="Upload Image" />
              </div>
              <div className="flex items-center ml-30">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl flex-shrink-0">Images (3 max) :</label>
                <MultiUploadBox files={images} setFiles={setImages} label="Upload more" subtitle="Image" />
              </div>
              <div className="flex items-center ml-30">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl flex-shrink-0">PDF extrait :</label>
                <UploadBox file={pdfExtrait} setFile={setPdfExtrait} label="Upload PDF" />
              </div>
              <div className="flex items-center ml-30">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl flex-shrink-0">PDF Fiches Techniques :</label>
                <UploadBox file={pdfFile} setFile={setPdfFile} label="Upload PDF" />
              </div>
              <div className="flex items-center ml-30">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl flex-shrink-0">PDF Fiches Imprimées :</label>
                <UploadBox file={previewFile} setFile={setPreviewFile} label="Upload PDF" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>Description</h2>
            </div>
            <div className="px-15 py-8 space-y-8">
              <div className="flex gap-8">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl">Description :</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className="flex-1 bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] p-2"
                />
              </div>
              <div className="flex gap-8">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl">Résumé :</label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  rows={4}
                  className="flex-1 bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] p-2"
                />
              </div>
              <div className="flex gap-8">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl">Objectifs pédagogiques :</label>
                <textarea
                  name="objectives"
                  value={form.objectives}
                  onChange={handleChange}
                  rows={4}
                  className="flex-1 bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] p-2"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>Stock</h2>
            </div>
            <div className="px-15 py-8 space-y-8">
                            <div className="flex gap-8 items-center">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl">Quantité en stock :</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-3"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label className="text-black w-72 text-left pt-2 font-medium text-xl">Statut :</label>
                <select
                  name="statut"
                  value={form.statut || "" }
                  onChange={handleChange}
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] px-3"
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="En stock">En stock</option>
                  <option value="Rupture">Rupture</option>
                  <option value="Précommande">Précommande</option>
                </select>
              </div>

            </div>

            {/* Bouton d'enregistrement */}
            <div className="flex justify-end gap-6 pt-6 pr-5">
  <button
    type="button"
    onClick={() => router.back()}
    className="w-[187px] h-[45px] bg-[rgba(255,255,255,0.7)] border border-[#4B0082] rounded-lg text-[#4B0082] font-semibold hover:bg-white transition-colors text-xl"
  >
    Annuler
  </button>
  <button
    type="submit"
    disabled={loading}
    className="w-[188px] h-[45px] bg-[#4B0082] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity text-xl"
  >
    {loading ? "Envoi..." : "Enregistrer"}
  </button>
</div>


            {/* Message de retour */}
            {message && (
              <div className="px-15 py-2 text-center text-lg font-medium text-primary-500">
                {message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default AjoutArticle;
