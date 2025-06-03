'use client'

import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment } from 'react'
import FormServico from './FormServico'

type Servico = {
  id?: string
  nome: string
  descricao: string
  valor: number
}

type Props = {
  isOpen: boolean
  onClose: () => void
  servico?: Servico
  onSuccess?: () => void
}

export default function EditServicoModal({ isOpen, onClose, servico, onSuccess }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
            <X />
          </button>
          <h2 className="text-xl font-bold mb-4">Editar Serviço</h2>
          <FormServico servico={servico} onSuccess={onSuccess} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
