# Estrutura de UI - Trendy Atelier

## Visão Geral
Esta estrutura organiza o frontend Next.js em grupos lógicos para diferentes funcionalidades e papéis de utilizador.

## Estrutura de Diretórios

```
app/
├── (auth)/                    # Grupo de autenticação (sem sidebar)
│   └── login/
│       └── page.tsx          # Página de login
│
├── (dashboard)/              # Grupo principal (com sidebar de navegação)
│   ├── layout.tsx            # Layout compartilhado com sidebar
│   │
│   ├── employee/             # Gestão de Funcionários
│   │   ├── page.tsx          # Lista de funcionários
│   │   └── [id]/
│   │       └── page.tsx      # Detalhes do funcionário
│   │
│   ├── client/               # Gestão de Clientes
│   │   ├── page.tsx          # Lista de clientes
│   │   └── [id]/
│   │       └── page.tsx      # Detalhes do cliente
│   │
│   ├── secretary/            # Dashboard da Secretária
│   │   └── page.tsx          # Stats e tarefas da secretária
│   │
│   ├── ceo/                  # Dashboard do CEO
│   │   └── page.tsx          # Métricas e análises executivas
│   │
│   └── appointments/         # Gestão de Visitas
│       ├── page.tsx          # Lista e gestão de visitas
│       └── [id]/
│           └── page.tsx      # Detalhes e edição de visita
│
├── components/               # Componentes reutilizáveis
│   ├── Header.tsx            # Cabeçalho com menu de perfil
│   ├── Button.tsx            # Botão customizável
│   ├── Table.tsx             # Tabela genérica
│   └── index.ts              # Export centralizado
│
├── lib/                      # Funções e utilitários
│   └── utils.ts              # Funções auxiliares
│
├── globals.css               # Estilos globais
├── layout.tsx                # Layout raiz
└── page.tsx                  # Página inicial
```

## Funcionalidades por Página

### 🔐 Autenticação
- **Login** (`/login`) - Formulário de entrada com email e senha

### 👥 Funcionários
- **Lista** (`/employee`) - Visualizar todos os funcionários com ações (editar/deletar)
- **Detalhes** (`/employee/[id]`) - Editar informações do funcionário

### 👤 Clientes
- **Lista** (`/client`) - Visualizar todos os clientes
- **Detalhes** (`/client/[id]`) - Editar informações do cliente

### 📋 Secretária
- **Dashboard** (`/secretary`) - Stats de visitas, tarefas pendentes e próximas visitas

### 👔 CEO
- **Dashboard** (`/ceo`) - Métricas de receita, clientes, funcionários e taxa de conclusão

### 📅 Visitas
- **Lista** (`/appointments`) - Gestão e agendamento de visitas
- **Detalhes** (`/appointments/[id]`) - Edição completa de visita com formulário detalhado

## Componentes Reutilizáveis

- `Header.tsx` - Componente de cabeçalho com dropdown de perfil
- `Button.tsx` - Botão com variantes (primary, secondary, danger)
- `Table.tsx` - Tabela genérica com suporte a rendering customizado

## Utilitários (`lib/utils.ts`)

- `formatDate()` - Formata datas para locale PT-PT
- `formatCurrency()` - Formata valores em €
- `formatTime()` - Formata horas
- `isValidEmail()` - Valida emails
- `isValidPhone()` - Valida números de telefone portugueses

## Como Usar

### Adicionar uma Nova Página
1. Criar nova rota em `(dashboard)/[modulo]/page.tsx`
2. Usar componentes de `app/components/`
3. A navegação lateral atualiza automaticamente

### Adicionar um Novo Componente
1. Criar em `app/components/NomeComponente.tsx`
2. Exportar em `app/components/index.ts`
3. Importar com: `import { NomeComponente } from '@/app/components'`

## Próximos Passos

- [ ] Conectar API backend para autenticação
- [ ] Implementar proteção de rotas (middleware)
- [ ] Add integração com Prisma/API
- [ ] Implementar notificações (toast, modals)
- [ ] Add testes
