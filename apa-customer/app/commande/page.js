'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import HeroGeneral from '../components/HeroGeneral';
import InformationsPersonnelles from './InformationsPersonnelles';
import DetailsCommande from './DetailsCommande';
import ModePaiement from './ModePaiement';
import { OrderService } from '../services/orderService';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Commande() {
  const router = useRouter();
  const toast = useToast();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    role: '',
    informations: '',
    livraisonPrice: 8.0,
    livraisonMethod: 'Poste',
    paiementConfirme: false,
  });

  const [loading, setLoading] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }
    setLoading(true);

    try {
      const orderPayload = {
        name: formData.prenom,
        lastName: formData.nom,
        email: formData.email,
        address: formData.adresse,
        phone: formData.telephone,
        role: formData.role,
        articles: cartItems.map(item => ({
          isbn: item.isbn,
          quantity: item.quantity
        })),
        livraisonPrice: formData.livraisonPrice,
        livraisonMethod: formData.livraisonMethod,
        informationDetails: formData.informations
      };

      const response = await OrderService.create(orderPayload);
      console.log('Commande soumise:', response.data);

      toast.success('Commande envoyée avec succès !');
      clearCart();

      // Redirect to boutique after success
      router.push('/boutique');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Une erreur est survenue lors de la soumission de la commande.';
      toast.error(`Erreur : ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <HeroGeneral title="Formulaire de commande" />

      {/* Go Back Icon */}
      <div className="container mx-auto px-4 mt-6 max-w-6xl">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-700 hover:text-purple-800 font-semibold mb-4"
        >
          <IoChevronBack className="text-2xl mr-2" />
          Retour
        </button>
      </div>

      <div className="container mx-auto px-4 mb-35 max-w-6xl">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white shadow-sm border border-gray-100 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Votre panier est vide</h2>
            <button
              onClick={() => router.push('/boutique')}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-lg active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Retour à la boutique
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mx-auto">
              <div className="bg-white shadow-md p-6 mb-15 border border-gray-200">
                <h2 className="text-2xl font-bold text-purple-800">
                  Passer une commande
                </h2>
              </div>
            </div>

            <InformationsPersonnelles
              formData={formData}
              updateFormData={updateFormData}
            />

            <DetailsCommande
              formData={formData}
              updateFormData={updateFormData}
            />

            <ModePaiement
              formData={formData}
              updateFormData={updateFormData}
            />

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`
                  bg-primary-100
                  hover:bg-secondary-500
                  text-white font-bold py-4 
                  rounded-lg transition-colors cursor-pointer
                  px-40 sm:px-52 md:px-60 lg:px-72
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Envoi...' : 'Envoyer la commande'}
              </button>
            </div>

            <div className="mt-6 text-center text-gray-600">
              Retrouvez-nous sur la page{' '}
              <a href="/contact" className="text-yellow-600 hover:underline font-semibold">
                Contact
              </a>{' '}
              pour toute question ou demande.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
