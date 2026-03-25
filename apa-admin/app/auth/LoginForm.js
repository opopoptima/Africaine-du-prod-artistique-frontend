'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, authStorage } from '../services/auth';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        setLoading(false);
        return;
      }

      // Call API
      const data = await api.login(formData.email, formData.password);

      // Store token
      authStorage.setToken(data.token);

      // Redirect to dashboard or home
      router.push('/dashboard'); // Changez selon votre route

    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999] disabled:opacity-50"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999] disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4B0082] text-white py-4 rounded-lg font-semibold hover:bg-[#3a0066] transition-colors shadow-md mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

    </div>
  );
};

export default LoginForm;