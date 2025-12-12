import { useState } from 'react';
import { Download, Calendar, TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const vendasPorDia = [
  { data: '14/11', vendas: 12, valor: 850 },
  { data: '15/11', vendas: 15, valor: 1050 },
  { data: '16/11', vendas: 18, valor: 1250 },
  { data: '17/11', vendas: 10, valor: 720 },
  { data: '18/11', vendas: 22, valor: 1580 },
  { data: '19/11', vendas: 19, valor: 1320 },
  { data: '20/11', vendas: 16, valor: 1100 },
];

const vendasPorCategoria = [
  { categoria: 'Ração', vendas: 45, valor: 8540 },
  { categoria: 'Brinquedos', vendas: 32, valor: 1890 },
  { categoria: 'Acessórios', vendas: 28, valor: 3250 },
  { categoria: 'Higiene', vendas: 25, valor: 2120 },
  { categoria: 'Medicamentos', vendas: 12, valor: 980 },
];

const topProdutos = [
  { nome: 'Ração Premium Cães 15kg', vendas: 28, valor: 5317.20 },
  { nome: 'Ração Premium Gatos 10kg', vendas: 22, valor: 3517.80 },
  { nome: 'Coleira Anti-pulgas', vendas: 18, valor: 810.00 },
  { nome: 'Shampoo Antipulgas 500ml', vendas: 16, valor: 558.40 },
  { nome: 'Cama Pet Grande', vendas: 12, valor: 1548.00 },
];

export function Relatorios() {
  const [periodo, setPeriodo] = useState('7dias');

  const exportarRelatorio = () => {
    alert('Relatório exportado com sucesso! (Funcionalidade de demonstração)');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Relatórios de Vendas</h1>
        <p className="text-gray-600">Análise detalhada do desempenho da loja</p>
      </div>

      {/* Filtros e Exportar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setPeriodo('7dias')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              periodo === '7dias'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Últimos 7 dias
          </button>
          <button
            onClick={() => setPeriodo('30dias')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              periodo === '30dias'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Últimos 30 dias
          </button>
          <button
            onClick={() => setPeriodo('90dias')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              periodo === '90dias'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Últimos 90 dias
          </button>
        </div>
        <button
          onClick={exportarRelatorio}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Faturamento Total</p>
          <p className="text-gray-900">R$ 8.870,00</p>
          <p className="text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +12.5% vs período anterior
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Total de Vendas</p>
          <p className="text-gray-900">112</p>
          <p className="text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +8.2% vs período anterior
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Ticket Médio</p>
          <p className="text-gray-900">R$ 79,20</p>
          <p className="text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +4.3% vs período anterior
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Produtos Vendidos</p>
          <p className="text-gray-900">142</p>
          <p className="text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +11.7% vs período anterior
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-6">Vendas por Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendasPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="data" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} name="Vendas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-6">Faturamento por Dia (R$)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendasPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="data" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="valor" fill="#10b981" name="Faturamento" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas por Categoria */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Vendas por Categoria</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Categoria</th>
                  <th className="px-6 py-3 text-left text-gray-600">Vendas</th>
                  <th className="px-6 py-3 text-left text-gray-600">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vendasPorCategoria.map((item) => (
                  <tr key={item.categoria} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{item.categoria}</td>
                    <td className="px-6 py-4 text-gray-600">{item.vendas}</td>
                    <td className="px-6 py-4 text-gray-900">R$ {item.valor.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Produtos */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Produtos Mais Vendidos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Produto</th>
                  <th className="px-6 py-3 text-left text-gray-600">Vendas</th>
                  <th className="px-6 py-3 text-left text-gray-600">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProdutos.map((produto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{produto.nome}</td>
                    <td className="px-6 py-4 text-gray-600">{produto.vendas}</td>
                    <td className="px-6 py-4 text-gray-900">R$ {produto.valor.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
