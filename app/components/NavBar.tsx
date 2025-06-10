'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 dark:bg-blue-700 text-white p-4 shadow-md z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo ou nome do sistema */}
        <div className="text-lg font-semibold">VS Web & Apps</div>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <button onClick={() => navigate('/')} className="hover:underline">Home</button>
          <button onClick={() => navigate('/servicos')} className="hover:underline">Serviços</button>
          <button onClick={() => navigate('/notas')} className="hover:underline">Notas</button>
          <button onClick={() => navigate('/clientes')} className="hover:underline">Clientes</button>
          {userName && (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:inline">Olá, {userName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Menu Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-2">
          <button onClick={() => navigate('/')} className="text-left hover:underline">Home</button>
          <button onClick={() => navigate('/servicos')} className="text-left hover:underline">Serviços</button>
          <button onClick={() => navigate('/notas')} className="text-left hover:underline">Notas</button>
          <button onClick={() => navigate('/clientes')} className="text-left hover:underline">Clientes</button>
          {userName && (
            <div className="flex flex-col gap-2">
              <span className="text-sm">Olá, {userName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm w-fit"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

