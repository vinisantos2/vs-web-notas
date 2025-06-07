'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { servicoService } from '@/app/services/servicoService';
import FormServico from '../../componentsSevico/FormServico';
import { withAuth } from '@/app/lib/withAuth';

function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [servico, setServico] = useState<Servico | null>(null);

  // Use o hook para proteger a rota e carregar o serviço
  const [loading, setLoading] = useState(false)
  const [isAdmi, setIsadmin] = useState(false)

  async function atualizar(servicoAtualizado: Servico) {
    try {
      await servicoService.update(id, servicoAtualizado);
      router.push('/servicos');
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      alert('Erro ao atualizar serviço.');
    }
  }

  if (loading || !servico) {
    return <p className="p-6">Carregando serviço...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <FormServico
        servicoInicial={servico}
        onSubmit={atualizar}
        onCancel={() => router.push('/servicos')}
      />
    </main>
  );
}

export default withAuth(EditarClientePage)
