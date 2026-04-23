# Rotas da Aplicação - Trendy Atelier

## 🔐 Autenticação

| Rota | Método | Descrição | Componente |
|------|--------|-----------|-----------|
| `/login` | GET | Página de login | `(auth)/login/page.tsx` |

## 📊 Dashboard (Requer autenticação)

### 👥 Funcionários

| Rota | Método | Descrição | Componente |
|------|--------|-----------|-----------|
| `/employee` | GET | Lista de funcionários | `(dashboard)/employee/page.tsx` |
| `/employee/[id]` | GET | Detalhes/edição de funcionário | `(dashboard)/employee/[id]/page.tsx` |

**Exemplo de URL:**
- `/employee` - Lista todos
- `/employee/1` - Detalhes do funcionário ID 1

### 👤 Clientes

| Rota | Método | Descrição | Componente |
|------|--------|-----------|-----------|
| `/client` | GET | Lista de clientes | `(dashboard)/client/page.tsx` |
| `/client/[id]` | GET | Detalhes/edição de cliente | `(dashboard)/client/[id]/page.tsx` |

**Exemplo de URL:**
- `/client` - Lista todos
- `/client/1` - Detalhes do cliente ID 1

### 📋 Secretária

| Rota | Método | Descrição | Componente |
|------|--------|-----------|-----------|
| `/secretary` | GET | Dashboard da secretária | `(dashboard)/secretary/page.tsx` |

**Features:**
- Visitas totais
- Visitas de hoje
- Tarefas pendentes
- Total de clientes

### 👔 CEO

| Rota | Método | Descrição | Componente |
|------|--------|-----------|-----------|
| `/ceo` | GET | Dashboard do CEO | `(dashboard)/ceo/page.tsx` |

**Features:**
- Receita (este mês)
- Total de clientes
- Número de funcionários
- Taxa de conclusão de visitas
- Relatórios
- Análises

### 📅 Visitas

| Rota | Método | Descrição | Componente |
|------|--------|-----------|-----------|
| `/appointments` | GET | Lista e gestão de visitas | `(dashboard)/appointments/page.tsx` |
| `/appointments/[id]` | GET | Detalhes/edição de visita | `(dashboard)/appointments/[id]/page.tsx` |

**Exemplo de URL:**
- `/appointments` - Lista todas as visitas
- `/appointments/1` - Detalhes da visita ID 1

**Fields na edição de visita:**
- Nome do cliente
- Email do cliente
- Serviço (dropdown com opções)
- Funcionário responsável
- Data
- Hora
- Duração (em minutos)
- Status (pendente, confirmada, concluída, cancelada)
- Notas

## 🗂️ Estrutura de Grupos de Layout

```
(auth)           # SEM layout de dashboard (só login)
  └── login/

(dashboard)      # COM sidebar e layout compartilhado
  ├── employee/
  ├── client/
  ├── secretary/
  ├── ceo/
  └── appointments/
```

## 🔗 Links de Navegação (Sidebar)

```typescript
navItems = [
  { href: '/employee', label: 'Funcionários' },
  { href: '/client', label: 'Clientes' },
  { href: '/secretary', label: 'Secretária' },
  { href: '/ceo', label: 'CEO' },
  { href: '/appointments', label: 'Marcar Visitas' },
]
```

## 📱 Layout Responsivo

- **Desktop**: Sidebar esquerda + conteúdo principal
- **Mobile**: (A implementar com burger menu)

## 🔐 Proteção de Rotas (TODO)

Implementar middleware para:
- Redirecionar `/login` → `/employee` se autenticado
- Redirecionar rotas `/dashboard` → `/login` se não autenticado
- Validar role do utilizador (employee, secretary, ceo, etc.)

## 🎯 Fluxo de Navegação Típico

```
1. Utilizador acessa /login
2. Faz login com credenciais
3. Redireciona para /employee (ou rota baseada em role)
4. Pode navegar via sidebar para:
   - /employee (funcionários)
   - /client (clientes)
   - /secretary (dashboard)
   - /ceo (dashboard executivo)
   - /appointments (visitas)
5. Clica em "Sair" para voltar a /login
```

## 📝 Próximas Rotas (TODO)

- `/profile` - Perfil do utilizador
- `/settings` - Configurações
- `/reports` - Relatórios (para CEO)
- `/services` - Gestão de serviços
- `/schedule` - Calendário de agendamentos
