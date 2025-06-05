'use client';

import { useState } from 'react';
import { Cliente } from '@/app/types/cliente';

type Props = {
  clienteInicial?: Cliente;
  onSubmit: (cliente: Cliente) => void;
  onCancel?: () => void;
};

export default function ClienteForm({ clienteInicial, onSubmit, onCancel }: Props) {
  const [cliente, setCliente] = useState<Cliente>({
    nome: clienteInicial?.nome || '',
    email: clienteInicial?.email || '',
    telefone: clienteInicial?.telefone || '',
    cpfCnpj: clienteInicial?.cpfCnpj || '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(cliente);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4"
    >
      <div>
        <label className="block font-medium">Nome</label>
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">CPF/CNPJ</label>
        <input
          type="text"
          name="cpfCnpj"
          value={cliente.cpfCnpj}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
