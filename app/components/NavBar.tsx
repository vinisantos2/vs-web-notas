'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  // Detecta usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-50">
      {/* Links à esquerda */}
      <div className="flex gap-6">
        <button onClick={() => router.push('/')} className="hover:underline">Home</button>
        <button onClick={() => router.push('/servicos')} className="hover:underline">Serviços</button>
        <button onClick={() => router.push('/notas')} className="hover:underline">Notas</button>
        <button onClick={() => router.push('/clientes')} className="hover:underline">Clientes</button>
      </div>

      {/* Usuário à direita */}
      {userName && (
        <div className="flex items-center gap-4">
          <span className="text-sm">Olá, {userName}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}
