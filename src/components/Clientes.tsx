import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Phone, MapPin } from 'lucide-react';

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
  };
  dataNascimento: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  tipoCliente: 'pessoa_fisica' | 'pessoa_juridica';
  observacoes: string;
  dataCadastro: string;
}

const initialClientes: Cliente[] = [
  {
    id: 1,
    nome: 'Maria Silva',
    telefone: '(11) 98765-4321',
    email: 'maria@email.com',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 45',
      bairro: 'Centro',
      cidade: 'São Paulo',
    },
    dataNascimento: '1985-05-15',
    tipoCliente: 'pessoa_fisica',
    observacoes: 'Cliente preferencial',
    dataCadastro: '2024-01-15',
  },
  {
    id: 2,
    nome: 'João Santos',
    telefone: '(11) 91234-5678',
    email: 'joao@email.com',
    endereco: {
      rua: 'Av. Principal',
      numero: '456',
      complemento: '',
      bairro: 'Jardins',
      cidade: 'São Paulo',
    },
    dataNascimento: '1990-08-20',
    tipoCliente: 'pessoa_fisica',
    observacoes: '',
    dataCadastro: '2024-02-20',
  },
  {
    id: 3,
    nome: 'Pet Shop do Bairro Ltda',
    telefone: '(11) 3456-7890',
    email: 'contato@petshopbairro.com',
    endereco: {
      rua: 'Rua Comercial',
      numero: '789',
      complemento: 'Loja 2',
      bairro: 'Vila Nova',
      cidade: 'São Paulo',
    },
    dataNascimento: '2020-03-10',
    razaoSocial: 'Pet Shop do Bairro Ltda',
    nomeFantasia: 'Pet Shop do Bairro',
    tipoCliente: 'pessoa_juridica',
    observacoes: 'Cliente corporativo - desconto especial',
    dataCadastro: '2024-03-10',
  },
];

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState<Omit<Cliente, 'id' | 'dataCadastro'>>({
    nome: '',
    telefone: '',
    email: '',
    endereco: {
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
    },
    dataNascimento: '',
    razaoSocial: '',
    nomeFantasia: '',
    tipoCliente: 'pessoa_fisica',
    observacoes: '',
  });

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (cliente?: Cliente) => {
    if (cliente) {
      setEditingCliente(cliente);
      setFormData({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        endereco: cliente.endereco,
        dataNascimento: cliente.dataNascimento,
        razaoSocial: cliente.razaoSocial || '',
        nomeFantasia: cliente.nomeFantasia || '',
        tipoCliente: cliente.tipoCliente,
        observacoes: cliente.observacoes,
      });
    } else {
      setEditingCliente(null);
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        endereco: {
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
        },
        dataNascimento: '',
        razaoSocial: '',
        nomeFantasia: '',
        tipoCliente: 'pessoa_fisica',
        observacoes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCliente(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCliente) {
      setClientes(
        clientes.map((c) =>
          c.id === editingCliente.id
            ? {
                ...c,
                ...formData,
              }
            : c
        )
      );
    } else {
      const newCliente: Cliente = {
        id: Math.max(...clientes.map((c) => c.id)) + 1,
        ...formData,
        dataCadastro: new Date().toISOString().split('T')[0],
      };
      setClientes([...clientes, newCliente]);
    }

    closeModal();
  };

  const deletarCliente = (id: number) => {
    if (confirm('Deseja realmente excluir este cliente?')) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Gerenciamento de Clientes</h1>
        <p className="text-gray-600">Cadastre e gerencie seus clientes</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Total de Clientes</p>
          <p className="text-gray-900">{clientes.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Pessoas Físicas</p>
          <p className="text-gray-900">
            {clientes.filter((c) => c.tipoCliente === 'pessoa_fisica').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Pessoas Jurídicas</p>
          <p className="text-gray-900">
            {clientes.filter((c) => c.tipoCliente === 'pessoa_juridica').length}
          </p>
        </div>
      </div>

      {/* Barra de Ações */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar clientes por nome, telefone ou email..."
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
          Adicionar Cliente
        </button>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clientesFiltrados.map((cliente) => (
          <div key={cliente.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{cliente.nome}</h3>
                <span className={`px-2 py-1 rounded text-white ${
                  cliente.tipoCliente === 'pessoa_fisica' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {cliente.tipoCliente === 'pessoa_fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(cliente)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deletarCliente(cliente.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{cliente.telefone}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  {cliente.endereco.rua}, {cliente.endereco.numero}
                  {cliente.endereco.complemento && ` - ${cliente.endereco.complemento}`}
                  <br />
                  {cliente.endereco.bairro}, {cliente.endereco.cidade}
                </span>
              </div>
              {cliente.observacoes && (
                <p className="text-gray-600 italic">"{cliente.observacoes}"</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Adicionar/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
            <h2 className="text-gray-900 mb-6">
              {editingCliente ? 'Editar Cliente' : 'Adicionar Cliente'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Tipo de Cliente</label>
                <select
                  value={formData.tipoCliente}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tipoCliente: e.target.value as 'pessoa_fisica' | 'pessoa_juridica',
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pessoa_fisica">Pessoa Física</option>
                  <option value="pessoa_juridica">Pessoa Jurídica</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nome do Cliente *</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Data de Nascimento</label>
                  <input
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {formData.tipoCliente === 'pessoa_juridica' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Razão Social</label>
                    <input
                      type="text"
                      value={formData.razaoSocial}
                      onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Nome Fantasia</label>
                    <input
                      type="text"
                      value={formData.nomeFantasia}
                      onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="border-t pt-4">
                <h3 className="text-gray-900 mb-4">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Rua/Logradouro *</label>
                    <input
                      type="text"
                      required
                      value={formData.endereco.rua}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endereco: { ...formData.endereco, rua: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Número *</label>
                    <input
                      type="text"
                      required
                      value={formData.endereco.numero}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endereco: { ...formData.endereco, numero: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      value={formData.endereco.complemento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endereco: { ...formData.endereco, complemento: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Bairro *</label>
                    <input
                      type="text"
                      required
                      value={formData.endereco.bairro}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endereco: { ...formData.endereco, bairro: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Cidade *</label>
                    <input
                      type="text"
                      required
                      value={formData.endereco.cidade}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endereco: { ...formData.endereco, cidade: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Observações</label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Informações adicionais sobre o cliente..."
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
                  {editingCliente ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
