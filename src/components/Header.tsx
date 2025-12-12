import { Bell, LogOut, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { User } from '@/types';

interface Notification {
  id: number;
  tipo: 'estoque' | 'agendamento' | 'venda' | 'sistema';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

// Mock de notificações - em produção viriam do backend
const notificacoesMock: Notification[] = [
  {
    id: 1,
    tipo: 'estoque',
    titulo: 'Estoque Baixo',
    mensagem: 'Ração Premium Cães 15kg está com estoque baixo (5 unidades)',
    data: '2025-11-20T10:30:00',
    lida: false,
  },
  {
    id: 2,
    tipo: 'agendamento',
    titulo: 'Agendamento Hoje',
    mensagem: 'Banho e Tosa - Rex às 14:00',
    data: '2025-11-20T09:00:00',
    lida: false,
  },
  {
    id: 3,
    tipo: 'estoque',
    titulo: 'Estoque Crítico',
    mensagem: 'Shampoo Antipulgas está com apenas 2 unidades',
    data: '2025-11-20T08:15:00',
    lida: false,
  },
  {
    id: 4,
    tipo: 'venda',
    titulo: 'Meta Atingida',
    mensagem: 'Parabéns! Meta de vendas do dia foi atingida!',
    data: '2025-11-19T18:00:00',
    lida: true,
  },
];

export function Header({ currentUser, onLogout }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notification[]>(notificacoesMock);

  const notificacoesNaoLidas = notificacoes.filter((n) => !n.lida).length;

  const marcarComoLida = (id: number) => {
    setNotificacoes(
      notificacoes.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map((n) => ({ ...n, lida: true })));
  };

  const getIconColor = (tipo: string) => {
    switch (tipo) {
      case 'estoque':
        return 'bg-orange-100 text-orange-600';
      case 'agendamento':
        return 'bg-blue-100 text-blue-600';
      case 'venda':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    const agora = new Date();
    const diff = agora.getTime() - date.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor(diff / (1000 * 60));

    if (minutos < 60) return `${minutos}m atrás`;
    if (horas < 24) return `${horas}h atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Espaço para o menu hambúrguer em mobile */}
        <div className="w-10 lg:w-0"></div>

        {/* Informações do usuário - visível apenas em telas maiores */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-8 h-8 bg-[#fdba74] rounded-full flex items-center justify-center">
            <span className="text-black">{currentUser?.nome.charAt(0)}</span>
          </div>
          <div>
            <p className="text-gray-900 text-sm">{currentUser?.nome}</p>
            <p className="text-gray-500 text-xs">
              {currentUser?.role === 'admin' ? 'Administrador' : currentUser?.role === 'caixa' ? 'Caixa' : 'Funcionário'}
            </p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {notificacoesNaoLidas > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff3131] rounded-full"></span>
              )}
            </button>

            {/* Dropdown de notificações */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 max-h-[calc(100vh-100px)] flex flex-col">
                  {/* Header do dropdown */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900">Notificações</h3>
                      {notificacoesNaoLidas > 0 && (
                        <p className="text-gray-500 text-xs">
                          {notificacoesNaoLidas} não lida{notificacoesNaoLidas > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    {notificacoesNaoLidas > 0 && (
                      <button
                        onClick={marcarTodasComoLidas}
                        className="text-[#fdba74] hover:text-[#fca855] text-xs"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>

                  {/* Lista de notificações */}
                  <div className="flex-1 overflow-y-auto">
                    {notificacoes.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Nenhuma notificação</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notificacoes.map((notificacao) => (
                          <div
                            key={notificacao.id}
                            onClick={() => marcarComoLida(notificacao.id)}
                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                              !notificacao.lida ? 'bg-blue-50/30' : ''
                            }`}
                          >
                            <div className="flex gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(
                                  notificacao.tipo
                                )}`}
                              >
                                <Bell className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className="text-gray-900 text-sm">
                                    {notificacao.titulo}
                                  </p>
                                  {!notificacao.lida && (
                                    <span className="w-2 h-2 bg-[#fdba74] rounded-full flex-shrink-0 mt-1.5"></span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-xs mb-1">
                                  {notificacao.mensagem}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {formatarData(notificacao.data)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-[#ff3131] hover:bg-red-50 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}