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
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      fetchActualite();
    }
  }, [editId]);

  const fetchActualite = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${editId}`);
      const data = await response.json();
      
      // Parse publication date
      const pubDate = data.publicationDate ? new Date(data.publicationDate) : new Date();
      
      setFormData({
        title: data.title || "",
        subtitle: data.subtitle || "",
        category: data.category || "Blog",
        publicationDate: {
          year: String(pubDate.getFullYear()),
          month: String(pubDate.getMonth() + 1).padStart(2, "0"),
          day: String(pubDate.getDate()).padStart(2, "0"),
          hour: String(pubDate.getHours()).padStart(2, "0"),
          minute: String(pubDate.getMinutes()).padStart(2, "0"),
        },
        author: data.author || "Admin, Librairie",
        content: data.content || "",
        mediaInsertion: data.mediaInsertion || "",
        excerpt: data.excerpt || "",
        mainImage: data.mainImage || "",
        galleryImages: data.galleryImages || [],
        status: data.status || "Publié",
        featured: data.featured || false,
      });

      if (data.mainImage) {
        setMainImagePreview(data.mainImage);
      }
      if (data.galleryImages?.length > 0) {
        setGalleryPreviews(data.galleryImages);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'actualité:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Construct publication date
      const { year, month, day, hour, minute } = formData.publicationDate;
      const publicationDate = new Date(
        parseInt(year) || new Date().getFullYear(), 
        parseInt(month) - 1, 
        parseInt(day), 
        parseInt(hour), 
        parseInt(minute)
      );

      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        category: formData.category,
        publicationDate,
        author: formData.author,
        content: formData.content,
        mediaInsertion: formData.mediaInsertion,
        excerpt: formData.excerpt,
        mainImage: formData.mainImage,
        galleryImages: formData.galleryImages,
        status: formData.status,
        featured: formData.featured,
      };

      const url = isEditMode
        ? `http://localhost:5000/api/news/${editId}`
        : "http://localhost:5000/api/news";
      
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/dashboard/actualites");
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to server/cloud storage
      // For now, create a local preview
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="text-sm text-gray-600">
          <a href="/dashboard" className="hover:text-[#4B0082]">Dashboard</a>
          {" > "}
          <a href="/dashboard/actualites" className="hover:text-[#4B0082]">Actualités</a>
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
          <div className="px-7 py-4">
            <h1 className="text-[32px] font-medium text-[#4B0082]" style={{ lineHeight: '48px' }}>
              FICHE D'UNE ACTUALITÉ
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Informations de base */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>
                Informations de base
              </h2>
            </div>

            <div className="px-14 py-8 space-y-8">
              {/* Titre */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Titre :
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  required
                />
              </div>

              {/* Sous-titre */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Sous-titre :
                </Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                />
              </div>

              {/* Catégorie */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Catégorie :
                </Label>
                <div className="flex-1 flex gap-6 items-center">
                  {["Livre", "Événement", "Promotion", "Blog"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={formData.category === cat}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                      />
                      <span className="text-xl text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date de publication */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Date de publication :
                </Label>
                <div className="flex-1 flex gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#03151E]" style={{ lineHeight: '27px' }}>Année</span>
                    <Input
                      type="number"
                      min="2020"
                      max="2099"
                      placeholder="AAAA"
                      value={formData.publicationDate.year || new Date().getFullYear()}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: { ...formData.publicationDate, year: e.target.value },
                        })
                      }
                      className="w-[104px] h-[33px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-[#8A8A8A]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#03151E]" style={{ lineHeight: '27px' }}>Mois</span>
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
                      className="w-[104px] h-[33px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-[#8A8A8A]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#03151E]" style={{ lineHeight: '27px' }}>Jour</span>
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
                      className="w-[104px] h-[33px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-[#8A8A8A]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#03151E]" style={{ lineHeight: '27px' }}>Heure</span>
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
                      className="w-[104px] h-[33px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-[#8A8A8A]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#03151E]" style={{ lineHeight: '27px' }}>Minute</span>
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
                      className="w-[104px] h-[33px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] px-2 text-[#8A8A8A]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Auteur */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Auteur / Rédacteur :
                </Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                />
              </div>
            </div>

            {/* Contenu */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>
                Contenu
              </h2>
            </div>

            <div className="px-14 py-8 space-y-8">
              {/* Corps de l'article */}
              <div className="flex gap-8">
                <Label className="text-black w-72 text-left pt-2" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Corps de l'article :
                </Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="flex-1 bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                  style={{ minHeight: '759px' }}
                  required
                />
              </div>

              {/* Insertion média */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Insertion média :
                </Label>
                <Input
                  value={formData.mediaInsertion}
                  onChange={(e) => setFormData({ ...formData, mediaInsertion: e.target.value })}
                  placeholder="(upload ou lien YouTube)"
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] placeholder:text-[#BBBBBB]"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {/* Extrait */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Extrait (aperçu court) :
                </Label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="flex-1 h-[46px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)]"
                />
              </div>
            </div>

            {/* Médias et affichage */}
            <div className="bg-[rgba(155,89,182,0.2)] px-7 py-3">
              <h2 className="text-3xl font-medium text-black" style={{ lineHeight: '36px' }}>
                Médias et affichage
              </h2>
            </div>

            <div className="px-14 py-8 space-y-8">
              {/* Image principale */}
              <div className="flex gap-8">
                <Label className="text-black w-72 text-left pt-2" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Image principale :
                </Label>
                <div className="w-[324px]">
                  <div className="h-[402px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] flex flex-col items-center justify-center relative">
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
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start pl-6">
                        <Upload className="w-[66px] h-[66px] text-[#4B0082] mb-4" />
                        <label className="cursor-pointer">
                          <span className="block w-[265px] h-[45px] leading-[45px] text-center bg-[rgba(255,255,255,0.7)] border border-dashed border-[#4B0082] rounded-lg text-[#4B0082] font-semibold hover:bg-white transition-colors text-xl" style={{ letterSpacing: '0.08em' }}>
                            Upload Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Galerie */}
              <div className="flex gap-8">
                <Label className="text-black w-72 text-left pt-2" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Image Galerie :
                </Label>
                <div className="w-[324px]">
                  <div className="h-[402px] bg-white border border-[#DEDEDE] rounded-[4px] shadow-[inset_0px_1px_2px_1px_rgba(10,10,10,0.1)] flex flex-col items-center justify-center p-4 overflow-y-auto">
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
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Upload className="w-[66px] h-[66px] text-[#4B0082] mb-4" />
                    <label className="cursor-pointer">
                      <span className="block w-[265px] h-[45px] leading-[45px] text-center bg-[rgba(255,255,255,0.7)] border border-dashed border-[#4B0082] rounded-lg text-[#4B0082] font-semibold hover:bg-white transition-colors text-xl" style={{ letterSpacing: '0.08em' }}>
                        Upload Images
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Statut */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Statut :
                </Label>
                <div className="flex-1 flex gap-6 items-center">
                  {["Publié", "Brouillon", "Archivé"].map((stat) => (
                    <label key={stat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={stat}
                        checked={formData.status === stat}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                      />
                      <span className="text-xl text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                        {stat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mettre en avant sur l'accueil */}
              <div className="flex items-center gap-8">
                <Label className="text-black w-72 text-left" style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px', lineHeight: '100%' }}>
                  Mettre en avant sur l'accueil :
                </Label>
                <div className="flex-1 flex gap-6 items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="featured"
                      checked={formData.featured === true}
                      onChange={() => setFormData({ ...formData, featured: true })}
                      className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                    />
                    <span className="text-xl text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                      Oui
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="featured"
                      checked={formData.featured === false}
                      onChange={() => setFormData({ ...formData, featured: false })}
                      className="w-[13px] h-[13px] border border-[#767676] rounded-full"
                    />
                    <span className="text-xl text-[#3B5571]" style={{ letterSpacing: '0.01em' }}>
                      Non
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-14 py-6 flex justify-end gap-6">
              <button
                type="button"
                onClick={() => router.push("/dashboard/actualites")}
                className="w-[187px] h-[45px] bg-[rgba(255,255,255,0.7)] border border-[#4B0082] rounded-lg text-[#4B0082] font-semibold hover:bg-white transition-colors text-xl"
                style={{ letterSpacing: '0.08em' }}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-[188px] h-[45px] bg-[#4B0082] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-xl"
                style={{ letterSpacing: '0.08em' }}
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[rgba(155,89,182,0.5)] mt-12 py-6 text-center">
        <p className="text-[#4B0082] font-semibold text-lg">
          Centralisez la gestion des actualités pour une communication optimale !
        </p>
      </footer>
    </div>
  );
}
