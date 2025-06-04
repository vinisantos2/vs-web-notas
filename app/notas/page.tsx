'use client';
import { useEffect, useState } from 'react';
import { Nota } from '../types/nota';
import { format } from 'date-fns';

type Props = {
    notas: Nota[];
    onEdit: (nota: Nota) => void;
    onDelete: (id: string) => void;
};

export default function ListaNotas({ notas, onEdit, onDelete }: Props) {
    const [formattedDates, setFormattedDates] = useState<{ [id: string]: string }>({});

    useEffect(() => {
        const newFormattedDates: { [id: string]: string } = {};
        if (!notas) return
        notas.forEach(nota => {
            newFormattedDates[nota.id] = format(new Date(nota.dataCriacao), 'dd/MM/yyyy');
        });
        setFormattedDates(newFormattedDates);
    }, [notas]);

    if (!Array.isArray(notas)) return <p>Erro ao carregar notas.</p>;
    if (notas.length === 0) return <p>Você ainda não tem nenhuma nota cadastrada.</p>;

    return (
        <div className="space-y-4">
            {notas.map((nota) => (
                <div key={nota.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold">{nota.observacao || 'Sem observação'}</p>
                        <p className="text-sm text-gray-500">
                            Cliente: {nota.clienteId} | Serviço: {nota.servicoId}
                        </p>
                        <p className="text-sm text-gray-500">Valor: R$ {Number(nota.valor).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">
                            Criado em: {formattedDates[nota.id] || '...'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit(nota)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Editar</button>
                        <button onClick={() => onDelete(nota.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}