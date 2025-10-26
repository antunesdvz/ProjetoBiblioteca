import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  const user = await prisma.users.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  req.user = user;
  next();
}
