import { useState } from 'react';
import { Download, FileText, TrendingUp, DollarSign, Package, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Product {
  id: number;
  nome: string;
  preco: number;
  custo: number;
  categoria: string;
}

interface Transaction {
  id: number;
  data: string;
  hora: string;
  caixa: string;
  caixaId: number;
  items: {
    produtoId: number;
    nome: string;
    quantidade: number;
    preco: number;
    custo: number;
  }[];
  total: number;
  metodoPagamento: string;
}

// Dados mockados
const produtos: Product[] = [
  { id: 1, nome: 'Ração Premium Cães 15kg', preco: 189.90, custo: 120.00, categoria: 'Ração' },
  { id: 2, nome: 'Ração Premium Gatos 10kg', preco: 159.90, custo: 100.00, categoria: 'Ração' },
  { id: 3, nome: 'Coleira Anti-pulgas', preco: 45.00, custo: 28.00, categoria: 'Acessórios' },
  { id: 4, nome: 'Brinquedo Mordedor', preco: 29.90, custo: 15.00, categoria: 'Brinquedos' },
  { id: 5, nome: 'Shampoo Antipulgas 500ml', preco: 34.90, custo: 20.00, categoria: 'Higiene' },
  { id: 6, nome: 'Cama Pet Grande', preco: 129.00, custo: 80.00, categoria: 'Acessórios' },
  { id: 7, nome: 'Comedouro Automático', preco: 199.00, custo: 130.00, categoria: 'Acessórios' },
  { id: 8, nome: 'Vermífugo 4 comprimidos', preco: 42.50, custo: 25.00, categoria: 'Medicamentos' },
];

const transacoes: Transaction[] = [
  {
    id: 1,
    data: '2025-11-20',
    hora: '10:30',
    caixa: 'João Santos',
    caixaId: 3,
    items: [
      { produtoId: 1, nome: 'Ração Premium Cães 15kg', quantidade: 2, preco: 189.90, custo: 120.00 },
      { produtoId: 5, nome: 'Shampoo Antipulgas 500ml', quantidade: 1, preco: 34.90, custo: 20.00 },
    ],
    total: 414.70,
    metodoPagamento: 'Cartão de Crédito',
  },
  {
    id: 2,
    data: '2025-11-20',
    hora: '11:15',
    caixa: 'João Santos',
    caixaId: 3,
    items: [
      { produtoId: 4, nome: 'Brinquedo Mordedor', quantidade: 3, preco: 29.90, custo: 15.00 },
    ],
    total: 89.70,
    metodoPagamento: 'Dinheiro',
  },
  {
    id: 3,
    data: '2025-11-19',
    hora: '14:20',
    caixa: 'Maria Silva',
    caixaId: 2,
    items: [
      { produtoId: 2, nome: 'Ração Premium Gatos 10kg', quantidade: 1, preco: 159.90, custo: 100.00 },
      { produtoId: 3, nome: 'Coleira Anti-pulgas', quantidade: 2, preco: 45.00, custo: 28.00 },
    ],
    total: 249.90,
    metodoPagamento: 'PIX',
  },
  {
    id: 4,
    data: '2025-11-19',
    hora: '16:45',
    caixa: 'João Santos',
    caixaId: 3,
    items: [
      { produtoId: 7, nome: 'Comedouro Automático', quantidade: 1, preco: 199.00, custo: 130.00 },
    ],
    total: 199.00,
    metodoPagamento: 'Cartão de Débito',
  },
  {
    id: 5,
    data: '2025-11-18',
    hora: '09:30',
    caixa: 'Maria Silva',
    caixaId: 2,
    items: [
      { produtoId: 6, nome: 'Cama Pet Grande', quantidade: 1, preco: 129.00, custo: 80.00 },
      { produtoId: 8, nome: 'Vermífugo 4 comprimidos', quantidade: 2, preco: 42.50, custo: 25.00 },
    ],
    total: 214.00,
    metodoPagamento: 'Cartão de Crédito',
  },
];

const CORES = ['#fdba74', '#ff3131', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

export function RelatoriosAvancados() {
  const [dataInicio, setDataInicio] = useState('2025-11-18');
  const [dataFim, setDataFim] = useState('2025-11-20');
  const [filtroData, setFiltroData] = useState('');
  const [filtroCaixa, setFiltroCaixa] = useState('');
  const [filtroProduto, setFiltroProduto] = useState('');

  // Calcular margem de lucro por produto
  const produtosComMargem = produtos.map((p) => ({
    ...p,
    margemLucro: ((p.preco - p.custo) / p.preco) * 100,
    lucroUnitario: p.preco - p.custo,
  })).sort((a, b) => b.margemLucro - a.margemLucro);

  // Filtrar transações
  const transacoesFiltradas = transacoes.filter((t) => {
    const dataTransacao = new Date(t.data);
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    
    const dentroData = dataTransacao >= inicio && dataTransacao <= fim;
    const filtroCaixaOk = !filtroCaixa || t.caixa.toLowerCase().includes(filtroCaixa.toLowerCase());
    const filtroProdutoOk = !filtroProduto || t.items.some((item) =>
      item.nome.toLowerCase().includes(filtroProduto.toLowerCase())
    );

    return dentroData && filtroCaixaOk && filtroProdutoOk;
  });

  // Calcular totais
  const receitaTotal = transacoesFiltradas.reduce((acc, t) => acc + t.total, 0);
  const custoTotal = transacoesFiltradas.reduce((acc, t) => {
    return acc + t.items.reduce((sum, item) => sum + (item.custo * item.quantidade), 0);
  }, 0);
  const lucroTotal = receitaTotal - custoTotal;
  const margemLucroTotal = receitaTotal > 0 ? (lucroTotal / receitaTotal) * 100 : 0;

  // Dados para gráfico de vendas por dia
  const vendasPorDia = transacoesFiltradas.reduce((acc, t) => {
    const data = new Date(t.data).toLocaleDateString('pt-BR');
    if (!acc[data]) {
      acc[data] = { data, vendas: 0, receita: 0 };
    }
    acc[data].vendas += 1;
    acc[data].receita += t.total;
    return acc;
  }, {} as Record<string, { data: string; vendas: number; receita: number }>);

  const dadosVendasPorDia = Object.values(vendasPorDia);

  // Dados para gráfico de receita por categoria
  const receitaPorCategoria = transacoesFiltradas.reduce((acc, t) => {
    t.items.forEach((item) => {
      const produto = produtos.find((p) => p.id === item.produtoId);
      if (produto) {
        const categoria = produto.categoria;
        if (!acc[categoria]) {
          acc[categoria] = { categoria, receita: 0, quantidade: 0 };
        }
        acc[categoria].receita += item.preco * item.quantidade;
        acc[categoria].quantidade += item.quantidade;
      }
    });
    return acc;
  }, {} as Record<string, { categoria: string; receita: number; quantidade: number }>);

  const dadosReceitaPorCategoria = Object.values(receitaPorCategoria);

  // Exportar para CSV
  const exportarCSV = () => {
    const headers = ['Data', 'Hora', 'Caixa', 'Produto', 'Quantidade', 'Preço Unit.', 'Total', 'Método Pagamento'];
    const rows = transacoesFiltradas.flatMap((t) =>
      t.items.map((item) => [
        t.data,
        t.hora,
        t.caixa,
        item.nome,
        item.quantidade,
        `R$ ${item.preco.toFixed(2)}`,
        `R$ ${(item.preco * item.quantidade).toFixed(2)}`,
        t.metodoPagamento,
      ])
    );

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-vendas-${dataInicio}-${dataFim}.csv`;
    a.click();
  };

  // Exportar margem de lucro para CSV
  const exportarMargemLucroCSV = () => {
    const headers = ['Produto', 'Preço (R$)', 'Custo (R$)', 'Lucro Unitário (R$)', 'Margem de Lucro (%)'];
    const rows = produtosComMargem.map((p) => [
      p.nome,
      p.preco.toFixed(2),
      p.custo.toFixed(2),
      p.lucroUnitario.toFixed(2),
      p.margemLucro.toFixed(2),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `margem-lucro-produtos.csv`;
    a.click();
  };

  // Exportar para PDF (simulado - em produção, use jsPDF ou similar)
  const exportarPDF = () => {
    alert('Exportação para PDF: Em produção, use bibliotecas como jsPDF ou react-pdf para gerar o PDF.');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Relatórios Avançados</h1>
        <p className="text-gray-600">Análise detalhada de vendas, lucros e tendências</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-gray-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Data Início</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Data Fim</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Filtrar por Caixa</label>
            <input
              type="text"
              placeholder="Nome do caixa"
              value={filtroCaixa}
              onChange={(e) => setFiltroCaixa(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Filtrar por Produto</label>
            <input
              type="text"
              placeholder="Nome do produto"
              value={filtroProduto}
              onChange={(e) => setFiltroProduto(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
            />
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-[#fdba74] to-[#fca855] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
          </div>
          <p className="text-white text-sm mb-1">Receita Total</p>
          <p className="text-2xl">R$ {receitaTotal.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
          </div>
          <p className="text-white text-sm mb-1">Lucro Total</p>
          <p className="text-2xl">R$ {lucroTotal.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8" />
          </div>
          <p className="text-white text-sm mb-1">Margem de Lucro</p>
          <p className="text-2xl">{margemLucroTotal.toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-white text-sm mb-1">Transações</p>
          <p className="text-2xl">{transacoesFiltradas.length}</p>
        </div>
      </div>

      {/* Botões de Exportação */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={exportarCSV}
          className="px-6 py-3 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Exportar CSV
        </button>
        <button
          onClick={exportarPDF}
          className="px-6 py-3 bg-[#ff3131] text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Vendas por Dia */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Volume de Vendas por Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosVendasPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="vendas" fill="#fdba74" name="Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Receita por Dia */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Receita por Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosVendasPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="receita" stroke="#fdba74" strokeWidth={2} name="Receita (R$)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Receita por Categoria */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Receita por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosReceitaPorCategoria} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="categoria" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="receita" fill="#fdba74" name="Receita (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Quantidade por Categoria */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Volume (Unidades) por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosReceitaPorCategoria}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantidade" fill="#ff3131" name="Unidades Vendidas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Margem de Lucro por Produto */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-900">Margem de Lucro por Produto</h3>
          <button
            onClick={exportarMargemLucroCSV}
            className="px-4 py-2 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Produto</th>
                <th className="px-6 py-3 text-left text-gray-600">Categoria</th>
                <th className="px-6 py-3 text-left text-gray-600">Preço</th>
                <th className="px-6 py-3 text-left text-gray-600">Custo</th>
                <th className="px-6 py-3 text-left text-gray-600">Lucro Unit.</th>
                <th className="px-6 py-3 text-left text-gray-600">Margem (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {produtosComMargem.map((produto) => (
                <tr key={produto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{produto.nome}</td>
                  <td className="px-6 py-4 text-gray-600">{produto.categoria}</td>
                  <td className="px-6 py-4 text-gray-900">R$ {produto.preco.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-600">R$ {produto.custo.toFixed(2)}</td>
                  <td className="px-6 py-4 text-green-600">R$ {produto.lucroUnitario.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      produto.margemLucro >= 50 ? 'bg-green-100 text-green-700' :
                      produto.margemLucro >= 30 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {produto.margemLucro.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Histórico de Transações */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Histórico de Transações</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Data/Hora</th>
                <th className="px-6 py-3 text-left text-gray-600">Caixa</th>
                <th className="px-6 py-3 text-left text-gray-600">Itens</th>
                <th className="px-6 py-3 text-left text-gray-600">Total</th>
                <th className="px-6 py-3 text-left text-gray-600">Pagamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transacoesFiltradas.map((transacao) => (
                <tr key={transacao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">#{transacao.id}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(transacao.data).toLocaleDateString('pt-BR')} {transacao.hora}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{transacao.caixa}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {transacao.items.map((item, i) => (
                      <div key={i} className="text-sm">
                        {item.quantidade}x {item.nome}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-gray-900">R$ {transacao.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      {transacao.metodoPagamento}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}