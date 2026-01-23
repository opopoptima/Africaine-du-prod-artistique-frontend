'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage } from '../services/auth';

export default function PublicRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (authStorage.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return children;
}