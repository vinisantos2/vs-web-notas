'use client';

import { Nota } from '../types/nota';

type ListaNotasProps = {
  notas: Nota[];
  onEdit: (nota: Nota) => void;
  onDelete: (id: string) => void;
};

export default function ListaNotas({ notas, onEdit, onDelete }: ListaNotasProps) {
  if (notas.length === 0) {
    return <p>Nenhuma nota encontrada.</p>;
  }

  return (
    <div className="space-y-4">
      {notas.map((nota) => (
        <div key={nota.id} className="border rounded p-4 shadow-md flex justify-between items-start">
          <div>
            <p><strong>Cliente:</strong> {nota.clienteNome}</p>
            <p><strong>Serviço:</strong> {nota.servicoNome}</p>
            <p><strong>Valor:</strong> R$ {nota.valor}</p>
            {nota.observacao && <p><strong>Obs:</strong> {nota.observacao}</p>}
          </div>
          <div className="space-x-2">
            <button onClick={() => onEdit(nota)} className="text-blue-600 hover:underline">Editar</button>
            <button onClick={() => onDelete(nota.id)} className="text-red-600 hover:underline">Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}
