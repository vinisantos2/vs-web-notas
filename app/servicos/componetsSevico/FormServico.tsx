'use client';

import { useEffect, useState } from 'react';

type Servico = {
  nome: string;
  descricao: string;
  valor: number;
};

type Props = {
  servicoInicial?: Servico;
  onSubmit: (data: Servico) => void;
  onCancel?: () => void;
};

export default function FormServico({ servicoInicial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    valor: ''
  });

  useEffect(() => {
    if (servicoInicial) {
      setForm({
        nome: servicoInicial.nome,
        descricao: servicoInicial.descricao,
        valor: servicoInicial.valor.toString()
      });
    }
  }, [servicoInicial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nome || !form.valor) {
      alert('Preencha o nome e o valor');
      return;
    }

    const valor = parseFloat(form.valor);
    if (isNaN(valor)) {
      alert('Valor inválido');
      return;
    }

    onSubmit({
      nome: form.nome,
      descricao: form.descricao,
      valor
    });

    setForm({ nome: '', descricao: '', valor: '' });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow max-w-md w-full space-y-4"
    >
      <h2 className="text-2xl font-bold">
        {servicoInicial ? 'Editar Serviço' : 'Novo Serviço'}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ex: Instalação elétrica"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Descrição do serviço"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Valor (R$)</label>
        <input
          type="number"
          name="valor"
          value={form.valor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          step="0.01"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {servicoInicial ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
