import Router from "express";
import {
  pegarTodosOsLivros,
  pegarLivroPorId,
  criarLivro,
  deletarLivro,
  emprestarLivro,
  devolverLivro,
  atualizarLivro
} from "../controller/books-controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = Router();

router.get('/', authMiddleware, pegarTodosOsLivros);

router.get('/:id', authMiddleware, pegarLivroPorId);

router.post('/', authMiddleware, adminMiddleware, criarLivro);

router.patch("/:id", authMiddleware, adminMiddleware, atualizarLivro);

router.delete('/:id', authMiddleware, adminMiddleware, deletarLivro);

router.post('/:id/borrow', authMiddleware, emprestarLivro);

router.post('/:id/return', authMiddleware, devolverLivro);

export default router;
