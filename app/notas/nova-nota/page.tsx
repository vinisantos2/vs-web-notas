'use client'; // se estiver usando app router, garantir que é client component

import { useEffect, useState } from 'react';
import NotaForm from '@/app/notas/componentsNotas/NotaForm';
import { auth } from '@/app/lib/firebase';
import { withAuth } from '@/app/lib/withAuth';


function NovaNotaPage() {
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

export default withAuth(NovaNotaPage)