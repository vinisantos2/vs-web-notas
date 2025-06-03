'use client';

import { useEffect, useState } from 'react';
import { authService } from '../lib/auth';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login(email, senha);
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error: any) {
        console.log(error)
      setErro('E-mail ou senha inválidos');
      toast.error('E-mail ou senha inválidos');
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Verificando autenticação...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Toaster />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Login</h1>
        {erro && <p className="text-red-600 text-sm">{erro}</p>}
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
