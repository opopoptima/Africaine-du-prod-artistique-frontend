'use client';

import { useState } from 'react';
import InformationsPersonnelles from './InformationsPersonnelles';
import DetailsCommande from './DetailsCommande';
import ModePaiement from './ModePaiement';

export default function FormulaireCommande() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    role: '',
    nomLivre: '',
    quantite: 1,
    informations: '',
    paiementConfirme: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Commande soumise:', formData);
    // Logique d'envoi du formulaire
    alert('Commande envoyée avec succès !');
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    
    <div className="container mx-auto px-4 mb-35 max-w-6xl">
      <form onSubmit={handleSubmit}>
        {/* Passer une commande */}
        <div className=" mx-auto">
            <div className="bg-white shadow-md p-6 mb-15 border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-800">
            Passer une commande
        </h2>
            </div>
        </div>


        {/* Informations personnelles */}
        <InformationsPersonnelles 
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Détails de la commande */}
        <DetailsCommande 
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Mode de paiement */}
        <ModePaiement 
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Bouton d'envoi */}
        <div className="flex justify-center mt-8">
  <button
    type="submit"
    className="
      bg-[var(--color-primary-100)] 
      hover:bg-[var(--color-secondary-500)]
      text-white font-bold py-4 
      rounded-lg transition-colors cursor-pointer
      px-40 sm:px-52 md:px-60 lg:px-72
    "
  >
    Envoyer la commande
  </button>
</div>




        {/* Message de contact */}
        <div className="mt-6 text-center text-gray-600">
          Retrouvez-nous sur la page{' '}
          <a href="/contact" className="text-yellow-600 hover:underline font-semibold">
            Contact
          </a>{' '}
          pour toute question ou demande.
        </div>
      </form>
    </div>
  );
}