# Pet Shop Popular — Painel de Gestão 🐾

Painel administrativo completo para gerenciar vendas, estoque, clientes, pets, agendamentos e financeiro de um pet shop. Projeto front-end em React + TypeScript, usando Vite e Tailwind CSS.

## Sumário

- [Pet Shop Popular — Painel de Gestão 🐾](#pet-shop-popular--painel-de-gestão-)
  - [Sumário](#sumário)
  - [Demonstração rápida](#demonstração-rápida)
  - [Funcionalidades](#funcionalidades)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e execução](#instalação-e-execução)
  - [Estrutura do projeto](#estrutura-do-projeto)
  - [Rotas principais](#rotas-principais)
  - [Usuários de teste](#usuários-de-teste)
  - [Boas práticas e sugestões](#boas-práticas-e-sugestões)
  - [Contribuição](#contribuição)
  - [Licença](#licença)

## Demonstração rápida

1. Copie o `.env.example` para `.env` e ajuste as variáveis se necessário.
2. Rode `npm install` e depois `npm run dev`.
3. Abra `http://localhost:5174/` (o Vite pode escolher outra porta se a 5173 estiver ocupada).

## Funcionalidades

- Dashboard com métricas e gráficos
- PDV / Vendas
- Gestão de estoque (CRUD de produtos)
- Cadastro de clientes e pets
- Agendamentos de serviços
- Financeiro e controle de despesas (áreas protegidas)
- Relatórios e exportação (PDF)
- Gestão de usuários com permissões por função

## Pré-requisitos

- Node.js 18+ recomendado
- npm (ou yarn/pnpm)

## Instalação e execução

```bash
# clonar repositório
git clone <repo-url>
cd projectpetshop-front

# instalar dependências
npm install

# copiar arquivo de exemplo de ambiente
cp .env.example .env

# rodar em desenvolvimento
npm run dev

# build para produção
npm run build

# preview do build
npm run preview
```

Se o Vite indicar que a porta `5173` está ocupada, ele tentará outra (por exemplo `5174`).

## Estrutura do projeto

```
src/
├── assets/            # imagens e assets livres
├── components/        # componentes reutilizáveis e páginas menores
├── layouts/           # MainLayout, AuthLayout
├── pages/             # páginas roteadas (LoginPage, DashboardPage, ...)
├── store/             # Zustand stores (authStore)
├── styles/            # Tailwind / CSS global
└── types/             # interfaces TypeScript
```

## Rotas principais

```
/login          - Página de login
/dashboard      - Dashboard principal
/vendas         - PDV
/estoque        - Gerenciamento de estoque
/clientes       - Cadastro de clientes
/pets           - Cadastro de pets
/fornecedores   - Gestão de fornecedores
/agendamentos   - Agenda de serviços
/despesas       - Controle de despesas (admin)
/financeiro     - Relatórios e financeiro (admin)
/relatorios     - Relatórios avançados (admin)
/usuarios       - Gestão de usuários (admin)
/configuracoes  - Configurações do sistema
```

## Usuários de teste

Use estas credenciais em `LoginPage` (mock):

- Admin: `admin` / `admin123`
- Funcionário: `maria` / `maria123`
- Caixa: `joao` / `joao123`

Também é possível logar com o e‑mail completo (por ex. `admin@petshop.com`) ou com o nome completo.

## Boas práticas e sugestões

- Substituir o logo placeholder (`/logo.png`) pelo seu arquivo real em `public/`.
- Conectar o front com um backend real: crie endpoints para autenticação, produtos, vendas, etc.
- Implementar refresh token e proteção de rotas no backend.
- Adicionar testes unitários / E2E (Jest, Vitest, Playwright).
- Fazer code splitting e lazy loading para reduzir o bundle inicial.

## Contribuição

1. Fork o repositório
2. Crie uma branch: `feature/minha-feature`
3. Faça commits pequenos e descritivos
4. Abra um Pull Request

## Licença

MIT — consulte o arquivo `LICENSE` se necessário.

---

Se quiser, eu posso também:

- Gerar um `CHANGELOG.md` inicial
- Adicionar um `CONTRIBUTING.md` com guidelines
- Criar templates de issue/PR para o GitHub

---

Desenvolvido com ❤️ — pronto para conectar ao backend e evoluir.
# petshop_popular
