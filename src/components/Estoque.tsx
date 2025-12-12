import { useState, useRef } from 'react';
import { Search, Plus, Edit2, Trash2, AlertTriangle, Barcode } from 'lucide-react';
import type { User } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface Product {
  id: number;
  nome: string;
  marca: string;
  categoria: string;
  preco: number;
  custo: number; // Novo: custo do produto
  estoque: number;
  codigoProduto: string;
  codigoBarras: string;
  estoqueMinimo: number;
}

const initialProducts: Product[] = [
  { id: 1, nome: 'Ração Premium Cães 15kg', marca: 'Royal Canin', preco: 189.90, custo: 120.00, estoque: 45, categoria: 'Ração', codigoProduto: 'RC-001', codigoBarras: '7891234567890', estoqueMinimo: 20 },
  { id: 2, nome: 'Ração Premium Gatos 10kg', marca: 'Royal Canin', preco: 159.90, custo: 100.00, estoque: 32, categoria: 'Ração', codigoProduto: 'RC-002', codigoBarras: '7891234567891', estoqueMinimo: 25 },
  { id: 3, nome: 'Coleira Anti-pulgas', marca: 'Seresto', preco: 45.00, custo: 28.00, estoque: 67, categoria: 'Acessórios', codigoProduto: 'SE-001', codigoBarras: '7891234567892', estoqueMinimo: 30 },
  { id: 4, nome: 'Brinquedo Mordedor', marca: 'Kong', preco: 29.90, custo: 15.00, estoque: 89, categoria: 'Brinquedos', codigoProduto: 'KG-001', codigoBarras: '7891234567893', estoqueMinimo: 40 },
  { id: 5, nome: 'Shampoo Antipulgas 500ml', marca: 'Pet Clean', preco: 34.90, custo: 20.00, estoque: 54, categoria: 'Higiene', codigoProduto: 'PC-001', codigoBarras: '7891234567894', estoqueMinimo: 30 },
  { id: 6, nome: 'Cama Pet Grande', marca: 'Furacão Pet', preco: 129.00, custo: 80.00, estoque: 23, categoria: 'Acessórios', codigoProduto: 'FP-001', codigoBarras: '7891234567895', estoqueMinimo: 15 },
  { id: 7, nome: 'Comedouro Automático', marca: 'PetSafe', preco: 199.00, custo: 130.00, estoque: 8, categoria: 'Acessórios', codigoProduto: 'PS-001', codigoBarras: '7891234567896', estoqueMinimo: 10 },
  { id: 8, nome: 'Vermífugo 4 comprimidos', marca: 'Drontal', preco: 42.50, custo: 25.00, estoque: 78, categoria: 'Medicamentos', codigoProduto: 'DR-001', codigoBarras: '7891234567897', estoqueMinimo: 50 },
];

export function Estoque() {
  const { user: currentUser } = useAuthStore();
  const [produtos, setProdutos] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    categoria: '',
    preco: '',
    custo: '',
    estoque: '',
    codigoProduto: '',
    codigoBarras: '',
    estoqueMinimo: '',
  });

  const isAdmin = currentUser?.role === 'admin';
  const isCaixa = currentUser?.role === 'caixa';
  const canEdit = isAdmin; // Apenas admin pode editar
  const canAdd = isAdmin || currentUser?.role === 'funcionario'; // Admin e funcionário podem adicionar

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const produtosBaixoEstoque = produtos.filter(
    (produto) => produto.estoque <= produto.estoqueMinimo
  );

  const openModal = (produto?: Product) => {
    if (produto) {
      setEditingProduct(produto);
      setFormData({
        nome: produto.nome,
        marca: produto.marca,
        categoria: produto.categoria,
        preco: produto.preco.toString(),
        custo: produto.custo.toString(), // Novo: custo do produto
        estoque: produto.estoque.toString(),
        codigoProduto: produto.codigoProduto,
        codigoBarras: produto.codigoBarras,
        estoqueMinimo: produto.estoqueMinimo.toString(),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        nome: '',
        marca: '',
        categoria: '',
        preco: '',
        custo: '',
        estoque: '',
        codigoProduto: '',
        codigoBarras: '',
        estoqueMinimo: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProdutos(
        produtos.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                nome: formData.nome,
                marca: formData.marca,
                categoria: formData.categoria,
                preco: parseFloat(formData.preco),
                custo: parseFloat(formData.custo), // Novo: custo do produto
                estoque: parseInt(formData.estoque),
                codigoProduto: formData.codigoProduto,
                codigoBarras: formData.codigoBarras,
                estoqueMinimo: parseInt(formData.estoqueMinimo),
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Math.max(...produtos.map((p) => p.id)) + 1,
        nome: formData.nome,
        marca: formData.marca,
        categoria: formData.categoria,
        preco: parseFloat(formData.preco),
        custo: parseFloat(formData.custo), // Novo: custo do produto
        estoque: parseInt(formData.estoque),
        codigoProduto: formData.codigoProduto,
        codigoBarras: formData.codigoBarras,
        estoqueMinimo: parseInt(formData.estoqueMinimo),
      };
      setProdutos([...produtos, newProduct]);
    }
    
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (!isAdmin) {
      alert('Apenas administradores podem excluir produtos.');
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  const openModalForEdit = (produto: Product) => {
    if (!canEdit) {
      alert('Apenas administradores podem editar produtos.');
      return;
    }
    openModal(produto);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Gerenciamento de Estoque</h1>
        <p className="text-gray-600">Controle seus produtos e inventário</p>
      </div>

      {/* Alerta de Baixo Estoque */}
      {produtosBaixoEstoque.length > 0 && (
        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="text-orange-900 mb-1">Produtos com Estoque Baixo</h3>
              <p className="text-orange-700">
                {produtosBaixoEstoque.length} produto(s) precisam de reposição:
              </p>
              <ul className="mt-2 space-y-1">
                {produtosBaixoEstoque.map((produto) => (
                  <li key={produto.id} className="text-orange-700">
                    • {produto.nome} - Estoque: {produto.estoque} (Mínimo: {produto.estoqueMinimo})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Ações */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
          />
        </div>
        {canAdd && (
          <button
            onClick={() => openModal()}
            className="px-6 py-2 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        )}
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Produto</th>
                <th className="px-6 py-3 text-left text-gray-600">Categoria</th>
                <th className="px-6 py-3 text-left text-gray-600">Preço</th>
                <th className="px-6 py-3 text-left text-gray-600">Estoque</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                {!isCaixa && <th className="px-6 py-3 text-left text-gray-600">Ações</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {produtosFiltrados.map((produto) => {
                const baixoEstoque = produto.estoque <= produto.estoqueMinimo;
                return (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{produto.nome}</td>
                    <td className="px-6 py-4 text-gray-600">{produto.categoria}</td>
                    <td className="px-6 py-4 text-gray-900">R$ {produto.preco.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-900">{produto.estoque}</td>
                    <td className="px-6 py-4">
                      {baixoEstoque ? (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                          Baixo Estoque
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                          Normal
                        </span>
                      )}
                    </td>
                    {!isCaixa && (
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModalForEdit(produto)}
                            disabled={!canEdit}
                            className={`p-2 rounded-lg transition-colors ${
                              canEdit
                                ? 'text-[#fdba74] hover:bg-[#fff5eb]'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(produto.id)}
                            disabled={!canEdit}
                            className={`p-2 rounded-lg transition-colors ${
                              canEdit
                                ? 'text-[#ff3131] hover:bg-red-50'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Adicionar/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-6">
              {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Leitor de Código de Barras - Destaque */}
              {!editingProduct && (
                <div className="p-4 bg-[#fff5eb] border border-[#fdba74] rounded-lg">
                  <label className="block text-gray-900 mb-2 flex items-center gap-2">
                    <Barcode className="w-5 h-5 text-[#fdba74]" />
                    <span>Código de Barras</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Escaneie ou digite o código de barras"
                    value={formData.codigoBarras}
                    onChange={(e) => setFormData({ ...formData, codigoBarras: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74] font-mono"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Use o leitor de código de barras ou digite manualmente
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 mb-2">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Marca</label>
                <input
                  type="text"
                  required
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Categoria</label>
                <input
                  type="text"
                  required
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Custo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.custo}
                    onChange={(e) => setFormData({ ...formData, custo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Estoque</label>
                  <input
                    type="number"
                    required
                    value={formData.estoque}
                    onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Estoque Mínimo</label>
                  <input
                    type="number"
                    required
                    value={formData.estoqueMinimo}
                    onChange={(e) => setFormData({ ...formData, estoqueMinimo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Código do Produto</label>
                <input
                  type="text"
                  required
                  value={formData.codigoProduto}
                  onChange={(e) => setFormData({ ...formData, codigoProduto: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {editingProduct && (
                <div>
                  <label className="block text-gray-700 mb-2">Código de Barras</label>
                  <input
                    type="text"
                    required
                    value={formData.codigoBarras}
                    onChange={(e) => setFormData({ ...formData, codigoBarras: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              )}
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
                  {editingProduct ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}