'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    console.log('Login:', formData);
    // Logique de connexion ici
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
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999]"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#4B0082] text-white py-4 rounded-lg font-semibold hover:bg-[#3a0066] transition-colors shadow-md mt-8"
      >
        Se connecter
      </button>

      <div className="text-center mt-6">
        <Link 
          href="/auth/forgot-password"
          className="text-[#000000] text-sm"
        >
          Mot de passe oublié ? <span className="text-[#4B0082] underline">Cliquez ici</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;