'use client'

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

type Servico = {
  id?: string;
  nome: string;
  descricao: string;
  valor: number;
};

type Props = {
  servico?: Servico;
  onSuccess?: () => void;
};

export default function FormServico({ servico, onSuccess }: Props) {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    valor: ''
  });

  // Preenche o formulário se estiver editando
  useEffect(() => {
    if (servico) {
      setForm({
        nome: servico.nome,
        descricao: servico.descricao,
        valor: servico.valor.toString()
      });
    }
  }, [servico]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.valor) return alert("Preencha nome e valor");

    try {
      const data = {
        nome: form.nome,
        descricao: form.descricao,
        valor: parseFloat(form.valor)
      };

      if (servico?.id) {
        // Atualização
        const ref = doc(db, 'servicos', servico.id);
        await updateDoc(ref, data);
        alert('Serviço atualizado com sucesso!');
      } else {
        // Criação
        await addDoc(collection(db, 'servicos'), data);
        alert('Serviço cadastrado com sucesso!');
      }

      if (onSuccess) onSuccess();
      setForm({ nome: '', descricao: '', valor: '' });
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar serviço');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {servico ? 'Editar serviço' : 'Cadastrar novo serviço'}
      </h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome do serviço"
        className="w-full border p-2 mb-2"
        value={form.nome}
        onChange={handleChange}
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        className="w-full border p-2 mb-2"
        value={form.descricao}
        onChange={handleChange}
      />

      <input
        type="number"
        name="valor"
        placeholder="Valor (R$)"
        className="w-full border p-2 mb-4"
        value={form.valor}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {servico ? 'Atualizar' : 'Salvar'}
      </button>
    </div>
  );
}
