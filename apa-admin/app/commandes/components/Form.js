"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- Composants réutilisables ---- //

const FormField = ({ label, children }) => (
  <div className="flex items-center gap-4 py-1.5">
    <label className="w-40 text-sm text-label shrink-0">{label}</label>
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
    className={`w-full max-w-md h-8 px-3 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary
      ${readOnly ? "bg-gray-200 cursor-not-allowed" : "bg-background text-foreground"}`}
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
        type="button"
        onClick={() => onTabChange(tab.id)}
        className={`px-6 py-3 text-sm font-medium transition-colors ${
          activeTab === tab.id
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
    dateCommande: "2025-03-15",
    prenom: "John",
    nom: "John Smith",
    role: "Parent",
    email: "john.smith@example.com",
    telephone: "+216 12 345 678",
    adresse: "123 Avenue Habib Bourguiba 1000 Tunis",
    modeLivraison: "Poste",
    numeroSuivi: "TN1234567890",
    statutLivraison: "En cours",
    modePaiement: "À la livraison",
    statutPaiement: "En attente",
    datePaiement: "2025-03-16",
    totalHT: "120.00",
    livraison: "5.00",
    livre: "Australia - Land of Tomorrow",
    auteur: "John Author",
    isbn: "978-3-16-148410-0",
    quantite: "2",
    prixUnitaire: "45.00",
    total: "90.00",
    notes: "Client préfère la livraison le matin",
    preparePar: "Ahmed Ben Ali",
    valideLe: "2025-03-15",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      setTimeout(() => router.push("/commandes"), 1500);
    }, 1000);
  };

  const tabs = [
  { id: "info", label: "Info Commande" },
  { id: "client", label: "Client" },
  { id: "articles", label: "Détails des articles" },
  { id: "paiementLivraison", label: "Paiement & Livraison" }, 
];


  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500 font-medium">
            Dashboard &gt; Commandes &gt; Modifier
          </div>
        </div>
        <h1 className="text-lg font-semibold text-primary-500 mb-4 pl-3">FICHE COMMANDE</h1>

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ------------- INFO ---------------- */}
        {activeTab === "info" && (
          <Section title="Info Commande">
            <FormField label="Référence commande :">
              <FormInput value={form.reference} readOnly />
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
              <FormInput
                type="date"
                value={form.dateCommande}
                readOnly
              />
            </FormField>

            <FormField label="Total Sans livraision :">
              <FormInput value={form.total} readOnly/>
            </FormField>
          </Section>
        )}

        {/* ------------- CLIENT ---------------- */}
        {activeTab === "client" && (
          <Section title="Client">
            <FormField label="Prénom :">
              <FormInput value={form.prenom} readOnly />
            </FormField>
            <FormField label="Nom :">
              <FormInput value={form.nom} readOnly />
            </FormField>
            <FormField label="Role :">
              <FormInput value={form.role} readOnly />
            </FormField>
            <FormField label="E-mail :">
              <FormInput type="email" value={form.email} readOnly />
            </FormField>
            <FormField label="Téléphone :">
              <FormInput value={form.telephone} readOnly />
            </FormField>
            <FormField label="Adresse :">
              <FormInput name="adresse" value={form.adresse} onChange={handleChange} />
            </FormField>
          </Section>
        )}

        {/* ------------- ARTICLES -------------- */}
        {activeTab === "articles" && (
          <Section title="Détail de l'article">
            <FormField label="ISBN :">
              <FormInput value={form.isbn} readOnly />
            </FormField>
            <FormField label="Titre :">
              <FormInput value={form.livre} readOnly />
            </FormField>
            <FormField label="Auteur :">
              <FormInput value={form.auteur} readOnly />
            </FormField>
            <FormField label="Quantité :">
              <FormInput type="number" name="quantite" value={form.quantite} readOnly />
            </FormField>
            <FormField label="Prix Unitaire :">
              <FormInput type="number" value={form.prixUnitaire} readOnly />
            </FormField>
            <div className="mt-4 p-4">
              <FormField label="Livraison :">
                <FormInput name="livraison" value={form.livraison} onChange={handleChange} />
              </FormField>
              <FormField label="Total TTC :">
                <FormInput
                  name="totalTTC"
                  value={(
                    parseFloat(form.quantite) * parseFloat(form.prixUnitaire) +
                    parseFloat(form.livraison || 0)
                  ).toFixed(2)}
                  readOnly
                />
              </FormField>
            </div>
          </Section>
        )}

        {/* ------------- PAIEMENT, LIVRAISON & NOTES -------------- */}
      {activeTab === "paiementLivraison" && (
        <>
          {/* Paiement */}

          {/* Livraison */}
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
              <FormInput name="numeroSuivi" value={form.numeroSuivi} onChange={handleChange} />
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
          <Section title="Paiement">
            <FormField label="Statut Paiement :">
              <RadioGroup
                name="statutPaiement"
                value={form.statutPaiement}
                onChange={handleChange}
                options={[
                  { value: "En attente", label: "En attente" },
                  { value: "Payé", label: "Payé" },
                  { value: "Refusé", label: "Refusé" },
                  { value: "Remboursé", label: "Remboursé" },
                ]}
              />
            </FormField>

            <FormField label="Date :">
              <FormInput
                type="date"
                name="datePaiement"
                value={form.datePaiement}
                onChange={handleChange}
              />
            </FormField>
          </Section>

          

          {/* Notes */}
          <Section title="Notes">
            <FormField label="Notes / Observations :">
              <FormTextArea name="notes" value={form.notes} onChange={handleChange} rows={4} />
            </FormField>

            <FormField label="Préparé par :">
              <FormInput name="preparePar" value={form.preparePar} onChange={handleChange} />
            </FormField>

            <FormField label="Validé le :">
              <FormInput type="date" name="valideLe" value={form.valideLe} onChange={handleChange} />
            </FormField>
          </Section>
        </>
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
            className={`mt-4 p-3 rounded ${
              message.includes("✅")
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
