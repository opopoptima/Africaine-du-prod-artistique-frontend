'use client';
import { useState } from 'react';
import Link from 'next/link';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Reset password:', formData);
    // Logique de réinitialisation ici
  };

  return (
    <div className="space-y-8">
      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999]"
        />
      </div>

      <div>
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={formData.newPassword}
          onChange={handleInputChange}
          className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999]"
        />
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le nouveau mot de passe"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999]"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#4B0082] text-white py-4 rounded-lg font-semibold hover:bg-[#3a0066] transition-colors shadow-md mt-8"
      >
        Réinitialiser le mot de passe
      </button>

      <div className="text-center mt-6">
        <Link 
          href="/auth/login"
          className="text-[#4B0082] text-sm underline"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;