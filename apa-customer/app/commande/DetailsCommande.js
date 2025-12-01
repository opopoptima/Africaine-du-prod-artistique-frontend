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
              value={formData.nomLivre}
              onChange={(e) => updateFormData('nomLivre', e.target.value)}
              placeholder="The secret garden..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              required
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
              src="/images/books/secret-garden.jpg"
              alt="Couverture du livre"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}