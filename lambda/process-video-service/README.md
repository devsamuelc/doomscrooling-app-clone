````markdown
# Process Video Service

Este serviço é responsável pelo processamento dos vídeos na aplicação. Implementado como uma função AWS Lambda, ele consome eventos da fila SQS (`video-events-queue`), atualiza o status dos vídeos no banco e notifica clientes conectados via WebSocket.

---

## Tecnologias usadas

- Node.js (TypeScript)
- Prisma ORM para acesso ao banco PostgreSQL
- AWS Lambda para execução serverless
- AWS SQS para fila de eventos de vídeos
- WebSocket para notificações em tempo real

---

## Funcionalidades

- Recebe eventos via AWS SQS quando um vídeo precisa ser processado.
- Atualiza o status do vídeo (`PROCESSING`, `AVAILABLE`, `FAILED`) no banco de dados.
- Registra o timestamp de processamento.
- Envia notificação via WebSocket para todos os clientes conectados sobre vídeos disponíveis.
- Trate erros atualizando status para `FAILED`.

---

## Como funciona

1. O serviço é acionado por mensagens da fila `video-events-queue`.
2. Para cada mensagem (que contém o ID do vídeo), o serviço consulta o banco via Prisma.
3. Atualiza o status para `PROCESSING`.
4. Executa a lógica de processamento (pode ser estendida para incluir transcodificação, etc).
5. Atualiza o vídeo para `AVAILABLE` e registra `processedAt`.
6. Envia mensagem via WebSocket para os clientes notificando o vídeo disponível.
7. Em caso de erro, marca o vídeo como `FAILED`.

---

## Variáveis de ambiente

- `DATABASE_URL`: string de conexão com o PostgreSQL.
- `WEBSOCKET_API_ENDPOINT`: endpoint para o WebSocket (API Gateway).
- (Outras variáveis AWS: SQS queue URL, etc, conforme necessidade.)

---

## Deploy

Deploy feito via Serverless Framework (`sls deploy`). Configuração no arquivo `serverless.yml` gerencia a função Lambda, triggers SQS, permissões e variáveis de ambiente.

---

## Build e execução local

1. Instale dependências:

```bash
npm install
````

2. Build com esbuild:

```bash
npm run build
```

3. Teste localmente simulando evento da fila:

```bash
node dist/index.js
# ou use ferramentas de mock AWS Lambda
```

---

## Observações

* O pacote gerado deve ficar abaixo do limite AWS Lambda (250 MB descompactado).
* Prisma client e arquivos `prisma/schema.prisma` precisam estar presentes no bundle.
* Atenção à configuração do WebSocket para envio correto das mensagens.

---

## Contato

Samuel Lima da Cruz
[dev.samuellc@outlook.com](mailto:dev.samuellc@outlook.com)

---

Made with ❤️ by Samuel Lima da Cruz

```