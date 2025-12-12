import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Shield, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface Usuario {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  nomeUsuario: string;
  role: 'admin' | 'funcionario' | 'caixa';
  status: 'ativo' | 'inativo';
  dataContratacao?: string;
  cargo?: string;
  dataCriacao: string;
}

const initialUsuarios: Usuario[] = [
  {
    id: 1,
    nome: 'Admin Sistema',
    telefone: '(11) 91234-0000',
    email: 'admin@petshop.com',
    nomeUsuario: 'admin',
    role: 'admin',
    status: 'ativo',
    dataCriacao: '2024-01-15',
  },
  {
    id: 2,
    nome: 'Maria Silva',
    telefone: '(11) 98765-1111',
    email: 'maria@petshop.com',
    nomeUsuario: 'maria',
    role: 'funcionario',
    status: 'ativo',
    dataContratacao: '2024-03-20',
    cargo: 'Atendente de Loja',
    dataCriacao: '2024-03-20',
  },
  {
    id: 3,
    nome: 'João Santos',
    telefone: '(11) 97654-2222',
    email: 'joao@petshop.com',
    nomeUsuario: 'joao',
    role: 'caixa',
    status: 'ativo',
    dataContratacao: '2024-05-10',
    cargo: 'Atendente de Caixa',
    dataCriacao: '2024-05-10',
  },
];

export function Usuarios() {
  const { user: currentUser } = useAuthStore();
  const [usuarios, setUsuarios] = useState<Usuario[]>(initialUsuarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    nomeUsuario: '',
    role: 'atendente' as Usuario['role'],
    status: 'ativo' as Usuario['status'],
    dataContratacao: '',
    cargo: '',
  });

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (usuario?: Usuario) => {
    if (usuario) {
      setEditingUsuario(usuario);
      setFormData({
        nome: usuario.nome,
        telefone: usuario.telefone,
        email: usuario.email,
        nomeUsuario: usuario.nomeUsuario,
        role: usuario.role,
        status: usuario.status,
        dataContratacao: usuario.dataContratacao || '',
        cargo: usuario.cargo || '',
      });
    } else {
      setEditingUsuario(null);
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        nomeUsuario: '',
        role: 'atendente',
        status: 'ativo',
        dataContratacao: '',
        cargo: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUsuario(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUsuario) {
      setUsuarios(
        usuarios.map((u) =>
          u.id === editingUsuario.id
            ? {
                ...u,
                nome: formData.nome,
                telefone: formData.telefone,
                email: formData.email,
                nomeUsuario: formData.nomeUsuario,
                role: formData.role,
                status: formData.status,
                dataContratacao: formData.dataContratacao,
                cargo: formData.cargo,
              }
            : u
        )
      );
    } else {
      const newUsuario: Usuario = {
        id: Math.max(...usuarios.map((u) => u.id)) + 1,
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        nomeUsuario: formData.nomeUsuario,
        role: formData.role,
        status: formData.status,
        dataContratacao: formData.dataContratacao,
        cargo: formData.cargo,
        dataCriacao: new Date().toISOString().split('T')[0],
      };
      setUsuarios([...usuarios, newUsuario]);
    }

    closeModal();
  };

  const deletarUsuario = (id: number) => {
    if (confirm('Deseja realmente excluir este usuário?')) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  const getRoleBadge = (role: Usuario['role']) => {
    const styles = {
      admin: 'bg-red-100 text-red-700',
      atendente: 'bg-blue-100 text-blue-700',
    };
    const labels = {
      admin: 'Administrador',
      atendente: 'Atendente',
    };
    return (
      <span className={`px-2 py-1 rounded ${styles[role]}`}>
        {labels[role]}
      </span>
    );
  };

  const getStatusBadge = (status: Usuario['status']) => {
    return status === 'ativo' ? (
      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Ativo</span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">Inativo</span>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Gerenciamento de Usuários</h1>
        <p className="text-gray-600">Controle de acesso e permissões do sistema</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Total de Usuários</p>
              <p className="text-gray-900">{usuarios.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Usuários Ativos</p>
              <p className="text-gray-900">
                {usuarios.filter((u) => u.status === 'ativo').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600">Administradores</p>
              <p className="text-gray-900">
                {usuarios.filter((u) => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Ações */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar usuários..."
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
          Adicionar Usuário
        </button>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Nome</th>
                <th className="px-6 py-3 text-left text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-gray-600">Função</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Data de Criação</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{usuario.nome}</td>
                  <td className="px-6 py-4 text-gray-600">{usuario.email}</td>
                  <td className="px-6 py-4">{getRoleBadge(usuario.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(usuario.status)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(usuario.dataCriacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(usuario)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletarUsuario(usuario.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={usuario.id === 1}
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

      {/* Modal de Adicionar/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-6">
              {editingUsuario ? 'Editar Usuário' : 'Adicionar Usuário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Telefone</label>
                <input
                  type="text"
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
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nome de Usuário</label>
                <input
                  type="text"
                  required
                  value={formData.nomeUsuario}
                  onChange={(e) => setFormData({ ...formData, nomeUsuario: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Função</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as Usuario['role'] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="atendente">Atendente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as Usuario['status'] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Data de Contratação</label>
                <input
                  type="date"
                  value={formData.dataContratacao}
                  onChange={(e) => setFormData({ ...formData, dataContratacao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cargo</label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {editingUsuario ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}