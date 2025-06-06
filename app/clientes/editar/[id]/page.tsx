'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { clienteService } from '@/app/services/clienteService';
import { Cliente } from '@/app/types/cliente';
import ClienteForm from '../../componentsCliente/ClienteForm';
import { withAuth } from '@/app/lib/withAuth';


function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarCliente() {
      if (!id) return;
      const clienteBuscado = await clienteService.getById(id);
      if (!clienteBuscado) {
        alert('Cliente não encontrado.');
        router.push('/clientes');
        return;
      }
      setCliente(clienteBuscado);
      setCarregando(false);
    }

    carregarCliente();
  }, [id, router]);

  async function atualizar(clienteAtualizado: Cliente) {
    try {
      await clienteService.update(id, clienteAtualizado);
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
      <ClienteForm
        clienteInicial={cliente!}
        onSubmit={atualizar}
        onCancel={() => router.push('/clientes')}
      />
    </main>
  );
}
export default withAuth(EditarClientePage)