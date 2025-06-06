'use client';

import { clienteService } from '@/app/services/clienteService';
import { useRouter } from 'next/navigation';
import { Cliente } from '@/app/types/cliente';
import ClienteForm from '../componentsCliente/ClienteForm';
import { withAuth } from '@/app/lib/withAuth';



function NovoClientePage() {
  const router = useRouter();

  async function salvar(cliente: Cliente) {
    try {
      await clienteService.create(cliente);
      router.push('/clientes');
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <ClienteForm onSubmit={salvar} />
    </main>
  );
}
export default withAuth(NovoClientePage)