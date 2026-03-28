'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const router = useRouter();

  useEffect(() => {
    // Tasks are now managed via the Dashboard tabs (Board/Backlog)
    router.replace('/dashboard');
  }, [router]);

  return null;
}
