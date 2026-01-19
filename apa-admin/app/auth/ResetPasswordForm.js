'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '../../services/auth';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get('email');

  const [formData, setFormData] = useState({
    email: emailFromParams || '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailFromParams) {
      setFormData(prev => ({ ...prev, email: emailFromParams }));
    }
  }, [emailFromParams]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validation
      if (!formData.email || !formData.otp || !formData.newPassword || !formData.confirmPassword) {
        setError('Veuillez remplir tous les champs');
        setLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        setLoading(false);
        return;
      }

      // Call API
      await api.resetPassword(formData.email, formData.newPassword, formData.otp);

      setSuccess('Mot de passe réinitialisé avec succès !');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Erreur lors de la réinitialisation');
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

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
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
            disabled={loading || !!emailFromParams}
            className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999] disabled:opacity-50"
          />
        </div>

        <div>
          <input
            type="text"
            name="otp"
            placeholder="Code OTP"
            value={formData.otp}
            onChange={handleInputChange}
            disabled={loading}
            maxLength={6}
            className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999] disabled:opacity-50"
          />
        </div>

        <div>
          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            value={formData.newPassword}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999] disabled:opacity-50"
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le nouveau mot de passe"
            value={formData.confirmPassword}
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
          {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>

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