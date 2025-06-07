'use client';

import Link from 'next/link';
import { withAuth } from './lib/withAuth';
import { Usuario } from './types/usuario';

type Props = {
  user: Usuario;
};

function DashboardPage({ user }: Props) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-20 bg-gray-50">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-2">
          Bem-vindo, {user.nome || 'usuário'}!
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Este é o sistema da <strong>VS Web & Apps - Notas</strong>. Escolha uma das opções abaixo para gerenciar seus dados:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/notas">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Notas</h2>
              <p className="text-gray-500 text-sm">Gerencie notas fiscais</p>
            </div>
          </Link>

          <Link href="/clientes">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Clientes</h2>
              <p className="text-gray-500 text-sm">Visualize e edite seus clientes</p>
            </div>
          </Link>

          <Link href="/servicos">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Serviços</h2>
              <p className="text-gray-500 text-sm">Cadastre e organize os serviços</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default withAuth(DashboardPage);
