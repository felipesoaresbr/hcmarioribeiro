import { Router } from "express";
import csrfProtection from "../middlewares/csrfTokenMiddleware.js";
import { getAllDespesasController, createDespesasController, deleteDespesasController, updateDespesasController } from "../controllers/despesasController.js";
const router = Router();

router.get('/', getAllDespesasController);
router.post('/create', csrfProtection, createDespesasController);
router.delete('/delete/:id', csrfProtection, deleteDespesasController);
router.post('/update/:id', csrfProtection, updateDespesasController);

export default router;