export default function CardViewServico({ servico }: { servico: Servico }) {
    return (
        <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <h3 className="text-lg font-bold">{servico.nome}</h3>
            <p className="text-gray-600">{servico.descricao}</p>
            <p className="text-green-700 font-bold mt-2">R$ {servico.valor.toFixed(2)}</p>
        </div>
    )
}