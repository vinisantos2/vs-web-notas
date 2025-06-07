export interface Nota {
  id: string;
  clienteId: string;
  clienteNome: string;
  servicoId: string;
  servicoNome: string;
  valor: number;
  observacao?: string;
  dataCriacao: string;
  usuarioId: string;
}

