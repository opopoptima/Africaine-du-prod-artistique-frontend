import Image from 'next/image';

export default function DetailsCommande({ formData, updateFormData }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-purple-800 mb-6">
        Détails de la commande
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nom du livre */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nom du livre ou référence
            </label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => updateFormData('isbn', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              required
              disabled
            />
          </div>

          {/* Quantité */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Quantité
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantite}
              onChange={(e) => updateFormData('quantite', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              required
            />
          </div>

          {/* Informations complémentaires */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Informations complémentaires
            </label>
            <textarea
              value={formData.informations}
              onChange={(e) => updateFormData('informations', e.target.value)}
              placeholder="Précisions sur la livraison..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Couverture du livre */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Couverture du livre
          </label>
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={formData.coverImage || "/images/placeholder.jpg"}
              alt="Couverture du livre"
              fill
              className="object-cover"
            />
          </div>

         <div className="mt-6 border border-gray-200 rounded-md overflow-hidden">
  <table className="w-full text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-2 text-left">Prix unitaire</th>
        <th className="px-4 py-2 text-center">Quantité</th>
        <th className="px-4 py-2 text-right">Total</th>
      </tr>
    </thead>

    <tbody className="divide-y">
      <tr>
        <td className="px-4 py-2">
          {formData.prixUnitaire} dt
        </td>
        <td className="px-4 py-2 text-center">
          {formData.quantite}
        </td>
        <td className="px-4 py-2 text-right font-medium">
          {formData.prixUnitaire * formData.quantite} dt
        </td>
      </tr>

      {/* Livraison */}
      <tr>
        <td className="px-4 py-2">Livraison</td>
        <td className="px-4 py-2 text-center">—</td>
        <td className="px-4 py-2 text-right font-medium">
          {formData.livraisonPrice} dt
        </td>
      </tr>
    </tbody>

    <tfoot className="bg-gray-50">
      <tr>
        <td className="px-4 py-3 font-semibold" colSpan={2}>
          Total à payer
        </td>
        <td className="px-4 py-3 text-right font-bold text-lg">
          {formData.livraisonPrice +
            formData.prixUnitaire * formData.quantite} dt
        </td>
      </tr>
    </tfoot>
  </table>
</div>

        </div>
      </div>
    </div>
  );
}