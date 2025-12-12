import { LayoutDashboard, ShoppingCart, Package, FileText, Users, Settings, UserCircle, PawPrint, Truck, Calendar, Receipt, TrendingUp, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { User } from '@/types';
// TODO: Replace with actual logo
const logo = '/logo.png';

interface SidebarProps {
  currentUser: User | null;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentUser, onLogout, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false, caixaHidden: true },
    { path: '/financeiro', label: 'Financeiro', icon: TrendingUp, adminOnly: true, caixaHidden: true },
    { path: '/vendas', label: 'Vendas', icon: ShoppingCart, adminOnly: false, caixaHidden: false },
    { path: '/clientes', label: 'Clientes', icon: UserCircle, adminOnly: false, caixaHidden: true },
    { path: '/pets', label: 'Pets', icon: PawPrint, adminOnly: false, caixaHidden: true },
    { path: '/estoque', label: 'Estoque', icon: Package, adminOnly: false, caixaHidden: false },
    { path: '/fornecedores', label: 'Fornecedores', icon: Truck, adminOnly: false, caixaHidden: true },
    { path: '/agendamentos', label: 'Agendamentos', icon: Calendar, adminOnly: false, caixaHidden: true },
    { path: '/despesas', label: 'Despesas', icon: Receipt, adminOnly: true, caixaHidden: true },
    { path: '/relatorios', label: 'Relatórios', icon: FileText, adminOnly: true, caixaHidden: true },
    { path: '/usuarios', label: 'Usuários', icon: Users, adminOnly: true, caixaHidden: true },
    { path: '/configuracoes', label: 'Configurações', icon: Settings, adminOnly: false, caixaHidden: true },
  ];

  // Filtrar itens baseado no role do usuário
  const visibleMenuItems = menuItems.filter((item) => {
    // Se for caixa, mostrar apenas itens não ocultos para caixa
    if (currentUser?.role === 'caixa') {
      return !item.caixaHidden;
    }
    // Se não for admin, ocultar itens exclusivos de admin
    if (!item.adminOnly || currentUser?.role === 'admin') {
      return true;
    }
    return false;
  });

  return (
    <>
      {/* Botão hambúrguer - Mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#fdba74] text-black rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <img src={logo} alt="Pet Shop Popular" className="w-full h-auto" />
        </div>
        <nav className="flex-1 p-2 lg:p-4 overflow-y-auto">
          <ul className="space-y-1 lg:space-y-2">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => onToggle()}
                    className={({ isActive }) => `
                      w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors text-sm lg:text-base
                      ${isActive
                        ? 'bg-[#fdba74] text-black'
                        : 'text-gray-700 hover:bg-[#fff5eb]'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-2 lg:p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3">
            <div className="w-8 h-8 bg-[#fdba74] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-black text-sm">{currentUser?.nome.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 text-sm lg:text-base truncate">{currentUser?.nome}</p>
              <p className="text-gray-500 text-xs lg:text-sm truncate">
                {currentUser?.role === 'admin' ? 'Administrador' : currentUser?.role === 'caixa' ? 'Caixa' : 'Funcionário'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}