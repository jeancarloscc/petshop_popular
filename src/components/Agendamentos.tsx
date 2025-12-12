import { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, Clock, PawPrint } from 'lucide-react';

interface Agendamento {
  id: number;
  data: string;
  horario: string;
  servico: string;
  petNome: string;
  clienteNome: string;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  observacoes: string;
}

const initialAgendamentos: Agendamento[] = [
  {
    id: 1,
    data: '2025-11-22',
    horario: '10:00',
    servico: 'Banho e Tosa',
    petNome: 'Rex',
    clienteNome: 'Maria Silva',
    status: 'confirmado',
    observacoes: 'Tosa higiênica',
  },
  {
    id: 2,
    data: '2025-11-22',
    horario: '14:00',
    servico: 'Consulta Veterinária',
    petNome: 'Luna',
    clienteNome: 'Maria Silva',
    status: 'pendente',
    observacoes: '',
  },
  {
    id: 3,
    data: '2025-11-23',
    horario: '09:00',
    servico: 'Banho',
    petNome: 'Thor',
    clienteNome: 'João Santos',
    status: 'confirmado',
    observacoes: '',
  },
];

export function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(initialAgendamentos);
  const [showModal, setShowModal] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
  const [formData, setFormData] = useState({
    data: '',
    horario: '',
    servico: '',
    petNome: '',
    clienteNome: '',
    status: 'pendente' as Agendamento['status'],
    observacoes: '',
  });

  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    const dataA = new Date(`${a.data}T${a.horario}`);
    const dataB = new Date(`${b.data}T${b.horario}`);
    return dataA.getTime() - dataB.getTime();
  });

  const openModal = (agendamento?: Agendamento) => {
    if (agendamento) {
      setEditingAgendamento(agendamento);
      setFormData({
        data: agendamento.data,
        horario: agendamento.horario,
        servico: agendamento.servico,
        petNome: agendamento.petNome,
        clienteNome: agendamento.clienteNome,
        status: agendamento.status,
        observacoes: agendamento.observacoes,
      });
    } else {
      setEditingAgendamento(null);
      setFormData({
        data: '',
        horario: '',
        servico: '',
        petNome: '',
        clienteNome: '',
        status: 'pendente',
        observacoes: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAgendamento(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAgendamento) {
      setAgendamentos(
        agendamentos.map((a) =>
          a.id === editingAgendamento.id ? { ...a, ...formData } : a
        )
      );
    } else {
      const newAgendamento: Agendamento = {
        id: Math.max(...agendamentos.map((a) => a.id)) + 1,
        ...formData,
      };
      setAgendamentos([...agendamentos, newAgendamento]);
    }

    closeModal();
  };

  const deletarAgendamento = (id: number) => {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      setAgendamentos(agendamentos.filter((a) => a.id !== id));
    }
  };

  const getStatusBadge = (status: Agendamento['status']) => {
    const styles = {
      pendente: 'bg-yellow-100 text-yellow-700',
      confirmado: 'bg-blue-100 text-blue-700',
      concluido: 'bg-green-100 text-green-700',
      cancelado: 'bg-red-100 text-red-700',
    };
    const labels = {
      pendente: 'Pendente',
      confirmado: 'Confirmado',
      concluido: 'Concluído',
      cancelado: 'Cancelado',
    };
    return (
      <span className={`px-2 py-1 rounded ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Agendamentos</h1>
        <p className="text-gray-600">Gerencie os serviços agendados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Total</p>
          <p className="text-gray-900">{agendamentos.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Pendentes</p>
          <p className="text-yellow-600">
            {agendamentos.filter((a) => a.status === 'pendente').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Confirmados</p>
          <p className="text-blue-600">
            {agendamentos.filter((a) => a.status === 'confirmado').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">Concluídos</p>
          <p className="text-green-600">
            {agendamentos.filter((a) => a.status === 'concluido').length}
          </p>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <button
          onClick={() => openModal()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Data/Hora</th>
                <th className="px-6 py-3 text-left text-gray-600">Serviço</th>
                <th className="px-6 py-3 text-left text-gray-600">Pet</th>
                <th className="px-6 py-3 text-left text-gray-600">Cliente</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agendamentosOrdenados.map((agendamento) => (
                <tr key={agendamento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(agendamento.data).toLocaleDateString('pt-BR')} às {agendamento.horario}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{agendamento.servico}</td>
                  <td className="px-6 py-4 text-gray-600">{agendamento.petNome}</td>
                  <td className="px-6 py-4 text-gray-600">{agendamento.clienteNome}</td>
                  <td className="px-6 py-4">{getStatusBadge(agendamento.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(agendamento)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletarAgendamento(agendamento.id)}
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
              {editingAgendamento ? 'Editar Agendamento' : 'Novo Agendamento'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-gray-700 mb-2">Horário *</label>
                  <input
                    type="time"
                    required
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Serviço *</label>
                <select
                  required
                  value={formData.servico}
                  onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="Banho">Banho</option>
                  <option value="Tosa">Tosa</option>
                  <option value="Banho e Tosa">Banho e Tosa</option>
                  <option value="Consulta Veterinária">Consulta Veterinária</option>
                  <option value="Vacinação">Vacinação</option>
                  <option value="Corte de Unhas">Corte de Unhas</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pet *</label>
                <input
                  type="text"
                  required
                  value={formData.petNome}
                  onChange={(e) => setFormData({ ...formData, petNome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cliente *</label>
                <input
                  type="text"
                  required
                  value={formData.clienteNome}
                  onChange={(e) => setFormData({ ...formData, clienteNome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as Agendamento['status'] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Observações</label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
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
                  {editingAgendamento ? 'Salvar' : 'Agendar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
