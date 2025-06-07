'use client';
import { Cliente } from '@/app/types/cliente';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
    cliente: Cliente;
    isAdmin?: boolean;
    handleDeletar: (id: string) => void;
};

export default function ItemCliente({ cliente, isAdmin, handleDeletar }: Props) {
    const router = useRouter();

    return (
        <li
            key={cliente.id}
            className="border p-4 rounded flex justify-between items-center"
        >
            <div>
                <p className="font-semibold">{cliente.nome}</p>
                <p className="text-sm text-gray-600">{cliente.email}</p>
            </div>
            <div className="flex gap-2">
                <Link
                    href={`/clientes/editar/${cliente.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Editar
                </Link>
                <button
                    onClick={() => {
                        if (cliente.id) handleDeletar(cliente.id

                        )
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                    Excluir
                </button>
            </div>
        </li>
    )
}