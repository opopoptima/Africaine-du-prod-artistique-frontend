"use client";;
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/app/components/input";
import { Label } from "@/app/components/label";
import { Textarea } from "@/app/components/textarea";
import { Upload } from "lucide-react";
import { useToast } from "@/app/context/ToastContext";
import { NewsService } from "@/app/services/newsService";
import ProgressBar from "@/app/components/ProgressBar";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ActualiteFormPage() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = !!editId;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Blog",
    eventDate: "", // ← string for datetime-local
    startDate: "",
    endDate: "",
    publicCible: "",
    lieu: "",
    theme: "",
    author: "Admin, Librairie",
    content: "",
    mediaInsertion: "",
    description: "",
    mainImage: "",
    galleryImages: [],
    status: "Publié",
    featured: false,
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (isEditMode && editId) {
      console.log("Mode édition activé pour ID:", editId);
      fetchActualite();
    }
  }, [editId]);

  const fetchActualite = async () => {
    setLoadingForm(true);
    try {
      const response = await fetch(`${API_URL}/news/${editId}`);

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const json = await response.json();
      const actualData = json.data || json;

      // Format eventDate for <input type="datetime-local">
      let eventDateStr = "";
      if (actualData.eventDate) {
        const d = new Date(actualData.eventDate);
        if (!isNaN(d.getTime())) {
          eventDateStr = d.toISOString().slice(0, 16); // YYYY-MM-DDThh:mm
        }
      }

      let startDateStr = "";
      if (actualData.startDate) {
        const d = new Date(actualData.startDate);
        if (!isNaN(d.getTime())) {
          startDateStr = d.toISOString().slice(0, 16);
        }
      }

      let endDateStr = "";
      if (actualData.endDate) {
        const d = new Date(actualData.endDate);
        if (!isNaN(d.getTime())) {
          endDateStr = d.toISOString().slice(0, 16);
        }
      }

      setFormData({
        title: actualData.title || "",
        subtitle: actualData.subtitle || "",
        category: actualData.category || "Blog",
        eventDate: eventDateStr,
        startDate: startDateStr,
        endDate: endDateStr,
        publicCible: actualData.publicCible || "",
        lieu: actualData.lieu || "",
        theme: actualData.theme || "",
        author: actualData.author || "Admin, Librairie",
        content: actualData.content || "",
        mediaInsertion: actualData.mediaInsertion || "",
        description: actualData.description || "",
        mainImage: actualData.mainImage || "",
        galleryImages: actualData.galleryImages || [],
        status: actualData.status || "Publié",
        featured: !!actualData.featured,
        videoUrl: actualData.videoUrl || "",
      });

      if (actualData.mainImage) {
        console.log("Main image found:", actualData.mainImage);
        setMainImagePreview(actualData.mainImage);
      }

      if (actualData.galleryImages?.length > 0) {
        console.log("Gallery images found:", actualData.galleryImages.length);
        setGalleryPreviews(actualData.galleryImages);
      }

      console.log("Formulaire rempli avec succès!");
    } catch (error) {
      console.error("Erreur détaillée lors du chargement:", error);
      toast.error(`Erreur lors du chargement de l'actualité: ${error.message}`);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        category: formData.category,
        eventDate: formData.eventDate || undefined, // ← will default in schema
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        lieu: formData.lieu,
        publicCible: formData.publicCible,
        theme: formData.theme,
        author: formData.author,
        content: formData.content,
        mediaInsertion: formData.mediaInsertion,
        description: formData.description,
        mainImage: formData.mainImage,
        galleryImages: formData.galleryImages,
        status: formData.status,
        featured: formData.featured,
        videoUrl: formData.videoUrl,
      };

      const options = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      };

      if (isEditMode) {
        await NewsService.update(editId, payload, options);
        toast.success("Actualité mise à jour avec succès!");
      } else {
        await NewsService.create(payload, options);
        toast.success("Actualité créée avec succès!");
      }

      router.push("/actualites");
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
      toast.error(`Erreur lors de l'enregistrement: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
        setFormData({ ...formData, mainImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews((prev) => [...prev, reader.result]);
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  if (loadingForm && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-primary-500">Chargement de l'actualité...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-8 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? `Modifier l'actualité` : "Créer une nouvelle actualité"}
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="text-sm text-gray-600">
          <a href="/dashboard" className="hover:text-primary-500">Dashboard</a>
          {" > "}
          <a href="/dashboard/actualites" className="hover:text-primary-500">Actualités</a>
          {" > "}
          <span className="font-semibold text-gray-900">
            {isEditMode ? "Modifier" : "Ajouter"}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="relative bg-[#9B59B626] rounded-lg mx-auto" style={{ maxWidth: '1268px' }}>
          {/* Title */}
          <div className="px-7 py-2">
            <h1 className="text-[24px] font-medium text-primary-500" style={{ lineHeight: '32px' }}>
              {isEditMode ? "MODIFICATION D'UNE ACTUALITÉ" : "NOUVELLE ACTUALITÉ"}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Informations de base */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-2">
              <h2 className="text-xl font-medium text-black" style={{ lineHeight: '28px' }}>
                Informations de base
              </h2>
            </div>

            <div className="px-10 py-4 space-y-4">
              {/* Titre */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Événement :
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  required
                  disabled={loading}
                  placeholder="Entrez le titre de l'actualité"
                />
              </div>

              {/* Sous-titre */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Slogan :
                </Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Entrez le sous-titre (optionnel)"
                />
              </div>

              {/* Lien Vidéo YouTube */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Lien Vidéo YouTube :
                </Label>
                <Input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Ex: https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Catégorie */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Catégorie :
                </Label>
                <div className="flex-1 flex gap-4 items-center">
                  {["Foire du livre", "Événement culturel", "Promotion / Lancement de livre", "Blog"].map((cat) => (
                    <label key={cat} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={formData.category === cat}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                        disabled={loading}
                      />
                      <span className="text-sm text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Public Cible */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Public Cible :
                </Label>
                <Input
                  value={formData.publicCible}
                  onChange={(e) => setFormData({ ...formData, publicCible: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Entrez le public cible (optionnel)"
                />
              </div>

              {/* Thèmes */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Thèmes :
                </Label>
                <Input
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Entrez les thèmes (optionnel)"
                />
              </div>

              {/* Lieu */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Lieu :
                </Label>
                <Input
                  value={formData.lieu}
                  onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Entrez le lieu"
                />
              </div>

              {/* Date de l'événement */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Date de début :
                </Label>
                <Input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                />
              </div>

              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Date de fin :
                </Label>
                <Input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                />
              </div>

              {/* Auteur */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Auteur / Rédacteur :
                </Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Admin, Librairie"
                />
              </div>
            </div>

            {/* Contenu */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-2">
              <h2 className="text-xl font-medium text-black" style={{ lineHeight: '28px' }}>
                Contenu
              </h2>
            </div>

            <div className="px-10 py-4 space-y-4">
              {/* Description */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Description :
                </Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Court extrait"
                />
              </div>
              {/* Corps de l'article */}
              <div className="flex gap-4">
                <Label className="text-black w-48 text-left pt-2" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Corps de l'article :
                </Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="flex-1 bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  style={{ minHeight: '350px' }}
                  required
                  disabled={loading}
                  placeholder="Rédigez le contenu de votre article ici..."
                />
              </div>




            </div>

            {/* Médias et affichage */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-2">
              <h2 className="text-xl font-medium text-black" style={{ lineHeight: '28px' }}>
                Médias et affichage
              </h2>
            </div>

            <div className="px-10 py-4 space-y-4">
              {/* Image principale */}
              <div className="flex gap-4">
                <Label className="text-black w-48 text-left pt-2" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Image principale :
                </Label>
                <div className="w-[220px]">
                  <div className="h-[240px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] flex flex-col items-center justify-center relative">
                    {mainImagePreview ? (
                      <div className="relative w-full h-full p-4">
                        <img
                          src={mainImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setMainImagePreview("");
                            setFormData({ ...formData, mainImage: "" });
                          }}
                          className="absolute top-6 right-6 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          disabled={loading}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-[40px] h-[40px] text-primary-500 mb-2" />
                        <label className="cursor-pointer">
                          <span className="block w-[180px] h-[32px] leading-[32px] text-center bg-[rgba(255,255,255,0.7)] border border-dashed border-primary-500 rounded-lg text-primary-500 font-semibold hover:bg-white transition-colors text-sm" style={{ letterSpacing: '0.08em' }}>
                            Upload Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            className="hidden"
                            disabled={loading}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Galerie */}
              <div className="flex gap-4">
                <Label className="text-black w-48 text-left pt-2" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Image Galerie :
                </Label>
                <div className="w-[220px]">
                  <div className="h-[240px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] flex flex-col items-center justify-center p-3 overflow-y-auto">
                    {galleryPreviews.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 w-full mb-4">
                        {galleryPreviews.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={img}
                              alt={`Gallery ${idx}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
                                setFormData((prev) => ({
                                  ...prev,
                                  galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
                                }));
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                              disabled={loading}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Upload className="w-[40px] h-[40px] text-primary-500 mb-2" />
                    <label className="cursor-pointer">
                      <span className="block w-[180px] h-[32px] leading-[32px] text-center bg-[rgba(255,255,255,0.7)] border border-dashed border-primary-500 rounded-lg text-primary-500 font-semibold hover:bg-white transition-colors text-sm" style={{ letterSpacing: '0.08em' }}>
                        Upload Images
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                        disabled={loading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Statut */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Statut :
                </Label>
                <div className="flex-1 flex gap-4 items-center">
                  {["Publié", "Brouillon", "Archivé"].map((stat) => (
                    <label key={stat} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={stat}
                        checked={formData.status === stat}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                        disabled={loading}
                      />
                      <span className="text-sm text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                        {stat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mettre en avant sur l'accueil */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Mettre en avant sur l'accueil :
                </Label>
                <div className="flex-1 flex gap-4 items-center">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="featured"
                      checked={formData.featured === true}
                      onChange={() => setFormData({ ...formData, featured: true })}
                      className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                      disabled={loading}
                    />
                    <span className="text-sm text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                      Oui
                    </span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="featured"
                      checked={formData.featured === false}
                      onChange={() => setFormData({ ...formData, featured: false })}
                      className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                      disabled={loading}
                    />
                    <span className="text-sm text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                      Non
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-10 py-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push("/actualites")}
                className="w-[140px] h-[36px] bg-[rgba(255,255,255,0.7)] border border-primary-500 rounded-lg text-primary-500 font-semibold hover:bg-white transition-colors text-sm"
                style={{ letterSpacing: '0.08em' }}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-[140px] h-[36px] bg-primary-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-sm flex items-center justify-center"
                style={{ letterSpacing: '0.08em' }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isEditMode ? "Mise à jour..." : "Enregistrement..."}
                  </>
                ) : (
                  isEditMode ? "Mettre à jour" : "Enregistrer"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <ProgressBar progress={uploadProgress} label="Publication de l'actualité..." />

      {/* Footer */}
      <footer className="bg-[rgba(155,89,182,0.5)] mt-8 py-3 text-center">
        <p className="text-primary-500 font-semibold text-sm">
          Centralisez la gestion des actualités pour une communication optimale !
        </p>
      </footer>
    </div>
  );
}