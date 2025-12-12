import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, PawPrint } from 'lucide-react';

interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  sexo: 'macho' | 'femea';
  clienteId: number;
  clienteNome: string;
  observacoes: string;
  dataCadastro: string;
}

const initialPets: Pet[] = [
  {
    id: 1,
    nome: 'Rex',
    especie: 'Cachorro',
    raca: 'Labrador',
    idade: 3,
    sexo: 'macho',
    clienteId: 1,
    clienteNome: 'Maria Silva',
    observacoes: 'Muito brincalhão',
    dataCadastro: '2024-01-15',
  },
  {
    id: 2,
    nome: 'Luna',
    especie: 'Gato',
    raca: 'Persa',
    idade: 2,
    sexo: 'femea',
    clienteId: 1,
    clienteNome: 'Maria Silva',
    observacoes: 'Não gosta de banho',
    dataCadastro: '2024-02-20',
  },
  {
    id: 3,
    nome: 'Thor',
    especie: 'Cachorro',
    raca: 'Golden Retriever',
    idade: 5,
    sexo: 'macho',
    clienteId: 2,
    clienteNome: 'João Santos',
    observacoes: 'Adora brinquedos',
    dataCadastro: '2024-02-25',
  },
];

export function Pets() {
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    raca: '',
    idade: '',
    sexo: 'macho' as 'macho' | 'femea',
    clienteId: '',
    clienteNome: '',
    observacoes: '',
  });

  const petsFiltrados = pets.filter(
    (pet) =>
      pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.especie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (pet?: Pet) => {
    if (pet) {
      setEditingPet(pet);
      setFormData({
        nome: pet.nome,
        especie: pet.especie,
        raca: pet.raca,
        idade: pet.idade.toString(),
        sexo: pet.sexo,
        clienteId: pet.clienteId.toString(),
        clienteNome: pet.clienteNome,
        observacoes: pet.observacoes,
      });
    } else {
      setEditingPet(null);
      setFormData({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        sexo: 'macho',
        clienteId: '1',
        clienteNome: 'Maria Silva',
        observacoes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPet(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPet) {
      setPets(
        pets.map((p) =>
          p.id === editingPet.id
            ? {
                ...p,
                nome: formData.nome,
                especie: formData.especie,
                raca: formData.raca,
                idade: parseInt(formData.idade),
                sexo: formData.sexo,
                clienteId: parseInt(formData.clienteId),
                clienteNome: formData.clienteNome,
                observacoes: formData.observacoes,
              }
            : p
        )
      );
    } else {
      const newPet: Pet = {
        id: Math.max(...pets.map((p) => p.id)) + 1,
        nome: formData.nome,
        especie: formData.especie,
        raca: formData.raca,
        idade: parseInt(formData.idade),
        sexo: formData.sexo,
        clienteId: parseInt(formData.clienteId),
        clienteNome: formData.clienteNome,
        observacoes: formData.observacoes,
        dataCadastro: new Date().toISOString().split('T')[0],
      };
      setPets([...pets, newPet]);
    }

    closeModal();
  };

  const deletarPet = (id: number) => {
    if (confirm('Deseja realmente excluir este pet?')) {
      setPets(pets.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Gerenciamento de Pets</h1>
        <p className="text-gray-600">Cadastre e gerencie os animais de estimação</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Total de Pets</p>
          <p className="text-gray-900">{pets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Cachorros</p>
          <p className="text-gray-900">
            {pets.filter((p) => p.especie.toLowerCase() === 'cachorro').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Gatos</p>
          <p className="text-gray-900">
            {pets.filter((p) => p.especie.toLowerCase() === 'gato').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Outros</p>
          <p className="text-gray-900">
            {pets.filter((p) => 
              p.especie.toLowerCase() !== 'cachorro' && 
              p.especie.toLowerCase() !== 'gato'
            ).length}
          </p>
        </div>
      </div>

      {/* Barra de Ações */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar pets por nome, cliente ou espécie..."
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
          Adicionar Pet
        </button>
      </div>

      {/* Lista de Pets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petsFiltrados.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900">{pet.nome}</h3>
                  <p className="text-gray-500">{pet.especie}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(pet)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deletarPet(pet.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-gray-600">
              <p><strong>Raça:</strong> {pet.raca}</p>
              <p><strong>Idade:</strong> {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}</p>
              <p><strong>Sexo:</strong> {pet.sexo === 'macho' ? 'Macho' : 'Fêmea'}</p>
              <p><strong>Tutor:</strong> {pet.clienteNome}</p>
              {pet.observacoes && (
                <p className="italic">"{pet.observacoes}"</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Adicionar/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-6">
              {editingPet ? 'Editar Pet' : 'Adicionar Pet'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nome do Pet *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Espécie *</label>
                  <select
                    required
                    value={formData.especie}
                    onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Coelho">Coelho</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Pássaro">Pássaro</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Raça *</label>
                  <input
                    type="text"
                    required
                    value={formData.raca}
                    onChange={(e) => setFormData({ ...formData, raca: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Idade (anos) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Sexo *</label>
                  <select
                    value={formData.sexo}
                    onChange={(e) =>
                      setFormData({ ...formData, sexo: e.target.value as 'macho' | 'femea' })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Tutor/Cliente *</label>
                <input
                  type="text"
                  required
                  value={formData.clienteNome}
                  onChange={(e) => setFormData({ ...formData, clienteNome: e.target.value })}
                  placeholder="Nome do cliente"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Observações</label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Informações adicionais sobre o pet..."
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
                  {editingPet ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
