# Design Patterns Studies

## 📚 Sobre o Repositório

Repositório criado para estudos e exemplificações de padrões de projeto, desenvolvido como parte do seminário da disciplina Técnicas de Programação 2. Este projeto tem como foco principal a implementação prática do padrão Chain of Responsibility em um sistema completo de solicitação de produtos.

## 🏗 Estrutura do Projeto

```text
designPatterns/
├── examples/
│   └── chainOf-responsability/
│       ├── api/                 # API REST com Chain of Responsibility
│       │   ├── src/
│       │   │   ├── classes/         # Implementação dos Handlers
│       │   │   ├── routes/          # Rotas da API
│       │   │   ├── lib/             # Configurações e utilitários
│       │   │   └── server.ts        # Servidor principal
│       │   ├── prisma/              # ORM e migrações
│       │   └── package.json
│       ├── frontend/                # Interface web
│       |    ├── index.html
│       |    ├── style.css
│       |    └── script.js
|       |
|       └── mer.png
│      
└── README.md
```

## 🎯 Chain of Responsibility - Sistema de Solicitação de Produtos

### 🤔 Motivação do Pattern

O padrão Chain of Responsibility foi escolhido para representar o fluxo sequencial de aprovação em um sistema de solicitação de produtos. Cada etapa do processo (estoque, alocação, separação, conferência, expedição) é encapsulada em um handler independente, permitindo:

- **Desacoplamento**: Cada etapa não conhece as outras
- **Flexibilidade**: Fácil adição/remoção de etapas
- **Manutenibilidade**: Alterações em uma etapa não afetam as outras
- **Reuso**: Handlers podem ser recombinados em diferentes fluxos

### 🔗 Fluxo Implementado

```text
EstoqueHandler → AlocacaoHandler → SeparacaoHandler → ConferenciaHandler → ExpedicaoHandler
```

Cada handler pode:

- ✅ Aprovar e passar para o próximo
- ❌ Rejeitar e finalizar a cadeia
- 📝 Atualizar status no banco de dados

## MER
<img src="../mer.png">

## 🚀 Como Executar

### Pré-requisitos

- Node.js >18
- PostgreSQL
- npm ou yarn

### Backend

```bash
# Navegar para o diretório do backend
cd examples/chainOf-responsability/backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais do PostgreSQL

# Executar migrações do banco
npx prisma migrate dev

# Popular banco com dados de exemplo
npx prisma db seed

# Executar em modo desenvolvimento
npm run dev

# Ou compilar e executar
npm run build
npm start
```

### Frontend

```bash
# Navegar para o diretório do frontend
cd examples/chainOf-responsability/frontend

# Servir via servidor local (Python)
python -m http.server 8000

# Ou via Live Server (VS Code)
# Abrir index.html com Live Server
```

### Acesso

- **Frontend**: http://localhost:8000
- **Backend**: http://localhost:5000
- **Prisma Studio**: `npx prisma studio` (http://localhost:5555)

## 🛠 Tecnologias Utilizadas

### Backend

- **Node.js + TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **Chain of Responsibility** - Padrão implementado

### Frontend

- **HTML5 + CSS3 + JavaScript**
- **Bootstrap 5** - Framework CSS
- **SweetAlert2** - Alertas modais
- **Fetch API** - Comunicação com backend

## 💡 Casos de Uso Implementados

### 1. Fluxo de Solicitação Completo

```typescript
// Cadeia de responsabilidade
    const estoqueHandler = new EstoqueHandler();
    const alocacaoHandler = new AlocacaoHandler();
    const separacaoHandler = new SeparacaoHandler();
    const conferenciaHandler = new ConferenciaHandler();
    const expedicaoHandler = new ExpedicaoHandler();
```

### 2. Handlers Específicos

- **EstoqueHandler**: Verifica disponibilidade no estoque
- **AlocacaoHandler**: Simula processo de alocação (50% chance de sucesso)
- **SeparacaoHandler**: Simula separação física (50% chance de sucesso)
- **ConferenciaHandler**: Simula conferência de qualidade (50% chance de sucesso)
- **ExpedicaoHandler**: Finaliza expedição (50% chance de sucesso)

### 3. Gestão de Estados

Cada handler atualiza o status da solicitação no banco, permitindo rastreamento completo do processo.

## 📋 API Endpoints

### Produtos

- `GET /produtos` - Lista todos os produtos com categorias

### Categorias

- `GET /categorias` - Lista todas as categorias
- `GET /categorias/:id/produtos` - Lista produtos por categoria

### Solicitações

- `GET /solicitacoes` - Lista histórico de solicitações
- `POST /solicitacoes/criar` - Cria nova solicitação (dispara Chain of Responsibility)

## 🎨 Interface do Frontend

### Funcionalidades

- ✅ Seleção hierárquica (Categoria → Produto)
- ✅ Formulário de solicitação com validação
- ✅ Histórico de pedidos em tempo real
- ✅ Feedback visual com SweetAlert2
- ✅ Design responsivo com Bootstrap

### Fluxo de Uso

1. Selecionar categoria
2. Selecionar produto
3. Informar quantidade
4. Submeter solicitação
5. Acompanhar processamento via Chain of Responsibility

## 🔧 Estrutura dos Handlers

```typescript
abstract class AbstractHandler {
  private nextHandler: AbstractHandler | null;
  
  setNext(handler: AbstractHandler): AbstractHandler;
  abstract execute(solicitacao_id: number): any;
  protected passToNext(solicitacao_id: number): any;
}
```

Cada handler concreto implementa a lógica específica da etapa e decide se passa adiante ou finaliza o processo.

## 📊 Banco de Dados

### Modelos Principais

- **Categoria** - Categorias de produtos
- **Produto** - Produtos com relação à categoria
- **Estoque** - Quantidades disponíveis
- **Solicitacao** - Histórico de solicitações com status

### Dados de Exemplo

Inclui categorias (Informática, Escritório, etc.) e produtos com estoques variados para demonstração.

## 🚧 Possíveis Expansões

- Adicionar mais padrões de projeto (Strategy, Observer, etc.)
- Implementar autenticação e autorização
- Adicionar testes unitários e de integração
- Criar dashboard administrativo
- Implementar WebSockets para atualizações em tempo real
- Adicionar filas para processamento assíncrono

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para Técnicas de Programação 2.

**Contato:**
- GitHub: https://github.com/willsf2021
- Email: willsf2021@gmail.com

## 📄 Licença

Este projeto é destinado para fins educacionais.

---

> "O Chain of Responsibility permite que você passe uma solicitação ao longo de uma cadeia de handlers. Ao receber uma solicitação, cada handler decide processar a solicitação ou passá-la para o próximo handler na cadeia." - Padrões GoF