export default function ModePaiement({ formData, updateFormData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-purple-800 mb-6">
        Mode de paiement
      </h3>

      {/* Espèces à la livraison */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-bold text-purple-800 text-sm mb-1">
          Espèces à la livraison
        </h4>
        <p className="text-gray-500 text-xs mb-6">
          Paiement en espèces lors de la réception
        </p>

        {/* Checkbox de confirmation */}
        <label className="flex items-start space-x-3 cursor-pointer">
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={formData.paiementConfirme}
              onChange={(e) => updateFormData('paiementConfirme', e.target.checked)}
              className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-purple-500 focus:ring-2 focus:ring-purple-300 cursor-pointer bg-white"
              required
            />
            {formData.paiementConfirme && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
            )}
          </div>
          <span className="text-purple-800 text-sm">
            Je confirme ma commande et le paiement en espèces.{' '}
            <span className="text-red-600">*</span>
          </span>
        </label>
      </div>
    </div>
  );
}