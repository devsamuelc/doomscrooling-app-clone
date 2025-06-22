````markdown
# Backend - API do Projeto

Este repositório contém o backend da aplicação, desenvolvido em **NestJS** com **TypeScript** e **Prisma** como ORM para PostgreSQL.

---

## Tecnologias usadas

- [NestJS](https://nestjs.com/) - Framework Node.js para backend escalável
- [Prisma](https://www.prisma.io/) - ORM para banco de dados PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Swagger](https://swagger.io/) - Documentação interativa da API
- JWT para autenticação e autorização

---

## Estrutura geral dos serviços

- **Autenticação**
  Endpoints para login, registro, refresh token e logout.

- **Usuários**
  CRUD de usuários, gerenciamento de permissões e perfil.

- **Vídeos**
  Upload, atualização, listagem e controle de status (PENDENTE, PROCESSANDO, DISPONÍVEL).

- **Comentários**
  CRUD de comentários em vídeos, com suporte a likes.

- **Likes**
  Curtição para vídeos e comentários.

- **WebSocket**
  Notificações em tempo real para atualizações de vídeos via WebSocket.

---

## Rodando localmente

1. Clone o repositório e instale as dependências:

```bash
git clone <repo-url>
cd backend
npm install
```

2. Configure as variáveis de ambiente (exemplo `.env`):

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
PORT=3000
VIDEO_EVENTS_QUEUE_URL=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SUPER_SECRET_VALUE=...
AWS_REGION=...
AWS_S3_BUCKET_NAME=...
```

3. Gere o cliente Prisma e rode as migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

4. Inicie a aplicação:

```bash
npm run start:dev
```

---

## Documentação da API (Swagger)

A documentação interativa da API está disponível durante a execução da aplicação em:

```
http://localhost:3000/api
```

Lá você pode testar todos os endpoints, ver os modelos e parâmetros aceitos.

---

## Testes

* Para rodar testes unitários e de integração, use:

```bash
npm run test
```

---

## Deploy

* O backend é empacotado e deployado usando AWS Lambda + Serverless Framework (em outro repositório/pasta).
* As funções Lambda interagem com a API REST do NestJS para fornecer endpoints backend e comunicação com banco e WebSocket.

---

## Contato

Samuel Lima da Cruz
[dev.samuellc@outlook.com](mailto:dev.samuellc@outlook.com)

---

Obrigado por contribuir! 🚀
```