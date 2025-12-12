import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import '@/index.css';

// Import das páginas
import { Vendas } from '@/components/Vendas';
import { Estoque } from '@/components/Estoque';
import { RelatoriosAvancados } from '@/components/RelatoriosAvancados';
import { Usuarios } from '@/components/Usuarios';
import { Configuracoes } from '@/components/Configuracoes';
import { Clientes } from '@/components/Clientes';
import { Pets } from '@/components/Pets';
import { Fornecedores } from '@/components/Fornecedores';
import { Agendamentos } from '@/components/Agendamentos';
import { Despesas } from '@/components/Despesas';
import { Financeiro } from '@/components/Financeiro';

function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Rota pública de login */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />

      {/* Rotas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard - Todos exceto caixa */}
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'funcionario']}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />

        {/* Financeiro - Apenas admin */}
        <Route 
          path="financeiro" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Financeiro />
            </ProtectedRoute>
          } 
        />

        {/* Vendas - Todos podem acessar */}
        <Route path="vendas" element={<Vendas />} />

        {/* Clientes - Admin e funcionário */}
        <Route 
          path="clientes" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'funcionario']}>
              <Clientes />
            </ProtectedRoute>
          } 
        />

        {/* Pets - Admin e funcionário */}
        <Route 
          path="pets" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'funcionario']}>
              <Pets />
            </ProtectedRoute>
          } 
        />

        {/* Estoque - Todos podem visualizar */}
        <Route path="estoque" element={<Estoque />} />

        {/* Fornecedores - Admin e funcionário */}
        <Route 
          path="fornecedores" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'funcionario']}>
              <Fornecedores />
            </ProtectedRoute>
          } 
        />

        {/* Agendamentos - Admin e funcionário */}
        <Route 
          path="agendamentos" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'funcionario']}>
              <Agendamentos />
            </ProtectedRoute>
          } 
        />

        {/* Despesas - Apenas admin */}
        <Route 
          path="despesas" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Despesas />
            </ProtectedRoute>
          } 
        />

        {/* Relatórios - Apenas admin */}
        <Route 
          path="relatorios" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <RelatoriosAvancados />
            </ProtectedRoute>
          } 
        />

        {/* Usuários - Apenas admin */}
        <Route 
          path="usuarios" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Usuarios />
            </ProtectedRoute>
          } 
        />

        {/* Configurações - Todos exceto caixa */}
        <Route 
          path="configuracoes" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'funcionario']}>
              <Configuracoes />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
