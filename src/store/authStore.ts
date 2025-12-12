import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

// Usuários mockados para demonstração
const mockUsers = [
  {
    id: 1,
    nome: 'Administrador',
    email: 'admin@petshop.com',
    username: 'admin',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: 2,
    nome: 'Maria Silva',
    email: 'maria@petshop.com',
    username: 'maria',
    password: 'maria123',
    role: 'funcionario' as const,
  },
  {
    id: 3,
    nome: 'João Santos',
    email: 'joao@petshop.com',
    username: 'joao',
    password: 'joao123',
    role: 'caixa' as const,
  },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    login: async (username: string, password: string) => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const user = mockUsers.find(
        (u) => (
          u.username.toLowerCase() === username.toLowerCase() ||
          u.email.toLowerCase() === username.toLowerCase() ||
          u.nome.toLowerCase() === username.toLowerCase()
        ) && u.password === password
      );

      if (user) {
        const { password: _, username: __, ...userWithoutPassword } = user;
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
        });
      } else {
        throw new Error('Credenciais inválidas');
      }
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
    },
  }),
  {
    name: 'auth-storage',
  }
));