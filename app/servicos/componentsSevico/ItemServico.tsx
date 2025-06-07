'use client';
import { useRouter } from 'next/navigation';

type Props = {
  servico: Servico;
  isAdmin: boolean;
  handleDeletar: (id: string) => void;
};

export default function ItemServico({ servico, isAdmin, handleDeletar }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start gap-4">
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
            onClick={() => servico.id && handleDeletar(servico.id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
          >
            Apagar
          </button>
        </div>
      )}
    </div>
  );
}
