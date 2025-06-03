import { NextRequest, NextResponse } from 'next/server';

type Nota = {
  id: string;
  titulo: string;
  conteudo: string;
  criadoEm: string;
};

let notas: Nota[] = []; // Armazenamento simples em memória (zerará a cada reload)

function gerarId() {
  return Math.random().toString(36).substr(2, 9);
}

export async function GET() {
  // Retorna lista de notas
  return NextResponse.json(notas);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { titulo, conteudo } = data;

    if (!titulo || !conteudo) {
      return NextResponse.json(
        { error: 'Titulo e conteudo são obrigatórios' },
        { status: 400 }
      );
    }

    const novaNota: Nota = {
      id: gerarId(),
      titulo,
      conteudo,
      criadoEm: new Date().toISOString(),
    };

    notas.push(novaNota);

    return NextResponse.json(novaNota, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}
