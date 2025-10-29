# 🌐 Rede Social — X

Aplicação **Full Stack** desenvolvida em **Next.js** com **TypeScript**, **Node.js (Express)** e **PostgreSQL**, que implementa uma **rede social completa**.  
O sistema permite **cadastro, login, autenticação com JWT**, e exibe **dados e posts do usuário logado**.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Front-end
- [Next.js](https://nextjs.org/)  
- TypeScript  
- Tailwind CSS  
- Axios (para comunicação com a API)  

### ⚙️ Back-end
- Node.js  
- Express  
- TypeScript  
- PostgreSQL  
- Prisma ORM  
- Zod (validação de dados)  
- JWT (autenticação)  
- CORS / Dotenv  

---

## 🧩 Funcionalidades

✅ **Cadastro de usuário** com validação via Zod  
✅ **Login** com autenticação via **JWT**  
✅ **Proteção de rotas** — apenas usuários autenticados acessam áreas restritas  
✅ **Retorno dos dados do usuário logado**  
✅ **Exibição de informações do perfil**  
✅ **Listagem de posts do usuário autenticado**  
✅ **Integração completa entre Front-end e Back-end**

---

## 📦 Como Clonar o Projeto

```bash
# Clonar o repositório
git clone https://github.com/andersonmelo/x.git

# Acessar a pasta do projeto
cd x

⚙️ Configuração do Back-end

# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

DATABASE_URL="postgresql://postgres:senha@localhost:5432/rede_social?schema=public"
JWT_SECRET=sua_chave_secreta
PORT=5000 # Sua porta (pode alterar se desejar)

Depois, execute as migrações e inicialize o Prisma:
npx prisma migrate dev

Rodar o servidor:
npm run dev
```

💻 Configuração do Front-end

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

🔐 Fluxo de Autenticação

Cadastro: usuário insere nome, email e senha → dados validados com Zod

Login: validação com JWT, retornando token de sessão

Acesso autenticado: rotas protegidas verificam o token via middleware

Perfil e posts: backend retorna informações do usuário logado e seus posts

🧠 Conceitos Aplicados

Integração completa entre Next.js e Node/Express

Autenticação via JWT

ORM Prisma com PostgreSQL

Validação robusta com Zod

Estilização com Tailwind CSS

Organização modular com TypeScript
