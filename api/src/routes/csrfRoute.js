import { Router } from "express";
import csrfProtection from "../middlewares/csrfTokenMiddleware.js";

const router = Router();

router.get("/csrf-token", csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});


export default router;