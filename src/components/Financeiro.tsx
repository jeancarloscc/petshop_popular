import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Receipt, ShoppingCart, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Dados mockados
const vendasMensais = 34500.00;
const despesasMensais = 14030.00;
const lucroLiquido = vendasMensais - despesasMensais;

const dadosUltimos7Dias = [
  { dia: '14/11', vendas: 850, despesas: 450, lucro: 400 },
  { dia: '15/11', vendas: 1050, despesas: 580, lucro: 470 },
  { dia: '16/11', vendas: 1250, despesas: 620, lucro: 630 },
  { dia: '17/11', vendas: 720, despesas: 380, lucro: 340 },
  { dia: '18/11', vendas: 1580, despesas: 750, lucro: 830 },
  { dia: '19/11', vendas: 1320, despesas: 520, lucro: 800 },
  { dia: '20/11', vendas: 1100, despesas: 490, lucro: 610 },
];

const comparativoMensal = [
  { mes: 'Jul', vendas: 28500, despesas: 12400, lucro: 16100 },
  { mes: 'Ago', vendas: 31200, despesas: 13800, lucro: 17400 },
  { mes: 'Set', vendas: 29800, despesas: 13200, lucro: 16600 },
  { mes: 'Out', vendas: 33100, despesas: 14500, lucro: 18600 },
  { mes: 'Nov', vendas: 34500, despesas: 14030, lucro: 20470 },
];

export function Financeiro() {
  const [periodo, setPeriodo] = useState<'dia' | 'semana' | 'mes' | 'ano'>('mes');

  const margemLucro = (lucroLiquido / vendasMensais) * 100;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Painel Financeiro</h1>
        <p className="text-gray-600">Visão completa da saúde financeira do negócio</p>
      </div>

      {/* Filtros de Período */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setPeriodo('dia')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            periodo === 'dia'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Diário
        </button>
        <button
          onClick={() => setPeriodo('semana')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            periodo === 'semana'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Semanal
        </button>
        <button
          onClick={() => setPeriodo('mes')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            periodo === 'mes'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Mensal
        </button>
        <button
          onClick={() => setPeriodo('ano')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            periodo === 'ano'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Anual
        </button>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-blue-100 mb-1">Faturamento Total</p>
          <p className="text-white">R$ {vendasMensais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <TrendingDown className="w-5 h-5" />
          </div>
          <p className="text-red-100 mb-1">Total de Despesas</p>
          <p className="text-white">R$ {despesasMensais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-green-100 mb-1">Lucro Líquido</p>
          <p className="text-white">R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-purple-100 mb-1">Margem de Lucro</p>
          <p className="text-white">{margemLucro.toFixed(1)}%</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Últimos 7 Dias */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-6">Desempenho - Últimos 7 Dias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosUltimos7Dias}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} name="Vendas" />
              <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} name="Despesas" />
              <Line type="monotone" dataKey="lucro" stroke="#10b981" strokeWidth={2} name="Lucro" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comparativo Mensal */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-6">Comparativo - Últimos 5 Meses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparativoMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="vendas" fill="#3b82f6" name="Vendas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
              <Bar dataKey="lucro" fill="#10b981" name="Lucro" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumo Detalhado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise de Performance */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-4">Análise de Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Crescimento vs Mês Anterior</span>
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +4.2%
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Ticket Médio</span>
              <span className="text-gray-900">R$ 243,66</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Número de Transações</span>
              <span className="text-gray-900">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ROI (Retorno sobre Investimento)</span>
              <span className="text-green-600">145.9%</span>
            </div>
          </div>
        </div>

        {/* Principais Indicadores */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-900 mb-4">Principais Indicadores</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxa de Conversão</span>
                <span className="text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Eficiência Operacional</span>
                <span className="text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Controle de Custos</span>
                <span className="text-gray-900">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Satisfação do Cliente</span>
                <span className="text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metas e Projeções */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-gray-900 mb-4">Projeção para o Próximo Mês</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Faturamento Projetado</p>
            <p className="text-blue-600">R$ 37.000,00</p>
            <p className="text-green-600">+7.2% de crescimento esperado</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Despesas Estimadas</p>
            <p className="text-red-600">R$ 15.200,00</p>
            <p className="text-gray-600">Dentro do orçamento planejado</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Lucro Projetado</p>
            <p className="text-green-600">R$ 21.800,00</p>
            <p className="text-green-600">+6.5% vs mês atual</p>
          </div>
        </div>
      </div>
    </div>
  );
}
