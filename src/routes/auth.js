import Router from "express";
import { criarUsuario } from "../controller/user-controller.js";

const router = Router();

router.post("/register", criarUsuario);

export default router;
