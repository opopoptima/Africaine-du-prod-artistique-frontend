'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage } from './services/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (authStorage.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B0082]"></div>
    </div>
  );
}