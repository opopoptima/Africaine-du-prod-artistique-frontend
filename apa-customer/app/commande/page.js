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
  const { cartItems, clearCart } = useCart();

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

      await OrderService.create(orderPayload);

      toast.success('Commande envoyée avec succès !');
      clearCart();
      router.push('/boutique');

    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Une erreur est survenue lors de la commande.';
      toast.error(`Erreur : ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <HeroGeneral title="Formulaire de commande" />

      {/* Go Back */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-700 hover:text-purple-800 font-medium sm:font-semibold mb-4"
        >
          <IoChevronBack className="text-lg sm:text-xl mr-1" />
          Retour
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white shadow-sm border border-gray-100 rounded-xl text-center">
            
            <h2 className="text-lg sm:text-2xl font-bold text-gray-400 mb-6 sm:mb-8 uppercase tracking-wide sm:tracking-widest">
              Votre panier est vide
            </h2>

            <button
              onClick={() => router.push('/boutique')}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 uppercase text-sm sm:text-base"
            >
              Retour à la boutique
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            
            {/* Header */}
            <div className="bg-white shadow-md p-4 sm:p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-800">
                Passer une commande
              </h2>
            </div>

            {/* Sections */}
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

            {/* Submit */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`
                  bg-primary-100
                  hover:bg-secondary-500
                  text-white font-semibold
                  py-3 px-6 sm:px-8
                  rounded-lg transition-all duration-300
                  shadow-md hover:shadow-lg
                  active:scale-95
                  w-full sm:w-auto
                  text-sm sm:text-base
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {loading ? 'Envoi...' : 'Envoyer la commande'}
              </button>
            </div>

            {/* Footer note */}
            <div className="text-center text-gray-600 text-sm sm:text-base">
              Retrouvez-nous sur la page{' '}
              <a
                href="/contact"
                className="text-yellow-600 hover:underline font-semibold"
              >
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
