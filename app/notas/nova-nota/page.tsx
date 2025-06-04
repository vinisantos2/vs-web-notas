'use client'; // se estiver usando app router, garantir que é client component

import { useEffect, useState } from 'react';
import NotaForm from '@/app/components/NotaForm';
import { auth } from '@/app/lib/firebase';

export default function NovaNotaPage() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuarioId(user.uid);
      } else {
        setUsuarioId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (usuarioId === null) {
    // Pode mostrar um loading ou pedir para o usuário fazer login
    return <p>Carregando usuário...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <NotaForm usuarioId={usuarioId} />
    </main>
  );
}
