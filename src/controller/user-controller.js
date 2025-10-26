import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function criarUsuario(req, res) {
  const { username, password } = req.body;

  if (!username || !password || password.length < 4) {
    return res.status(400).json({ message: "Username e senha são obrigatórios. Senha mínimo 4 caracteres." });
  }

  const existente = await prisma.users.findUnique({ where: { username } });
  if (existente) {
    return res.status(409).json({ message: "Username já está em uso." });
  }

  const totalUsuarios = await prisma.users.count();
  const isAdmin = totalUsuarios === 0; // primeiro usuário criado

  const novoUsuario = await prisma.users.create({
    data: { username, password, isAdmin }
  });

  res.status(201).json({
    message: "Usuário criado com sucesso",
    usuario: {
      id: novoUsuario.id,
      username: novoUsuario.username,
      isAdmin: novoUsuario.isAdmin
    }
  });
}
