import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Truck } from 'lucide-react';

interface Fornecedor {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  produtosFornecidos: string;
  dataCadastro: string;
}

const initialFornecedores: Fornecedor[] = [
  {
    id: 1,
    nome: 'Distribuidora Pet Plus',
    telefone: '(11) 3456-7890',
    email: 'contato@petplus.com',
    produtosFornecidos: 'Rações Premium, Petiscos',
    dataCadastro: '2024-01-10',
  },
  {
    id: 2,
    nome: 'Atacado Animal',
    telefone: '(11) 2345-6789',
    email: 'vendas@atacadoanimal.com',
    produtosFornecidos: 'Brinquedos, Acessórios',
    dataCadastro: '2024-02-15',
  },
];

export function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(initialFornecedores);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    produtosFornecidos: '',
  });

  const fornecedoresFiltrados = fornecedores.filter((f) =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.produtosFornecidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (fornecedor?: Fornecedor) => {
    if (fornecedor) {
      setEditingFornecedor(fornecedor);
      setFormData({
        nome: fornecedor.nome,
        telefone: fornecedor.telefone,
        email: fornecedor.email,
        produtosFornecidos: fornecedor.produtosFornecidos,
      });
    } else {
      setEditingFornecedor(null);
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        produtosFornecidos: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFornecedor(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingFornecedor) {
      setFornecedores(
        fornecedores.map((f) =>
          f.id === editingFornecedor.id ? { ...f, ...formData } : f
        )
      );
    } else {
      const newFornecedor: Fornecedor = {
        id: Math.max(...fornecedores.map((f) => f.id)) + 1,
        ...formData,
        dataCadastro: new Date().toISOString().split('T')[0],
      };
      setFornecedores([...fornecedores, newFornecedor]);
    }

    closeModal();
  };

  const deletarFornecedor = (id: number) => {
    if (confirm('Deseja realmente excluir este fornecedor?')) {
      setFornecedores(fornecedores.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Gerenciamento de Fornecedores</h1>
        <p className="text-gray-600">Cadastre e gerencie seus fornecedores</p>
      </div>

      <div className="mb-6 bg-white p-6 rounded-xl border border-gray-200">
        <p className="text-gray-600">Total de Fornecedores</p>
        <p className="text-gray-900">{fornecedores.length}</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Fornecedor
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Nome</th>
                <th className="px-6 py-3 text-left text-gray-600">Telefone</th>
                <th className="px-6 py-3 text-left text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-gray-600">Produtos Fornecidos</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fornecedoresFiltrados.map((fornecedor) => (
                <tr key={fornecedor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{fornecedor.nome}</td>
                  <td className="px-6 py-4 text-gray-600">{fornecedor.telefone}</td>
                  <td className="px-6 py-4 text-gray-600">{fornecedor.email}</td>
                  <td className="px-6 py-4 text-gray-600">{fornecedor.produtosFornecidos}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(fornecedor)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletarFornecedor(fornecedor.id)}
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
              {editingFornecedor ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Telefone *</label>
                <input
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Produtos Fornecidos *</label>
                <textarea
                  required
                  value={formData.produtosFornecidos}
                  onChange={(e) => setFormData({ ...formData, produtosFornecidos: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Rações, Petiscos, Brinquedos..."
                />
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
                  {editingFornecedor ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
