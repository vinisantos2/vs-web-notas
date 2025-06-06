'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { servicoService } from '../services/servicoService';
import { withAuth } from '../lib/withAuth';

 function ListaServicos() {
  const router = useRouter();

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // substitua pela lógica real se necessário

  // Proteção da rota e carregamento dos serviços
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        // Aqui você pode verificar se é admin se quiser
        setIsAdmin(true); // ou alguma lógica baseada em claims ou e-mail
        const lista = await servicoService.getAll();
        setServicos(lista);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeletar = async (id: string) => {
    if (!confirm('Tem certeza que deseja apagar este serviço?')) return;
    await servicoService.remove(id);
    const lista = await servicoService.getAll();
    setServicos(lista);
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Carregando serviços...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Serviços</h1>

      {isAdmin && (
        <button
          onClick={() => router.push('/servicos/novo-servico')}
          className="mb-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Serviço
        </button>
      )}

      <section className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Serviços Cadastrados</h2>
        <div className="grid gap-4">
          {servicos.map((servico) => (
            <div key={servico.id} className="bg-white p-4 rounded shadow flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-bold">{servico.nome}</h3>
                <p className="text-gray-600">{servico.descricao}</p>
                <p className="text-green-700 font-bold mt-2">R$ {servico.valor.toFixed(2)}</p>
              </div>

              {isAdmin && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => router.push(`/servicos/editar/${servico.id}`)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (servico.id)
                        handleDeletar(servico.id)
                    }}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                  >
                    Apagar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


export default withAuth(ListaServicos)