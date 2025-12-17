"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- Composants réutilisables ---- //

const FormField = ({ label, children }) => (
    <div className="flex items-center gap-4 py-1.5">
        <label className="w-40 text-sm text-label flex-shrink-0">{label}</label>
        <div className="flex-1">{children}</div>
    </div>
);

const FormInput = ({ name, value, onChange, placeholder, type = "text", readOnly = false }) => (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full max-w-md h-8 px-3 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-100"
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

const RadioGroup = ({ name, options, value, onChange }) => (
    <div className="flex items-center gap-4">
        {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={onChange}
                    className="w-4 h-4 text-primary-500"
                />
                <span className="text-sm">{option.label}</span>
            </label>
        ))}
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

const Tabs = ({ tabs, activeTab, onTabChange }) => (
    <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                type="button" // <--- empêche la soumission du form
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

// ----------------------------------------- //

const AjoutCommande = ({ commandeId }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("info");

    const initialForm = {
        reference: "CMD-2025-0001",
        statutCommande: "Expédiée",
        dateCommande: { annee: "2025", mois: "03", jour: "15" },
        totalTTC: "145.00",

        idClient: "John Smith",
        nomPrenom: "John Smith",
        email: "john.smith@example.com",
        telephone: "+216 12 345 678",
        ville: "Tunis 1000",
        adresse: "123 Avenue Habib Bourguiba",

        modeLivraison: "Poste",
        numeroSuivi: "TN1234567890",
        statutLivraison: "En cours",

        modePaiement: "À la livraison",
        statutPaiement: "Payé",
        datePaiement: { annee: "2025", mois: "03", jour: "16" },

        totalHT: "120.00",
        livraison: "5.00",
        totalTTC2: "125.00",

        notes: "Client préfère la livraison le matin",
        preparePar: "Ahmed Ben Ali",
        valideLe: { annee: "2025", mois: "03", jour: "15" },
    };

    const [form, setForm] = useState(initialForm);

    const [articles, setArticles] = useState([
        {
            livre: "Australia - Land of Tomorrow",
            auteur: "John Author",
            isbn: "978-3-16-148410-0",
            quantite: "2",
            prixUnitaire: "45.00",
            total: "90.00",
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ---------------------- FIX ICI ---------------------- //
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("dateCommande_")) {
            const field = name.split("_")[1];
            setForm((prev) => ({
                ...prev,
                dateCommande: {
                    ...prev.dateCommande,
                    [field]: value,
                },
            }));
            return;
        }

        if (name.startsWith("datePaiement_")) {
            const field = name.split("_")[1];
            setForm((prev) => ({
                ...prev,
                datePaiement: {
                    ...prev.datePaiement,
                    [field]: value,
                },
            }));
            return;
        }

        if (name.startsWith("valideLe_")) {
            const field = name.split("_")[1];
            setForm((prev) => ({
                ...prev,
                valideLe: {
                    ...prev.valideLe,
                    [field]: value,
                },
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };
    // --------------------------------------------------------- //

    const handleArticleChange = (index, field, value) => {
        const newArticles = [...articles];
        newArticles[index][field] = value;

        if (field === "quantite" || field === "prixUnitaire") {
            const q = parseFloat(newArticles[index].quantite) || 0;
            const p = parseFloat(newArticles[index].prixUnitaire) || 0;
            newArticles[index].total = (q * p).toFixed(2);
        }

        setArticles(newArticles);
    };

    const addArticle = () => {
        setArticles([
            ...articles,
            { livre: "", auteur: "", isbn: "", quantite: "", prixUnitaire: "", total: "" },
        ]);
    };

    const removeArticle = (index) => {
        setArticles(articles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!form.reference || form.reference.trim() === "") {
            setMessage("❌ La référence est requise.");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setMessage("✅ Commande enregistrée avec succès !");
            setLoading(false);

            setTimeout(() => {
                router.push("/commandes");
            }, 1500);
        }, 1000);
    };

    const tabs = [
        { id: "info", label: "Info Commande" },
        { id: "client", label: "Client" },
        { id: "articles", label: "Détails des articles" },
        { id: "paiement", label: "Paiement" },
        { id: "livraison", label: "Livraison" },
        { id: "notes", label: "Notes" },
    ];

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-background py-6 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500 font-medium">
                        Dashboard &gt; Commandes &gt; Modifier
                    </div>

                </div>
                <h1 className="text-lg font-semibold text-primary-500 mb-4 pl-3">
                    FICHE COMMANDE
                </h1>

                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                {/* ------------- INFO ---------------- */}
                {activeTab === "info" && (
                    <Section title="Info Commande">
                        <FormField label="Référence commande :">
                            <FormInput name="reference" value={form.reference} onChange={handleChange} />
                        </FormField>

                        <FormField label="Statut commande :">
                            <RadioGroup
                                name="statutCommande"
                                value={form.statutCommande}
                                onChange={handleChange}
                                options={[
                                    { value: "Expédiée", label: "Expédiée" },
                                    { value: "Livrée", label: "Livrée" },
                                    { value: "Annulée", label: "Annulée" },
                                ]}
                            />
                        </FormField>

                        <FormField label="Date commande :">
                            <div className="flex gap-2">
                                <FormInput
                                    name="dateCommande_annee"
                                    placeholder="AAAA"
                                    value={form.dateCommande.annee}
                                    onChange={handleChange}
                                />
                                <FormInput
                                    name="dateCommande_mois"
                                    placeholder="MM"
                                    value={form.dateCommande.mois}
                                    onChange={handleChange}
                                />
                                <FormInput
                                    name="dateCommande_jour"
                                    placeholder="DD"
                                    value={form.dateCommande.jour}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormField>

                        <FormField label="Total TTC :">
                            <FormInput name="totalTTC" value={form.totalTTC} onChange={handleChange} />
                        </FormField>
                    </Section>
                )}

                {/* ------------- CLIENT ---------------- */}
                {activeTab === "client" && (
                    <Section title="Client">
                        <FormField label="ID Client :">
                            <FormInput name="idClient" value={form.idClient} onChange={handleChange} />
                        </FormField>

                        <FormField label="Nom et Prénom :">
                            <FormInput name="nomPrenom" value={form.nomPrenom} onChange={handleChange} />
                        </FormField>

                        <FormField label="E-mail :">
                            <FormInput
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </FormField>

                        <FormField label="Téléphone :">
                            <FormInput name="telephone" value={form.telephone} onChange={handleChange} />
                        </FormField>

                        <FormField label="Ville / Code Postal :">
                            <FormInput name="ville" value={form.ville} onChange={handleChange} />
                        </FormField>

                        <FormField label="Adresse :">
                            <FormInput name="adresse" value={form.adresse} onChange={handleChange} />
                        </FormField>
                    </Section>
                )}

                {/* ------------- ARTICLES -------------- */}
                {activeTab === "articles" && (
                    <Section title="Détails des articles">
                        {articles.map((article, index) => (
                            <div
                                key={index}
                                className="mb-4 p-4 border border-gray-200 rounded  flex gap-6"
                            >
                                {/* ---- Image seule (taille fixe + style design) ---- */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[150px] h-[250px] rounded-lg overflow-hidden shadow-md bg-gray-200">
                                        <img
                                            src="/images/australia.jpg"
                                            alt={article.livre || "Couverture du livre"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>


                                {/* Colonne droite : formulaire article */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold">Article {index + 1}</h4>

                                        {/* Si tu veux aussi empêcher la suppression, enlève ce bloc */}
                                        {articles.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArticle(index)}
                                                className="text-red-500 text-sm hover:text-red-700"
                                            >
                                                Supprimer
                                            </button>
                                        )}
                                    </div>

                                    <FormField label="Livre :">
                                        <FormInput
                                            value={article.livre}
                                            onChange={(e) =>
                                                handleArticleChange(index, "livre", e.target.value)
                                            }
                                        />
                                    </FormField>

                                    <FormField label="Auteur :">
                                        <FormInput
                                            value={article.auteur}
                                            onChange={(e) =>
                                                handleArticleChange(index, "auteur", e.target.value)
                                            }
                                        />
                                    </FormField>

                                    <FormField label="ISBN :">
                                        <FormInput
                                            value={article.isbn}
                                            onChange={(e) =>
                                                handleArticleChange(index, "isbn", e.target.value)
                                            }
                                        />
                                    </FormField>

                                    <FormField label="Quantité :">
                                        <FormInput
                                            type="number"
                                            value={article.quantite}
                                            onChange={(e) =>
                                                handleArticleChange(index, "quantite", e.target.value)
                                            }
                                        />
                                    </FormField>

                                    <FormField label="Prix Unitaire :">
                                        <FormInput
                                            type="number"
                                            value={article.prixUnitaire}
                                            onChange={(e) =>
                                                handleArticleChange(index, "prixUnitaire", e.target.value)
                                            }
                                        />
                                    </FormField>

                                    <FormField label="Total :">
                                        <FormInput value={article.total} readOnly />
                                    </FormField>
                                </div>
                            </div>
                        ))}

                        {/* Plus de bouton "+ Ajouter un article" ici */}

                        <div className="mt-4 p-4  ">
                            <FormField label="Total HT :">
                                <FormInput
                                    name="totalHT"
                                    value={form.totalHT}
                                    onChange={handleChange}
                                />
                            </FormField>

                            <FormField label="Livraison :">
                                <FormInput
                                    name="livraison"
                                    value={form.livraison}
                                    onChange={handleChange}
                                />
                            </FormField>

                            <FormField label="Total TTC :">
                                <FormInput
                                    name="totalTTC2"
                                    value={form.totalTTC2}
                                    onChange={handleChange}
                                />
                            </FormField>
                        </div>
                    </Section>
                )}



                {/* ------------- PAIEMENT -------------- */}
                {activeTab === "paiement" && (
                    <Section title="Paiement">
                        <FormField label="Mode :">
                            <FormInput
                                name="modePaiement"
                                value={form.modePaiement}
                                onChange={handleChange}
                            />
                        </FormField>

                        <FormField label="Statut Paiement :">
                            <RadioGroup
                                name="statutPaiement"
                                value={form.statutPaiement}
                                onChange={handleChange}
                                options={[
                                    { value: "Payé", label: "Payé" },
                                    { value: "En attente", label: "En attente" },
                                    { value: "Refusé", label: "Refusé" },
                                    { value: "Remboursé", label: "Remboursé" },
                                ]}
                            />
                        </FormField>

                        <FormField label="Date :">
                            <div className="flex gap-2">
                                <FormInput
                                    name="datePaiement_annee"
                                    placeholder="AAAA"
                                    value={form.datePaiement.annee}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    name="datePaiement_mois"
                                    placeholder="MM"
                                    value={form.datePaiement.mois}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    name="datePaiement_jour"
                                    placeholder="DD"
                                    value={form.datePaiement.jour}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormField>
                    </Section>
                )}

                {/* ------------- LIVRAISON -------------- */}
                {activeTab === "livraison" && (
                    <Section title="Livraison">
                        <FormField label="Mode de livraison :">
                            <RadioGroup
                                name="modeLivraison"
                                value={form.modeLivraison}
                                onChange={handleChange}
                                options={[
                                    { value: "Poste", label: "Poste" },
                                    { value: "Transporteur", label: "Transporteur" },
                                    { value: "Retrait magasin", label: "Retrait magasin" },
                                ]}
                            />
                        </FormField>

                        <FormField label="Numéro de suivi :">
                            <FormInput
                                name="numeroSuivi"
                                value={form.numeroSuivi}
                                onChange={handleChange}
                            />
                        </FormField>

                        <FormField label="Statut livraison :">
                            <RadioGroup
                                name="statutLivraison"
                                value={form.statutLivraison}
                                onChange={handleChange}
                                options={[
                                    { value: "En cours", label: "En cours" },
                                    { value: "Livrée", label: "Livrée" },
                                    { value: "Retournée", label: "Retournée" },
                                ]}
                            />
                        </FormField>
                    </Section>
                )}

                {/* ------------- NOTES ------------------ */}
                {activeTab === "notes" && (
                    <Section title="Notes">
                        <FormField label="Notes / Observations :">
                            <FormTextArea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                rows={4}
                            />
                        </FormField>

                        <FormField label="Préparé par :">
                            <FormInput
                                name="preparePar"
                                value={form.preparePar}
                                onChange={handleChange}
                            />
                        </FormField>

                        <FormField label="Validé le :">
                            <div className="flex gap-2">
                                <FormInput
                                    name="valideLe_annee"
                                    placeholder="AAAA"
                                    value={form.valideLe.annee}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    name="valideLe_mois"
                                    placeholder="MM"
                                    value={form.valideLe.mois}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    name="valideLe_jour"
                                    placeholder="DD"
                                    value={form.valideLe.jour}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormField>
                    </Section>
                )}

                {/* --- Boutons --- */}
                <div className="flex justify-end gap-4 pt-4 pr-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 h-8 py-1 bg-primary-500 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Envoi..." : "Enregistrer"}
                    </button>

                    <button
                        type="button"
                        className="px-6 h-8 py-1 border border-primary-500 text-primary-500 rounded-lg font-medium text-sm hover:bg-gray-50 transition"
                        onClick={() => router.back()}
                    >
                        Annuler
                    </button>
                </div>

                {message && (
                    <div
                        className={`mt-4 p-3 rounded ${message.includes("✅")
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                    >
                        <p className="text-sm">{message}</p>
                    </div>
                )}
            </div>
        </form>
    );
};

export default AjoutCommande;