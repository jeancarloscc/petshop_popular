import { TrendingUp, ShoppingCart, Package, DollarSign, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Dados de volume de vendas por categoria (DIA ATUAL - 20/11/2025)
const volumeHojeCategoriaData = [
  { categoria: 'Ração', unidades: 22 },
  { categoria: 'Acessórios', unidades: 30 },
  { categoria: 'Higiene', unidades: 20 },
  { categoria: 'Brinquedos', unidades: 25 },
  { categoria: 'Medicamentos', unidades: 12 },
];

// Dados de receita por categoria (DIA ATUAL - 20/11/2025)
const receitaHojeCategoriaData = [
  { categoria: 'Ração', receita: 2200 },
  { categoria: 'Acessórios', receita: 1500 },
  { categoria: 'Higiene', receita: 700 },
  { categoria: 'Brinquedos', receita: 750 },
  { categoria: 'Medicamentos', receita: 420 },
];

// Top 10 produtos mais vendidos
const produtosMaisVendidos = [
  { id: 1, nome: 'Ração Premium Cães 15kg', categoria: 'Ração', unidadesVendidas: 156, receita: 29624.40 },
  { id: 2, nome: 'Ração Premium Gatos 10kg', categoria: 'Ração', unidadesVendidas: 142, receita: 22705.80 },
  { id: 3, nome: 'Coleira Anti-pulgas', categoria: 'Acessórios', unidadesVendidas: 128, receita: 5760.00 },
  { id: 4, nome: 'Brinquedo Mordedor', categoria: 'Brinquedos', unidadesVendidas: 195, receita: 5830.50 },
  { id: 5, nome: 'Shampoo Antipulgas 500ml', categoria: 'Higiene', unidadesVendidas: 118, receita: 4118.20 },
  { id: 6, nome: 'Cama Pet Grande', categoria: 'Acessórios', unidadesVendidas: 87, receita: 11223.00 },
  { id: 7, nome: 'Comedouro Automático', categoria: 'Acessórios', unidadesVendidas: 65, receita: 12935.00 },
  { id: 8, nome: 'Vermífugo 4 comprimidos', categoria: 'Medicamentos', unidadesVendidas: 103, receita: 4377.50 },
  { id: 9, nome: 'Tapete Higiênico 30un', categoria: 'Higiene', unidadesVendidas: 94, receita: 3290.00 },
  { id: 10, nome: 'Petiscos Naturais 200g', categoria: 'Alimentos', unidadesVendidas: 156, receita: 2808.00 },
];

const recentSales = [
  { id: 1, cliente: 'Maria Silva', produto: 'Ração Premium 15kg', valor: 189.90, data: '2025-11-20' },
  { id: 2, cliente: 'João Santos', produto: 'Coleira Anti-pulgas', valor: 45.00, data: '2025-11-20' },
  { id: 3, cliente: 'Ana Costa', produto: 'Brinquedo Mordedor', valor: 29.90, data: '2025-11-19' },
  { id: 4, cliente: 'Pedro Oliveira', produto: 'Shampoo Antipulgas', valor: 34.90, data: '2025-11-19' },
  { id: 5, cliente: 'Carla Mendes', produto: 'Cama Pet G', valor: 129.00, data: '2025-11-19' },
];

const CORES = ['#fdba74', '#ff3131', '#fbbf24', '#34d399', '#60a5fa'];

export function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-gray-900 mb-2 text-xl sm:text-2xl">Dashboard</h1>
        <p className="text-gray-600 text-sm sm:text-base">Visão geral do seu petshop</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#fff5eb] rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#fdba74]" />
            </div>
            <span className="text-green-600 flex items-center gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              +12.5%
            </span>
          </div>
          <p className="text-gray-600 mb-1 text-xs sm:text-sm">Vendas do Mês</p>
          <p className="text-gray-900 text-lg sm:text-2xl">R$ 10.800,00</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <span className="text-green-600 flex items-center gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              +8.2%
            </span>
          </div>
          <p className="text-gray-600 mb-1 text-xs sm:text-sm">Pedidos</p>
          <p className="text-gray-900 text-lg sm:text-2xl">142</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <span className="text-red-600 flex items-center gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 transform rotate-180" />
              -3.1%
            </span>
          </div>
          <p className="text-gray-600 mb-1 text-xs sm:text-sm">Produtos em Estoque</p>
          <p className="text-gray-900 text-lg sm:text-2xl">238</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <span className="text-green-600 flex items-center gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              +15.3%
            </span>
          </div>
          <p className="text-gray-600 mb-1 text-xs sm:text-sm">Ticket Médio</p>
          <p className="text-gray-900 text-lg sm:text-2xl">R$ 76,06</p>
        </div>
      </div>

      {/* Gráficos Diários por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Volume Diário por Categoria */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-4 text-base sm:text-lg">Volume de Vendas Diárias por Categoria</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={volumeHojeCategoriaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} unidades`} />
              <Legend />
              <Bar dataKey="unidades" fill="#fdba74" name="Unidades Vendidas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Receita Diária por Categoria */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-4 text-base sm:text-lg">Receita Diária por Categoria</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={receitaHojeCategoriaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value}`} />
              <Legend />
              <Bar dataKey="receita" fill="#ff3131" name="Receita (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 10 Produtos Mais Vendidos */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 lg:mb-8">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#fdba74]" />
            <h2 className="text-gray-900 text-base sm:text-lg">Top 10 Produtos Mais Vendidos</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Posição</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Produto</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Categoria</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Unidades Vendidas</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Receita Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {produtosMaisVendidos.map((produto, index) => (
                <tr key={produto.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center">
                      {index < 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          <span className="text-sm">#{index + 1}</span>
                        </div>
                      ) : (
                        <span className="text-gray-600 text-sm">#{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-900 text-xs sm:text-sm">
                    {produto.nome}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-900 text-xs sm:text-sm">
                    {produto.unidadesVendidas} unidades
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-green-600 text-xs sm:text-sm">
                    R$ {produto.receita.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendas Recentes */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-gray-900 text-base sm:text-lg">Vendas Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Cliente</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Produto</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Valor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-gray-600 text-xs sm:text-sm">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-900 text-xs sm:text-sm">{sale.cliente}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">{sale.produto}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-900 text-xs sm:text-sm">R$ {sale.valor.toFixed(2)}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">
                    {new Date(sale.data).toLocaleDateString('pt-BR')}
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