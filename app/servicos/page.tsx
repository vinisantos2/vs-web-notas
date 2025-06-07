'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicoService } from '../services/servicoService';
import { withAuth } from '../lib/withAuth';
import Loading from '../components/Loading';
import ItemServico from './componentsSevico/ItemServico';
import { User } from 'firebase/auth';
import { Usuario } from '../types/usuario';


type Props = {
  user: Usuario; // recebido do withAuth
  
};

function ListaServicos({ user }: Props) {
  const router = useRouter();

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user.role === 'admin' ? true : false

  useEffect(() => {
    const carregar = async () => {
      const lista = await servicoService.getAll();
      setServicos(lista);
      setLoading(false);
    };

    carregar();
  }, []);

  const handleDeletar = async (id: string) => {
    if (!confirm('Tem certeza que deseja apagar este serviço?')) return;
    await servicoService.remove(id);
    const lista = await servicoService.getAll();
    setServicos(lista);
  };

  if (loading) {
    return (
      <Loading msg='Carregando serviços...' />
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
          {servicos.map((servico) => <ItemServico key={servico.id} handleDeletar={handleDeletar} isAdmin={isAdmin} servico={servico} />)}
        </div>
      </section>
    </main>
  );
}


export default withAuth(ListaServicos)