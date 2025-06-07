'use client';

import { useEffect, useState } from 'react';
import { Nota } from '../../types/nota';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { clienteService } from '../../services/clienteService';
import { servicoService } from '../../services/servicoService';
import { notaService } from '../../services/notaService';

type Props = {
    usuarioId: string;
    nota?: Nota;
    onSubmit?: (dados: Nota) => void; // usado na edição
};

export default function NotaForm({ usuarioId, nota, onSubmit }: Props) {
    const { register, handleSubmit, watch, setValue, reset } = useForm<Nota>();
    const router = useRouter();
    const [clientes, setClientes] = useState<any[]>([]);
    const [servicos, setServicos] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const [clientesData, servicosData] = await Promise.all([
                clienteService.getAll(),
                servicoService.getAll(),
            ]);
            setClientes(clientesData);
            setServicos(servicosData);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (nota) {
            reset(nota);
        }
    }, [nota, reset]);

    const servicoSelecionado = servicos.find((s) => s.id === watch('servicoId'));

    useEffect(() => {
        if (servicoSelecionado) {
            setValue('valor', servicoSelecionado.valor);
        }
    }, [servicoSelecionado, setValue]);

    const handleFormSubmit = async (data: Nota) => {
        const novaNota = {
            ...data,
            usuarioId,
            dataCriacao: nota?.dataCriacao ?? new Date().toISOString(),
        };

        if (onSubmit) {
            await onSubmit(novaNota); // usado para edição
        } else {
            await notaService.criarNota(novaNota); // usado para criação
            router.push('/notas');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label className="block">Cliente</label>
                <select {...register('clienteId')} className="w-full border rounded p-2">
                    <option value="">Selecione</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block">Serviço</label>
                <select {...register('servicoId')} className="w-full border rounded p-2">
                    <option value="">Selecione</option>
                    {servicos.map((servico) => (
                        <option key={servico.id} value={servico.id}>
                            {servico.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block">Valor (R$)</label>
                <input type="number" step="0.01" {...register('valor')} className="w-full border rounded p-2" />
            </div>

            <div>
                <label className="block">Observações</label>
                <textarea {...register('observacao')} className="w-full border rounded p-2" />
            </div>

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                {nota ? 'Atualizar Nota' : 'Salvar Nota'}
            </button>
        </form>
    );
}
