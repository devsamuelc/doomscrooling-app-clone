# WebSocket Service

Serviço responsável pela gestão de conexões WebSocket via AWS API Gateway e Lambda, utilizado para comunicação em tempo real com os clientes.

---

## Tecnologias

- Node.js 18.x
- AWS Lambda
- AWS API Gateway (WebSocket)
- Prisma ORM (PostgreSQL)
- Serverless Framework

---

## Funcionalidades

- Gerenciamento de conexões WebSocket (`$connect`, `$disconnect`)
- Armazenamento das conexões ativas no banco via Prisma
- Broadcast de mensagens para todos os clientes conectados
- Escalabilidade serverless com deploy via Serverless Framework

---

## Deploy

Configure suas variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL=postgresql://...
````

Para fazer o deploy, utilize o Serverless Framework:

```bash
sls deploy
```

---

## Estrutura

* `src/connect.ts` - handler para conexão de clientes
* `src/disconnect.ts` - handler para desconexão
* `src/default.ts` - handler para mensagens recebidas dos clientes
* `serverless.yml` - configuração do deploy serverless

---

## Contato

Samuel Lima da Cruz
[dev.samuellc@outlook.com](mailto:dev.samuellc@outlook.com)
