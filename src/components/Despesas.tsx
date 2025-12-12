import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Receipt, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: 'aluguel' | 'compra_estoque' | 'salarios' | 'energia' | 'agua' | 'marketing' | 'manutencao' | 'outros';
}

const initialDespesas: Despesa[] = [
  { id: 1, descricao: 'Aluguel do mês', valor: 3000.00, data: '2025-11-01', categoria: 'aluguel' },
  { id: 2, descricao: 'Compra de rações', valor: 4500.00, data: '2025-11-05', categoria: 'compra_estoque' },
  { id: 3, descricao: 'Salários', valor: 6000.00, data: '2025-11-10', categoria: 'salarios' },
  { id: 4, descricao: 'Conta de luz', valor: 350.00, data: '2025-11-15', categoria: 'energia' },
  { id: 5, descricao: 'Conta de água', valor: 180.00, data: '2025-11-15', categoria: 'agua' },
];

const categorias = {
  aluguel: 'Aluguel',
  compra_estoque: 'Compra de Estoque',
  salarios: 'Salários',
  energia: 'Energia',
  agua: 'Água',
  marketing: 'Marketing',
  manutencao: 'Manutenção',
  outros: 'Outros',
};

export function Despesas() {
  const [despesas, setDespesas] = useState<Despesa[]>(initialDespesas);
  const [searchTerm, setSearchTerm] = useState('');
  const [periodoFiltro, setPeriodoFiltro] = useState('mes');
  const [showModal, setShowModal] = useState(false);
  const [editingDespesa, setEditingDespesa] = useState<Despesa | null>(null);
  const [limiteAlerta, setLimiteAlerta] = useState(15000);
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: '',
    categoria: 'outros' as Despesa['categoria'],
  });

  const despesasFiltradas = despesas.filter((d) =>
    d.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categorias[d.categoria].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

  const despesasPorCategoria = Object.entries(
    despesas.reduce((acc, d) => {
      acc[d.categoria] = (acc[d.categoria] || 0) + d.valor;
      return acc;
    }, {} as Record<string, number>)
  ).map(([categoria, valor]) => ({
    categoria: categorias[categoria as Despesa['categoria']],
    valor,
  }));

  const openModal = (despesa?: Despesa) => {
    if (despesa) {
      setEditingDespesa(despesa);
      setFormData({
        descricao: despesa.descricao,
        valor: despesa.valor.toString(),
        data: despesa.data,
        categoria: despesa.categoria,
      });
    } else {
      setEditingDespesa(null);
      setFormData({
        descricao: '',
        valor: '',
        data: new Date().toISOString().split('T')[0],
        categoria: 'outros',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDespesa(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDespesa) {
      setDespesas(
        despesas.map((d) =>
          d.id === editingDespesa.id
            ? {
                ...d,
                descricao: formData.descricao,
                valor: parseFloat(formData.valor),
                data: formData.data,
                categoria: formData.categoria,
              }
            : d
        )
      );
    } else {
      const newDespesa: Despesa = {
        id: Math.max(...despesas.map((d) => d.id)) + 1,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        data: formData.data,
        categoria: formData.categoria,
      };
      setDespesas([...despesas, newDespesa]);
    }

    closeModal();
  };

  const deletarDespesa = (id: number) => {
    if (confirm('Deseja realmente excluir esta despesa?')) {
      setDespesas(despesas.filter((d) => d.id !== id));
    }
  };

  const exportarRelatorio = () => {
    alert('Relatório de despesas exportado! (Funcionalidade de demonstração)');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Gerenciamento de Despesas</h1>
        <p className="text-gray-600">Controle todas as despesas do negócio</p>
      </div>

      {totalDespesas > limiteAlerta && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-red-900 mb-1">Alerta de Despesas</h3>
              <p className="text-red-700">
                As despesas ultrapassaram o limite definido de R$ {limiteAlerta.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Total de Despesas</p>
          <p className="text-red-600">R$ {totalDespesas.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Número de Despesas</p>
          <p className="text-gray-900">{despesas.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Média por Despesa</p>
          <p className="text-gray-900">
            R$ {despesas.length > 0 ? (totalDespesas / despesas.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
        <h3 className="text-gray-900 mb-6">Despesas por Categoria</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={despesasPorCategoria}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="categoria" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="valor" fill="#ef4444" name="Valor" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar despesas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={exportarRelatorio}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Exportar
        </button>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Despesa
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Data</th>
                <th className="px-6 py-3 text-left text-gray-600">Descrição</th>
                <th className="px-6 py-3 text-left text-gray-600">Categoria</th>
                <th className="px-6 py-3 text-left text-gray-600">Valor</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {despesasFiltradas.map((despesa) => (
                <tr key={despesa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(despesa.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{despesa.descricao}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {categorias[despesa.categoria]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-red-600">R$ {despesa.valor.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(despesa)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletarDespesa(despesa.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-6">
              {editingDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Descrição *</label>
                <input
                  type="text"
                  required
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Valor (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Data *</label>
                  <input
                    type="date"
                    required
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Categoria *</label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value as Despesa['categoria'] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(categorias).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingDespesa ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
