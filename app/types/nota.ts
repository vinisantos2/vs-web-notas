export type Nota = {
  clienteId: string;
  servicoId: string;
  valor: number;
  data: string; // ou Date, se preferir
  descricao?: string;
};
