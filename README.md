# 📚 Projeto — API de Gestão de Biblioteca

Este projeto é uma API REST para gerenciamento de livros de uma biblioteca, com autenticação básica e diferenciação entre usuários comuns e administradores.

---

## 🎯 Objetivos de Aprendizagem

- Implementar rotas seguindo padrão REST
- Criar middlewares de autenticação e autorização
- Implementar autenticação via Basic Token
- Realizar operações CRUD com Prisma ORM e SQLite
- Diferenciar permissões entre usuário comum e admin

---

## 🧠 Regras de Negócio

### 📘 Livros
- `title` e `author` são obrigatórios
- Usuário não pode emprestar livro indisponível
- Apenas admin pode criar, editar ou deletar livros

### 👤 Usuários
- `username` deve ser único
- `password` deve ter no mínimo 4 caracteres
- O primeiro usuário criado é automaticamente `admin`

### 🔄 Sistema simplificado
- Não há controle real de empréstimos (apenas `available: true/false`)
- Não há histórico ou data de devolução

---

## 🗂️ Estrutura do Projeto

> ⚠️ **Observação importante:**  
> A estrutura abaixo **não segue exatamente o modelo sugerido**, mas foi adaptada para funcionar corretamente com Prisma, Express e organização de código.  
> O Prisma e o arquivo .env está dentro da pasta `src/`, e o banco de dados é gerado localmente.

```plaintext
projeto-biblioteca/
├── src/
│   ├── controller/
│   │   ├── books-controller.js
│   │   └── user-controller.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── gestao-biblioteca.db
│   │   └── migrations/
│   ├── routes/
│   │   ├── auth.js
│   │   └── books.js
│   └── server.js
│   └──.env
├── .gitignore
├── package.json
└── README.md
