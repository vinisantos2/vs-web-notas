'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 flex justify-center gap-6 shadow-md z-50">
      <button
        onClick={() => router.push('/')}
        className="hover:underline"
      >
        Home
      </button>
      <button
        onClick={() => router.push('/servicos')}
        className="hover:underline"
      >
        Serviços
      </button>
      <button
        onClick={() => router.push('/notas')}
        className="hover:underline"
      >
        Notas
      </button>
      <button
        onClick={() => router.push('/clientes')}
        className="hover:underline"
      >
        Clientes
      </button>
    </nav>
  );
}
