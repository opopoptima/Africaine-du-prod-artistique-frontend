import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

export default function DetailsCommande({ formData, updateFormData }) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-purple-800 mb-6">
        Détails de la commande
      </h3>

      <div className="space-y-6">
        {/* Cart Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Article</th>
                <th className="px-4 py-3 text-center">Prix unitaire</th>
                <th className="px-4 py-3 text-center">Quantité</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  const currentPrice = (item.promo && item.promo > 0) ? item.promo : item.price;
                  return (
                    <tr key={item.isbn} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0 border border-gray-100">
                            <Image
                              src={item.cover || "/images/placeholder.jpg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                            <p className="text-xs text-gray-500">ISBN: {item.isbn}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        {currentPrice} dt
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.isbn, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <IoRemoveOutline />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.isbn, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <IoAddOutline />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-gray-900 whitespace-nowrap">
                        {Math.round(currentPrice * item.quantity * 100) / 100} dt
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.isbn)}
                          className="text-red-500 hover:text-red-700 p-2 transition-colors"
                          title="Supprimer"
                        >
                          <IoTrashOutline className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-gray-500 italic">
                    Votre panier est vide
                  </td>
                </tr>
              )}

              {/* Méthode de livraison */}
              <tr className="bg-gray-50/50">
                <td className="px-4 py-4" colSpan={3}>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-gray-700">Mode de livraison :</span>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { id: 'Poste', label: 'Livraison à domicile (8dt)', price: 8.0 },
                        { id: 'Retrait magasin', label: 'Retrait au magasin (Gratuit)', price: 0 }
                      ].map((method) => (
                        <label key={method.id} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="livraisonMethod"
                            value={method.id}
                            checked={formData.livraisonMethod === method.id}
                            onChange={() => {
                              updateFormData('livraisonMethod', method.id);
                              updateFormData('livraisonPrice', method.price);
                            }}
                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer"
                          />
                          <span className={`text-sm ${formData.livraisonMethod === method.id ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>
                            {method.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-bold text-gray-900">
                  {formData.livraisonPrice} dt
                </td>
                <td></td>
              </tr>
            </tbody>
            <tfoot className="bg-purple-50 border-t-2 border-purple-100">
              <tr>
                <td className="px-4 py-4 font-bold text-purple-900 text-lg" colSpan={3}>
                  Total à payer
                </td>
                <td className="px-4 py-4 text-right font-black text-xl text-purple-900 whitespace-nowrap">
                  {Math.round((cartTotal + formData.livraisonPrice) * 100) / 100} dt
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Informations complémentaires */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Informations complémentaires
          </label>
          <textarea
            value={formData.informations}
            onChange={(e) => updateFormData('informations', e.target.value)}
            placeholder="Précisions sur la livraison, étage, point de repère..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
