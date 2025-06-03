'use client'
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function FormNota() {
  const [form, setForm] = useState({
    cliente: '',
    servico: '',
    valor: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'notas'), {
        ...form,
        data: new Date().toISOString(),
      });
      alert('Nota salva com sucesso!');
    } catch (err) {
      alert('Erro ao salvar nota');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Nova Nota</h2>
      <input
        className="w-full border p-2"
        type="text"
        name="cliente"
        placeholder="Cliente"
        value={form.cliente}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2"
        type="text"
        name="servico"
        placeholder="Serviço"
        value={form.servico}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2"
        type="number"
        name="valor"
        placeholder="Valor (R$)"
        value={form.valor}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Salvar nota
      </button>
    </div>
  );
}
