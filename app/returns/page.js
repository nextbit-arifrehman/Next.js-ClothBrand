'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReturnsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to about page with shipping section (returns info is there)
    router.push('/about#shipping');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to returns information...</p>
      </div>
    </div>
  );
}