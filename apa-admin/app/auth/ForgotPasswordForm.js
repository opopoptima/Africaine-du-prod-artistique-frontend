'use client';
import { useState } from 'react';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    console.log('Send OTP to:', email);
    // Logique d'envoi OTP ici
  };

  return (
    <div className="space-y-8">
      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999]"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#4B0082] text-white py-4 rounded-lg font-semibold hover:bg-[#3a0066] transition-colors shadow-md mt-8"
      >
        Envoyer un code OTP
      </button>

      <div className="text-center mt-6">
        <Link 
          href="/auth/login"
          className="text-[#000000] text-sm"
        >
          Avez-vous retenu votre mot de passe ? <span className="text-[#4B0082] underline">Se connecter</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;