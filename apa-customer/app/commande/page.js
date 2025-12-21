'use client'

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import HeroGeneral from '../components/HeroGeneral';
import InformationsPersonnelles from './InformationsPersonnelles';
import DetailsCommande from './DetailsCommande';
import ModePaiement from './ModePaiement';
import { OrderService } from '../services/orderService';

export default function Commande() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cover = searchParams.get('cover') || '';
  const isbn = searchParams.get('isbn') || '';
  const prixUnitaire = searchParams.get('prixUnitaire') || 0;
  const quantity = searchParams.get('quantity') || 1;

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    role: '',
    isbn: isbn,
    quantite: quantity,
    prixUnitaire: prixUnitaire,
    informations: '',
    livraisonPrice: 8.0,
    paiementConfirme: false,
    coverImage: cover
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
    setLoading(true);

    try {
      const orderPayload = {
      name: formData.prenom,
      lastName: formData.nom,
      email: formData.email,
      address: formData.adresse,
      phone: formData.telephone,
      role: formData.role,
      articles: [
          {
            isbn: formData.isbn,
            quantity: formData.quantite
          }
        ],
      livraisonPrice: formData.livraisonPrice,
      livraisonMethod: formData.livraisonMethod, 
      informationDetails: formData.informations 
};

      const response = await OrderService.create(orderPayload);
      console.log('Commande soumise:', response.data);

      alert('Commande envoyée avec succès !');

      // Redirect to boutique after success
      router.push('/boutique');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue lors de la soumission de la commande.');
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
      </div>
    </div>
  );
}
