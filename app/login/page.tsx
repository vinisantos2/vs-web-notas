'use client';

import { useEffect, useState } from 'react';
import { authService } from '../lib/auth';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, MailIcon } from 'lucide-react';

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
      console.log(error);
      setErro('E-mail ou senha inválidos');
      toast.error('E-mail ou senha inválidos');
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Verificando autenticação...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster />
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-5 transition-colors duration-300"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Acesse sua conta</h1>
        {erro && <p className="text-red-600 dark:text-red-400 text-sm text-center">{erro}</p>}
        <div className="relative">
          <MailIcon className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="pl-10 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            className="pl-10 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition-colors duration-300"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
