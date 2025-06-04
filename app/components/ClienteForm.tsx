import React, { useState, useEffect, FormEvent } from 'react';
import { Cliente } from '../types/cliente';

type Props = {
  clienteInicial?: Cliente;
  onSubmit: (cliente: Cliente) => void;
  onCancel?: () => void; // opcional para cancelar edição
};

export default function ClienteForm({ clienteInicial, onSubmit, onCancel }: Props) {
  const [nome, setNome] = useState(clienteInicial?.nome || '');
  const [email, setEmail] = useState(clienteInicial?.email || '');
  const [telefone, setTelefone] = useState(clienteInicial?.telefone || '');
  const [cpfCnpj, setCpfCnpj] = useState(clienteInicial?.cpfCnpj || '');

  const [errors, setErrors] = useState<{ nome?: string; email?: string }>({});

  // Validar campos simples
  function validar() {
    const novosErros: typeof errors = {};
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!email.trim()) novosErros.email = 'Email é obrigatório';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      novosErros.email = 'Email inválido';

    setErrors(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validar()) return;

    onSubmit({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim() || undefined,
      cpfCnpj: cpfCnpj.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="nome" className="block font-semibold mb-1">
          Nome *
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className={`w-full border rounded px-3 py-2 ${
            errors.nome ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full border rounded px-3 py-2 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="telefone" className="block font-semibold mb-1">
          Telefone
        </label>
        <input
          type="tel"
          id="telefone"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="cpfCnpj" className="block font-semibold mb-1">
          CPF/CNPJ
        </label>
        <input
          type="text"
          id="cpfCnpj"
          value={cpfCnpj}
          onChange={e => setCpfCnpj(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
