# Doomscrolling of Doom - Frontend

Este projeto é o frontend da aplicação Doomscrolling of Doom, uma plataforma simples de streaming de vídeos com funcionalidades de upload, likes, comentários e autenticação.

---

## Funcionalidades principais

- Exibição de vídeos com player integrado
- Sistema de likes visual e interativo
- Comentários colapsáveis para cada vídeo, com input para novos comentários (apenas para usuários logados)
- Upload de vídeos `.mp4` (até 10MB), com formulário em duas etapas
- Login e logout com persistência via JWT
- Suporte a internacionalização (Português e Inglês)
- Layout responsivo e moderno usando Tailwind CSS

---

## Tecnologias utilizadas

- Vue 3 com Composition API
- Pinia para gerenciamento de estado
- Vue I18n para internacionalização
- Axios para comunicação HTTP com backend
- Tailwind CSS para estilo rápido e responsivo

---

## Configuração e execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Backend da aplicação rodando (NestJS + Prisma + PostgreSQL + S3) — você precisa do URL da API para configurar

### Passos para rodar localmente

1. Clone o repositório frontend:

```bash
git clone https://github.com/seu-usuario/doomscrolling-frontend.git
cd doomscrolling-frontend
````

2. Instale as dependências:

```bash
npm install
```

3. Configure a variável de ambiente com a URL do backend (exemplo em `.env.local`):

```
VITE_API_BASE_URL=http://localhost:3001
```

4. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra o navegador em `http://localhost:5173`

---

## Teste de idiomas

Você pode alternar entre Português e Inglês na aplicação, que já suporta os dois idiomas.

---

## Observação sobre o backend

O backend deve estar rodando e acessível na URL configurada em `VITE_API_BASE_URL` para que as funcionalidades como autenticação, upload, likes e comentários funcionem corretamente.

---

## Contato

Samuel Lima da Cruz — [dev.samuellc@outlook.com](mailto:dev.samuellc@outlook.com)
GitHub: [https://github.com/devsamuelc](https://github.com/devsamuelc)

---

## Licença

MIT © 2025 Samuel Lima da Cruz