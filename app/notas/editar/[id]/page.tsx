'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Nota } from '../../../types/nota';
import { notaService } from '../../../services/notaService';
import NotaForm from '../../../components/NotaForm';

export default function EditarNotaPage() {
    const { id } = useParams();
    const router = useRouter();
    const [nota, setNota] = useState<Nota | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarNota() {
            const notaCarregada = await notaService.getById(id as string);
            setNota(notaCarregada);
            setCarregando(false);
        }

        carregarNota();
    }, [id]);

    const handleSalvar = async (dadosAtualizados: Nota) => {
        await notaService.update(id as string, dadosAtualizados);
        router.push('/notas');
    };

    if (carregando) return <p>Carregando nota...</p>;
    if (!nota) return <p>Nota não encontrada.</p>;

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Editar Nota</h1>
            <NotaForm
                usuarioId={nota.usuarioId}
                nota={nota}
                onSubmit={handleSalvar}
            />
        </div>
    );
}
