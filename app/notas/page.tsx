'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { notaService } from '../services/notaService'; // supondo que exista
import { getUserRole } from '../services/usuarioService';
import Navbar from '../components/NavBar';

type Nota = {
  id: string;
  clienteId: string;
  servicoId: string;
  observacao?: string;
  valor: number;
  dataCriacao: string;
};

export default function ListaNotas() {
  const [loading, setLoading] = useState(true);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login');
      } else {
        const role = await getUserRole(user.uid);
        setIsAdmin(role === 'admin');
        await carregarNotas();
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const carregarNotas = async () => {
    const lista = await notaService.getAll();
    setNotas(lista);
  };

  const handleDeletar = async (id: string) => {
    if (!confirm('Tem certeza que deseja apagar esta nota?')) return;

    await notaService.delete(id);
    await carregarNotas();
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Carregando notas...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Notas</h1>

      {isAdmin && (
        <button
          onClick={() => router.push('/notas/nova-nota')}
          className="mb-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nova Nota
        </button>
      )}

      <section className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Notas Cadastradas</h2>
        {notas.length === 0 ? (
          <p>Você ainda não tem nenhuma nota cadastrada.</p>
        ) : (
          <div className="grid gap-4">
            {notas.map((nota) => (
              <div
                key={nota.id}
                className="bg-white p-4 rounded shadow flex justify-between items-start gap-4"
              >
                <div>
                  <p className="text-lg font-bold">{nota.observacao || 'Sem observação'}</p>
                  <p className="text-gray-600 text-sm">
                    Cliente: {nota.clienteId} | Serviço: {nota.servicoId}
                  </p>
                  <p className="text-green-700 font-bold mt-2">
                    R$ {nota.valor.toFixed(2)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Criado em: {new Date(nota.dataCriacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {isAdmin && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => router.push(`/notas/editar/${nota.id}`)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeletar(nota.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    >
                      Apagar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}