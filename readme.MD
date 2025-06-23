# Doomscrolling App Clone

Este projeto é um clone funcional de um app estilo TikTok, focado em experiência de rolagem infinita de vídeos.

## 🧠 Visão geral

O sistema é dividido em três aplicações principais:


### 🧩 Backend (NestJS)

- Desenvolvido com NestJS e Fastify
- ORM: Prisma + PostgreSQL
- Funcionalidades:
  - Upload e gerenciamento de vídeos
  - Comentários e likes em vídeos
  - WebSocket para notificação em tempo real
  - Autenticação com JWT
- Deploy: Serverless via AWS Lambda

---

### ⚙️ Funções Lambda [em desenvolvimento]

- **process-video-service**
  - Processa vídeos recebidos e marca como disponíveis
  - Publica notificações via WebSocket
  - Integrado com SQS (video-events-queue)

- **websocket-service**
  - Gerencia conexões WebSocket (connect/disconnect/default)
  - Salva conexões ativas no banco
  - Envia notificações em tempo real para todos os usuários conectados

---

### 🖼️ Frontend (Vue.js) [em desenvolvimento]

- Experiência de rolagem infinita
- Player de vídeo estilo feed TikTok
- Autenticação, comentários e likes
- Atualização de conteúdos em tempo real
- Internacionalização

---

## 🛠️ Tecnologias

- NestJS, Prisma, PostgreSQL
- Serverless Framework
- AWS Lambda, SQS, API Gateway WebSocket
- Vue.js

---
