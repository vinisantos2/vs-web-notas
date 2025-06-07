'use client';

import { useState } from 'react';
import { Nota } from '../types/nota';
import Modal from './Modal';

interface Props {
  nota: Nota;
}

export default function GerarNotaPDF({ nota }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const gerarPDF = async () => {
    const element = document.getElementById('nota-pdf');
    if (!element) return;

    const html2pdf = (await import('html2pdf.js')).default;

    html2pdf()
      .set({
        margin: 10,
        filename: `nota-${nota.id}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
      >
        Gerar Nota em PDF
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div id="nota-pdf">
          <h2 className="text-xl font-bold mb-4">Nota Fiscal</h2>
          <p><strong>Cliente:</strong> {nota.clienteId}</p>
          <p><strong>Serviço:</strong> {nota.servicoId}</p>
          <p><strong>Valor:</strong> R$ {nota.valor.toFixed(2)}</p>
          <p><strong>Data:</strong> {new Date(nota.dataCriacao).toLocaleDateString('pt-BR')}</p>
          <p><strong>ID:</strong> {nota.id}</p>
        </div>

        <button
          onClick={gerarPDF}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Baixar PDF
        </button>
      </Modal>
    </>
  );
}
