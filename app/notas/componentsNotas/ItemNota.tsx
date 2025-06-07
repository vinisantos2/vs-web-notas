'use client';

import GerarNotaPDF from "@/app/components/GerarNotaPDF";
import { Nota } from "@/app/types/nota";
import { useRouter } from "next/navigation";


type Props = {
  nota: Nota;
  isAdmin: boolean;
  handleDeletar: (id: string) => void;
};

export default function ItemNota({ nota, isAdmin, handleDeletar }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start gap-4">
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

      <div className="flex flex-col gap-2">
        <GerarNotaPDF nota={nota} />

        {isAdmin && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
