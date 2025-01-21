# DuoLibras Backend

Backend da plataforma DuoLibras, desenvolvido com Node.js, Express, TypeScript e Prisma.

### 🛠️ Tecnologias

- Node.js
- TypeScript
- Express
- Prisma (ORM)
- PostgreSQL
- Docker
- JWT para autenticação
- Zod para validação
- Jest para testes

### 📋 Pré-requisitos

- Node.js (versão LTS)
- Docker e Docker Compose
- pnpm (recomendado) ou npm
- PostgreSQL (via Docker)

### 🚀 Instalação

1. **Clone o repositório**
```bash
git clone git@github.com:seu-usuario/duolibras-backend.git
cd duolibras-backend
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Configure o arquivo .env com suas variáveis:

```env
DATABASE_URL="postgresql://duolibras-postgres:duolibras-postgres@localhost:5432/duolibras-db?schema=public"
JWT_SECRET="sua-chave-secreta"

AWS_S3_BUCKET_NAME="o-nome-do-seu-bucket-da-aws"
AWS_S3_REGION="a-região-do-seu-bucket-da-aws"
AWS_ACCESS_KEY_ID="a-sua-chave-de-acesso-do-bucket-da-aws"
AWS_SECRET_ACCESS_KEY="a-sua-chave-secreta-de-acesso-do-bucket-da-aws"
```

4. **Inicie o banco de dados**
```bash
pnpm db:up
```

5. **Execute as migrações**
```bash
pnpm db:migrate:dev
```

6. **Popular o banco com dados iniciais (opcional)**

```bash
pnpm db:seed
```

7. **Inicie o servidor de desenvolvimento**

```bash
pnpm dev
```

### 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm typecheck` | Verifica tipos TypeScript |
| `pnpm test` | Executa testes em modo watch |
| `pnpm db:push` | Atualiza o banco com alterações do schema |
| `pnpm db:migrate:dev` | Cria uma nova migração |
| `pnpm db:up` | Inicia o container Docker do banco |
| `pnpm db:stop` | Para o container Docker do banco |
| `pnpm db:down` | Remove o container Docker do banco |
| `pnpm db:seed` | Popula o banco com dados iniciais |

### 🗄️ Estrutura do Banco

Iniciar o banco:
```bash
pnpm db:up
```

Criar nova migração:
```bash
pnpm db:migrate:dev -- --name nome_da_migracao
```

Parar o banco:
```bash
pnpm db:stop
```

Remover o container:
```bash
pnpm db:down
```

### 🧪 Testes
Execute os testes com:
```bash
pnpm test
```

### 🔒 Autenticação
O projeto usa JWT para autenticação. Certifique-se de:

1. Configurar JWT_SECRET no .env
2. Incluir o token nos headers das requisições autenticadas:

```txt
Authorization: Bearer <seu-token>
```

### 🐳 Docker
O docker-compose.yml inclui:

- PostgreSQL
- Portas e volumes configurados
- Variáveis de ambiente para o banco

### 🤝 Contribuindo

1. Faça o fork
2. Crie sua branch: git checkout -b feature/nome
3. Commit suas mudanças: git commit -m 'Adiciona feature'
4. Push para a branch: git push origin feature/nome
5. Abra um Pull Request


