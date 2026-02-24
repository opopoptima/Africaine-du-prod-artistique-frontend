"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import orderService from "../../services/orderService";
import { useToast } from "@/app/context/ToastContext";

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

const FormTextArea = ({ name, value, onChange, placeholder, rows = 3, readOnly = false }) => (
  <textarea
    rows={rows}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    className={`w-full px-3 py-2 border border-border rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary
      ${readOnly ? "bg-gray-100 cursor-not-allowed opacity-80" : "bg-background text-foreground"}`}
  />
);

const RadioGroup = ({ name, options, value, onChange, disabled = false }) => (
  <div className="flex items-center gap-4">
    {options.map((option) => (
      <label key={option.value} className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          disabled={disabled}
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

const FicheCommande = ({ commandeId }) => {
  const router = useRouter();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const isNewOrder = commandeId === "new";

  const initialForm = {
    statusCommande: "En attente",
    name: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    role: "Parent",
    informationDetails: "",
    articles: [],
    livraisonPrice: "0",
    livraisonMethod: "Poste",
    livraisonNumero: "",
    livraisonStatus: "En cours",
    paimentStatus: "En attente",
    paimentDate: "",
    notes: "",
    preparedBy: "",
    ValidateDate: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(!isNewOrder);

  // Charger les données de la commande si modification
  useEffect(() => {
    if (!isNewOrder) {
      fetchOrderData();
    }
  }, [commandeId]);

  const fetchOrderData = async () => {
    try {
      setLoadingData(true);
      const data = await orderService.getOrderById(commandeId);

      // Mapper les données du backend vers le formulaire
      setForm({
        statusCommande: data.statusCommande || "En attente",
        name: data.name || "",
        lastName: data.lastName || "",
        email: data.email || "",
        address: data.address || "",
        phone: data.phone || "",
        role: data.role || "Parent",
        informationDetails: data.informationDetails || "",
        articles: data.articles || [],
        livraisonPrice: data.livraisonPrice?.toString() || "0",
        livraisonMethod: data.livraisonMethod || "Poste",
        livraisonNumero: data.livraisonNumero || "",
        livraisonStatus: data.livraisonStatus || "En cours",
        paimentStatus: data.paimentStatus || "En attente",
        paimentDate: data.paimentDate ? new Date(data.paimentDate).toISOString().split('T')[0] : "",
        notes: data.notes || "",
        preparedBy: data.preparedBy || "",
        ValidateDate: data.ValidateDate ? new Date(data.ValidateDate).toISOString().split('T')[0] : "",
        commandeId: data.commandeId,
        createdAt: data.createdAt,
        totalPrice: data.totalPrice, // New: capture the grand total from DB
      });
    } catch (error) {
      console.error("Erreur lors du chargement de la commande:", error);
      toast.error("❌ Erreur lors du chargement de la commande");
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!form.name || !form.lastName || !form.email || !form.address || !form.phone) {
      toast.error("Veuillez remplir tous les champs obligatoires du client");
      setLoading(false);
      return;
    }

    try {
      // Préparer les données pour l'API
      const orderData = {
        statusCommande: form.statusCommande,
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        address: form.address,
        phone: parseInt(form.phone),
        role: form.role,
        informationDetails: form.informationDetails,
        articles: form.articles,
        livraisonPrice: parseFloat(form.livraisonPrice),
        livraisonMethod: form.livraisonMethod,
        livraisonNumero: form.livraisonNumero,
        livraisonStatus: form.livraisonStatus,
        paimentStatus: form.paimentStatus,
        paimentDate: form.paimentDate || null,
        notes: form.notes,
        preparedBy: form.preparedBy,
        ValidateDate: form.ValidateDate || null,
      };

      if (isNewOrder) {
        await orderService.createOrder(orderData);
        toast.success("Commande créée avec succès !");
      } else {
        await orderService.updateOrder(commandeId, orderData);
        toast.success("Commande mise à jour avec succès !");
      }

      setTimeout(() => router.push("/commandes"), 1500);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Erreur lors de l'enregistrement de la commande");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "info", label: "Info Commande" },
    { id: "client", label: "Client" },
    { id: "articles", label: "Détails des articles" },
    { id: "paiementLivraison", label: "Paiement & Livraison" },
  ];

  if (loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-primary-500 font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500 font-medium">
            Dashboard &gt; Commandes &gt; {isNewOrder ? "Nouvelle" : "Modifier"}
          </div>
        </div>
        <h1 className="text-lg font-semibold text-primary-500 mb-4 pl-3">
          {isNewOrder ? "NOUVELLE COMMANDE" : "FICHE COMMANDE"}
        </h1>

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ------------- INFO ---------------- */}
        {activeTab === "info" && (
          <Section title="Info Commande">
            {!isNewOrder && (
              <FormField label="Référence commande :">
                <FormInput value={form.commandeId} readOnly />
              </FormField>
            )}

            <FormField label="Statut commande :">
              <RadioGroup
                name="statusCommande"
                value={form.statusCommande}
                onChange={handleChange}
                options={[
                  { value: "En attente", label: "En attente" },
                  { value: "Livrée", label: "Livrée" },
                  { value: "Annulée", label: "Annulée" },
                ]}
              />
            </FormField>
            <FormField label="Mode de livraision">
              <FormInput value={form.livraisonMethod} readOnly />

            </FormField>

            {!isNewOrder && form.createdAt && (
              <FormField label="Date commande :">
                <FormInput
                  value={new Date(form.createdAt).toISOString().split('T')[0]}
                  readOnly
                />
              </FormField>
            )}

            <FormField label="Total à payer :">
              <div className="text-lg font-bold text-primary-500">
                {(form.totalPrice || (
                  (form.articles ? form.articles.reduce((acc, item) => {
                    const price = item.priceAtOrder || (item.article?.promo && item.article.promo > 0 ? item.article.promo : item.article?.price || 0);
                    return acc + (price * item.quantity);
                  }, 0) : 0) +
                  (parseFloat(form.livraisonPrice) || 0)
                )).toFixed(2)} dt
              </div>
            </FormField>
          </Section>
        )}

        {/* ------------- CLIENT ---------------- */}
        {activeTab === "client" && (
          <Section title="Client">
            <FormField label="Prénom * :">
              <FormInput
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Entrez le prénom"
                readOnly
              />
            </FormField>
            <FormField label="Nom * :">
              <FormInput
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Entrez le nom"
                readOnly
              />
            </FormField>
            <FormField label="Role :">
              <RadioGroup
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled
                options={[
                  { value: "Enfant", label: "Enfant" },
                  { value: "Parent", label: "Parent" },
                  { value: "Passionné du livre", label: "Passionné" },
                  { value: "Professionnel", label: "Professionnel" },
                ]}
              />
            </FormField>
            <FormField label="E-mail * :">
              <FormInput
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
                readOnly
              />
            </FormField>
            <FormField label="Téléphone * :">
              <FormInput
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+216 12 345 678"
                readOnly
              />
            </FormField>
            <FormField label="Adresse * :">
              <FormInput
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Entrez l'adresse complète"
                readOnly
              />
            </FormField>
            <FormField label="Informations :">
              <FormTextArea
                name="informationDetails"
                value={form.informationDetails}
                onChange={handleChange}
                placeholder="Informations supplémentaires"
                readOnly
              />
            </FormField>
          </Section>
        )}

        {/* ------------- ARTICLES -------------- */}
        {activeTab === "articles" && (
          <Section title="Détail des articles">
            <div className="overflow-x-auto mb-6 border rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#9B59B622] text-primary-500 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-2 border-b">Article</th>
                    <th className="px-4 py-2 border-b">ISBN</th>
                    <th className="px-4 py-2 border-b text-center">Qté</th>
                    <th className="px-4 py-2 border-b text-right">Prix Unit.</th>
                    <th className="px-4 py-2 border-b text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {form.articles && form.articles.length > 0 ? (
                    form.articles.map((item, idx) => {
                      const article = item.article;
                      const price = (article?.promo && article.promo > 0) ? article.promo : (article?.price || 0);

                      return (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-800">
                            <div>{item.titleAtOrder || article?.title || "Article inconnu"}</div>
                            {article?.collection && (
                              <div className="text-[10px] text-[#5B1E8C] font-semibold uppercase mt-0.5">
                                Collection: {article.collection}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">
                            {article?.isbn || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-center font-semibold">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {(item.priceAtOrder || price).toFixed(2)} dt
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-gray-900">
                            {((item.priceAtOrder || price) * item.quantity).toFixed(2)} dt
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-400 italic">
                        Aucun article dans cette commande
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50 font-semibold text-gray-700">
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-right">Total Articles :</td>
                    <td className="px-4 py-2 text-right">
                      {form.articles ? form.articles.reduce((acc, item) => {
                        const price = (item.article?.promo && item.article.promo > 0) ? item.article.promo : (item.article?.price || 0);
                        return acc + (price * item.quantity);
                      }, 0).toFixed(2) : "0.00"} dt
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-right">Frais de livraison :</td>
                    <td className="px-4 py-2 text-right">
                      {(parseFloat(form.livraisonPrice) || 0).toFixed(2)} dt
                    </td>
                  </tr>
                  <tr className="bg-primary-500 text-white">
                    <td colSpan="4" className="px-4 py-3 text-right text-base uppercase tracking-wide">Total à payer :</td>
                    <td className="px-4 py-3 text-right text-lg font-black">
                      {(form.totalPrice || (
                        (form.articles ? form.articles.reduce((acc, item) => {
                          const price = item.priceAtOrder || (item.article?.promo && item.article.promo > 0 ? item.article.promo : item.article?.price || 0);
                          return acc + (price * item.quantity);
                        }, 0) : 0) +
                        (parseFloat(form.livraisonPrice) || 0)
                      )).toFixed(2)} dt
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>


          </Section>
        )}

        {/* ------------- PAIEMENT, LIVRAISON & NOTES -------------- */}
        {activeTab === "paiementLivraison" && (
          <>
            {/* Livraison */}
            <Section title="Livraison">
              <FormField label="Mode de livraison :">
                <RadioGroup
                  name="livraisonMethod"
                  value={form.livraisonMethod}
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
                  name="livraisonNumero"
                  value={form.livraisonNumero}
                  onChange={handleChange}
                  placeholder="Ex: TN1234567890"
                />
              </FormField>

              <FormField label="Statut livraison :">
                <RadioGroup
                  name="livraisonStatus"
                  value={form.livraisonStatus}
                  onChange={handleChange}
                  options={[
                    { value: "En cours", label: "En cours" },
                    { value: "Livrée", label: "Livrée" },
                    { value: "Retournée", label: "Retournée" },
                  ]}
                />
              </FormField>
            </Section>

            {/* Paiement */}
            <Section title="Paiement">
              <FormField label="Statut Paiement :">
                <RadioGroup
                  name="paimentStatus"
                  value={form.paimentStatus}
                  onChange={handleChange}
                  options={[
                    { value: "En attente", label: "En attente" },
                    { value: "Payée", label: "Payée" },
                    { value: "Réfusée", label: "Réfusée" },
                    { value: "Remboursée", label: "Remboursée" },
                  ]}
                />
              </FormField>

              <FormField label="Date paiement :">
                <FormInput
                  type="date"
                  name="paimentDate"
                  value={form.paimentDate}
                  onChange={handleChange}
                />
              </FormField>
            </Section>

            {/* Notes */}
            <Section title="Notes">
              <FormField label="Notes / Observations :">
                <FormTextArea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Notes ou observations sur la commande"
                />
              </FormField>

              <FormField label="Préparé par :">
                <FormInput
                  name="preparedBy"
                  value={form.preparedBy}
                  onChange={handleChange}
                  placeholder="Nom de la personne"
                />
              </FormField>

              <FormField label="Validé le :">
                <FormInput
                  type="date"
                  name="ValidateDate"
                  value={form.ValidateDate}
                  onChange={handleChange}
                />
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

      </div>
    </form>
  );
};

export default FicheCommande;