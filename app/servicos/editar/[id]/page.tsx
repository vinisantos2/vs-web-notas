'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { servicoService } from '@/app/services/servicoService';
import FormServico from '../../componetsSevico/FormServico';

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [servico, setServico] = useState<Servico | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarCliente() {
      if (!id) return;
      const servicoBuscado = await servicoService.getById(id);
      if (!servicoBuscado) {
        alert('servicos não encontrado.');
        router.push('/servicos');
        return;
      }
      setServico(servicoBuscado);
      setCarregando(false);
    }

    carregarCliente();
  }, [id, router]);

  async function atualizar(servicoAtualizado: Servico) {
    try {
      await servicoService.update(id, servicoAtualizado);
      router.push('/clientes');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente.');
    }
  }

  if (carregando) {
    return <p className="p-6">Carregando cliente...</p>;
  }

  return (
     <main className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <FormServico
        servicoInicial={servico!}
        onSubmit={atualizar}
        onCancel={() => router.push('/clientes')}
      />
    </main>
  );
}
