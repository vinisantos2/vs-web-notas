'use client';

import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/cliente';
import ClienteForm from '../components/ClienteForm';

type ClienteComId = Cliente & { id: string };

export default function ListaClientes() {
    const [clientes, setClientes] = useState<ClienteComId[]>([]);
    const [clienteEditando, setClienteEditando] = useState<ClienteComId | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function fetchClientes() {
            await new Promise((r) => setTimeout(r, 1000));
            setClientes([
                {
                    id: '1',
                    nome: 'Maria Silva',
                    email: 'maria@email.com',
                    telefone: '11999999999',
                    cpfCnpj: '123.456.789-00',
                },
                {
                    id: '2',
                    nome: 'João Souza',
                    email: 'joao@email.com',
                    telefone: '11988887777',
                },
            ]);
            setCarregando(false);
        }
        fetchClientes();
    }, []);

    function atualizarCliente(updatedCliente: Cliente) {
        if (!clienteEditando) return;

        setClientes((old) =>
            old.map((c) =>
                c.id === clienteEditando.id ? { ...updatedCliente, id: clienteEditando.id } : c
            )
        );
        setClienteEditando(null);
    }

    function deletarCliente(id: string) {
        if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

        setClientes((old) => old.filter((c) => c.id !== id));
    }

    if (carregando) return <p>Carregando clientes...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>

            {clientes.length === 0 && <p>Nenhum cliente cadastrado.</p>}

            <ul className="space-y-3">
                {clientes.map((cliente) => (
                    <li
                        key={cliente.id}
                        className="border p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{cliente.nome}</p>
                            <p className="text-sm text-gray-600">{cliente.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setClienteEditando(cliente)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deletarCliente(cliente.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {clienteEditando && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                    onClick={() => setClienteEditando(null)}
                >
                    <div
                        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
                        <ClienteForm
                            clienteInicial={clienteEditando}
                            onSubmit={atualizarCliente}
                            onCancel={() => setClienteEditando(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
