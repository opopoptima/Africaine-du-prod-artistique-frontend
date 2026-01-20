"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/app/components/input";
import { Label } from "@/app/components/label";
import { Textarea } from "@/app/components/textarea";
import { Upload } from "lucide-react";

export default function ActualiteFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = !!editId;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Blog",
    publicationDate: {
      year: new Date().getFullYear().toString(),
      month: "",
      day: "",
      hour: "",
      minute: "",
    },
    author: "Admin, Librairie",
    content: "",
    mediaInsertion: "",
    excerpt: "",
    mainImage: "",
    galleryImages: [],
    status: "Publié",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [apiTestResult, setApiTestResult] = useState(null);

  // Fetch actualité data when in edit mode
  useEffect(() => {
    if (isEditMode && editId) {
      console.log("Mode édition activé pour ID:", editId);
      fetchActualite();
    }
  }, [editId]);

  // Fonction pour tester l'API et voir la structure des données
  const testApiConnection = async () => {
    try {
      console.log("Test de connexion à l'API...");
      const response = await fetch(`http://localhost:5000/api/news/${editId}`);
      const data = await response.json();
      console.log("Données brutes de l'API:", data);
      
      setApiTestResult({
        status: response.status,
        data: data,
        ok: response.ok
      });
      
      // Afficher la structure des données dans la console
      console.log("Structure des données:");
      console.log("- title:", data.title);
      console.log("- subtitle:", data.subtitle);
      console.log("- category:", data.category);
      console.log("- publicationDate:", data.publicationDate);
      console.log("- content:", data.content?.substring(0, 50) + "...");
      console.log("- author:", data.author);
      console.log("- status:", data.status);
      
      return data;
    } catch (error) {
      console.error("Erreur lors du test API:", error);
      setApiTestResult({
        error: error.message,
        ok: false
      });
      return null;
    }
  };

  const fetchActualite = async () => {
    setLoadingForm(true);
    try {
      console.log(`Fetching actualité: http://localhost:5000/api/news/${editId}`);
      const response = await fetch(`http://localhost:5000/api/news/${editId}`);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Données complètes reçues:", data);
      
      // Vérifier si les données sont dans une propriété 'data'
      const actualData = data.data || data;
      console.log("Données à utiliser:", actualData);

      // Parser la date de publication - gérer différents formats
      let pubDate;
      
      if (actualData.publicationDate) {
        console.log("Publication date raw:", actualData.publicationDate);
        
        // Si c'est un string ISO
        if (typeof actualData.publicationDate === 'string') {
          pubDate = new Date(actualData.publicationDate);
          console.log("Parsed from ISO string:", pubDate);
        }
        // Si c'est un objet avec propriétés séparées
        else if (actualData.publicationDate.year) {
          console.log("Date from object:", actualData.publicationDate);
          pubDate = new Date(
            Number(actualData.publicationDate.year),
            Number(actualData.publicationDate.month || 1) - 1,
            Number(actualData.publicationDate.day || 1),
            Number(actualData.publicationDate.hour || 0),
            Number(actualData.publicationDate.minute || 0)
          );
        }
        // Si c'est un timestamp
        else {
          pubDate = new Date(actualData.publicationDate);
        }
      } else {
        pubDate = new Date();
      }

      console.log("Date finalement utilisée:", pubDate);

      // Formatter la date pour le formulaire
      const formattedDate = {
        year: String(pubDate.getFullYear()),
        month: String(pubDate.getMonth() + 1).padStart(2, "0"),
        day: String(pubDate.getDate()).padStart(2, "0"),
        hour: String(pubDate.getHours()).padStart(2, "0"),
        minute: String(pubDate.getMinutes()).padStart(2, "0"),
      };

      console.log("Date formatée:", formattedDate);

      // Mettre à jour le formData
      const updatedFormData = {
        title: actualData.title || "",
        subtitle: actualData.subtitle || "",
        category: actualData.category || "Blog",
        publicationDate: formattedDate,
        author: actualData.author || "Admin, Librairie",
        content: actualData.content || "",
        mediaInsertion: actualData.mediaInsertion || "",
        excerpt: actualData.excerpt || "",
        mainImage: actualData.mainImage || "",
        galleryImages: actualData.galleryImages || [],
        status: actualData.status || "Publié",
        featured: actualData.featured || false,
      };

      console.log("FormData après mise à jour:", updatedFormData);
      setFormData(updatedFormData);

      // Mettre à jour les previews d'images
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
      alert(`Erreur lors du chargement de l'actualité: ${error.message}`);
      
      // Tenter de charger des données de test pour debug
      console.log("Tentative de chargement de données de test...");
      setFormData({
        title: "Titre de test pour débogage",
        subtitle: "Sous-titre de test",
        category: "Blog",
        publicationDate: {
          year: "2025",
          month: "01",
          day: "20",
          hour: "17",
          minute: "50",
        },
        author: "Admin, Librairie",
        content: "Contenu de test...",
        mediaInsertion: "",
        excerpt: "Extrait de test",
        mainImage: "",
        galleryImages: [],
        status: "Publié",
        featured: false,
      });
    } finally {
      setLoadingForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { year, month, day, hour, minute } = formData.publicationDate;

      // Validation et création de la date
      const pubYear = Number(year) || new Date().getFullYear();
      const pubMonth = Number(month || 1) - 1;
      const pubDay = Number(day || 1);
      const pubHour = Number(hour || 0);
      const pubMinute = Number(minute || 0);

      const publicationDate = new Date(pubYear, pubMonth, pubDay, pubHour, pubMinute);
      
      console.log("Date à envoyer:", publicationDate.toISOString());

      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        category: formData.category,
        publicationDate: publicationDate.toISOString(),
        author: formData.author,
        content: formData.content,
        mediaInsertion: formData.mediaInsertion,
        excerpt: formData.excerpt,
        mainImage: formData.mainImage,
        galleryImages: formData.galleryImages,
        status: formData.status,
        featured: formData.featured,
      };

      console.log("Payload final:", payload);

      const url = isEditMode 
        ? `http://localhost:5000/api/news/${editId}`
        : "http://localhost:5000/api/news";

      const method = isEditMode ? "PUT" : "POST";

      console.log(`Envoi ${method} à ${url}`);

      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      console.log("Réponse brute:", responseText);

      if (!res.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        throw new Error(`Erreur ${res.status}: ${errorData.message || "Save failed"}`);
      }

      // Essayer de parser la réponse JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { success: true, message: "Opération réussie" };
      }

      console.log("Succès! Résultat:", result);

      alert(isEditMode ? "Actualité mise à jour avec succès!" : "Actualité créée avec succès!");
      router.push("/actualites");
      router.refresh();

    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
      alert(`Erreur lors de l'enregistrement: ${err.message}`);
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

  // Afficher un indicateur de chargement
  if (loadingForm && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-primary-500">Chargement de l'actualité...</p>
          <p className="text-sm text-gray-500 mt-2">ID: {editId}</p>
          <button
            onClick={testApiConnection}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tester l'API manuellement
          </button>
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
                  Titre :
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
                  Sous-titre :
                </Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Entrez le sous-titre (optionnel)"
                />
              </div>

              {/* Catégorie */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Catégorie :
                </Label>
                <div className="flex-1 flex gap-4 items-center">
                  {["Livre", "Événement", "Promotion", "Blog"].map((cat) => (
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

              {/* Date de publication */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Date de publication :
                </Label>
                <div className="flex-1 flex gap-2 items-end">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#03151E]" style={{ lineHeight: '16px' }}>Année</span>
                    <Input
                      type="number"
                      min="2020"
                      max="2099"
                      placeholder="AAAA"
                      value={formData.publicationDate.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: { ...formData.publicationDate, year: e.target.value },
                        })
                      }
                      className="w-[70px] h-[28px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-center"
                      style={{ fontSize: '12px' }}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#03151E]" style={{ lineHeight: '16px' }}>Mois</span>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="MM"
                      value={formData.publicationDate.month}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: { ...formData.publicationDate, month: e.target.value },
                        })
                      }
                      className="w-[70px] h-[28px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-center"
                      style={{ fontSize: '12px' }}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#03151E]" style={{ lineHeight: '16px' }}>Jour</span>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="JJ"
                      value={formData.publicationDate.day}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: { ...formData.publicationDate, day: e.target.value },
                        })
                      }
                      className="w-[70px] h-[28px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-center"
                      style={{ fontSize: '12px' }}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#03151E]" style={{ lineHeight: '16px' }}>Heure</span>
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      placeholder="HH"
                      value={formData.publicationDate.hour}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: { ...formData.publicationDate, hour: e.target.value },
                        })
                      }
                      className="w-[70px] h-[28px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-center"
                      style={{ fontSize: '12px' }}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#03151E]" style={{ lineHeight: '16px' }}>Minute</span>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="Mn"
                      value={formData.publicationDate.minute}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: { ...formData.publicationDate, minute: e.target.value },
                        })
                      }
                      className="w-[70px] h-[28px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-center"
                      style={{ fontSize: '12px' }}
                      disabled={loading}
                    />
                  </div>
                </div>
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

              {/* Insertion média */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Insertion média :
                </Label>
                <Input
                  value={formData.mediaInsertion}
                  onChange={(e) => setFormData({ ...formData, mediaInsertion: e.target.value })}
                  placeholder="(upload ou lien YouTube)"
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] placeholder:text-[#BBBBBB] text-sm"
                  style={{ fontSize: '14px' }}
                  disabled={loading}
                />
              </div>

              {/* Extrait */}
              <div className="flex items-center gap-4">
                <Label className="text-black w-48 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '100%' }}>
                  Extrait (aperçu court) :
                </Label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="flex-1 h-[36px] bg-white border border-[#DEDEDE] rounded-lg shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  disabled={loading}
                  placeholder="Court extrait qui apparaîtra dans les listes"
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

      {/* Footer */}
      <footer className="bg-[rgba(155,89,182,0.5)] mt-8 py-3 text-center">
        <p className="text-primary-500 font-semibold text-sm">
          Centralisez la gestion des actualités pour une communication optimale !
        </p>
      </footer>
    </div>
  );
}