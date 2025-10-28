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

// ✅ Qualquer usuário
router.get('/', authMiddleware, pegarTodosOsLivros);

router.get('/:id', authMiddleware, pegarLivroPorId);

router.post('/:id/borrow', authMiddleware, emprestarLivro);

router.post('/:id/return', authMiddleware, devolverLivro);

 // 🔒 Apenas admin
router.post('/', authMiddleware, adminMiddleware, criarLivro);

router.patch("/:id", authMiddleware, adminMiddleware, atualizarLivro);

router.delete('/:id', authMiddleware, adminMiddleware, deletarLivro);

export default router;
