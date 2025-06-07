'use client';

import { useRouter } from 'next/navigation';
import FormServico from '../componentsSevico/FormServico';
import { servicoService } from '@/app/services/servicoService';
import { withAuth } from '@/app/lib/withAuth';

function NovoServicoPage() {
  const router = useRouter();

  async function salvar(servico: Servico) {
    try {
      await servicoService.create(servico);
      router.push('/servicos');
    } catch (err) {
      console.error('Erro ao salvar servico:', err);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <FormServico onSubmit={salvar} />
    </main>
  );
}

export default withAuth(NovoServicoPage)
