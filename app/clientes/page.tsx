'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cliente } from '../types/cliente';
import { clienteService } from '../services/clienteService';

type ClienteComId = Cliente & { id: string };

export default function ListaClientes() {
  const [clientes, setClientes] = useState<ClienteComId[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await clienteService.getAll();
        setClientes(data);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
      } finally {
        setCarregando(false);
      }
    }
    fetchClientes();
  }, []);

  async function deletarCliente(id: string) {
    const confirmado = confirm('Tem certeza que deseja excluir este cliente?');
    if (!confirmado) return;

    try {
      await clienteService.remove(id);
      setClientes((old) => old.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
    }
  }

  if (carregando) return <p>Carregando clientes...</p>;

  return (
    <div className="max-w-3xl mx-auto p-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Clientes</h1>
        <Link
          href="/clientes/novo-cliente"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Novo Cliente
        </Link>
      </div>

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
              <Link
                href={`/clientes/editar/${cliente.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Editar
              </Link>
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
    </div>
  );
}
