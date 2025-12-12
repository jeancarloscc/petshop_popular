import { useState } from 'react';
import { Lock, User as UserIcon } from 'lucide-react';
import type { User } from '@/types';
// TODO: Replace with actual logo
const logo = '/logo.png';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Usuários mockados para demonstração
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    nome: 'Administrador',
    email: 'admin@petshop.com',
    role: 'admin' as const,
  },
  {
    id: 2,
    username: 'maria',
    password: 'maria123',
    nome: 'Maria Silva',
    email: 'maria@petshop.com',
    role: 'funcionario' as const,
  },
  {
    id: 3,
    username: 'joao',
    password: 'joao123',
    nome: 'João Santos',
    email: 'joao@petshop.com',
    role: 'caixa' as const,
  },
];

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin({
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      });
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdba74] to-[#ff3131] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Pet Shop Popular" className="w-48 h-auto" />
          </div>
          <h1 className="text-gray-900 mb-2">Sistema de Gerenciamento</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Usuário</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74]"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#fdba74] text-black py-3 rounded-lg hover:bg-[#fca855] transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 p-4 bg-[#fff5eb] rounded-lg">
          <p className="text-gray-900 mb-2">Credenciais de teste:</p>
          <p className="text-gray-700 text-sm">Admin: admin / admin123</p>
          <p className="text-gray-700 text-sm">Funcionário: maria / maria123</p>
          <p className="text-gray-700 text-sm">Caixa: joao / joao123</p>
        </div>
      </div>
    </div>
  );
}