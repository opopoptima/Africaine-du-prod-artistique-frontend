'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../services/auth';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validation
      if (!email) {
        setError('Veuillez entrer votre adresse e-mail');
        setLoading(false);
        return;
      }

      // Call API
      await api.forgotPassword(email);

      setSuccess('Un code OTP a été envoyé à votre adresse e-mail');

      // Redirect to reset password page after 2 seconds
      setTimeout(() => {
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);

    } catch (err) {
      setError(err.message || 'Erreur lors de l\'envoi du code OTP');
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            disabled={loading}
            className="w-full px-0 py-3 border-b border-[#cccccc] focus:border-[#4B0082] outline-none transition-colors bg-transparent text-[#666] placeholder-[#999] disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4B0082] text-white py-4 rounded-lg font-semibold hover:bg-[#3a0066] transition-colors shadow-md mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Envoi...' : 'Envoyer un code OTP'}
        </button>
      </form>

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