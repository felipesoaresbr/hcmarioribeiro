import {Router} from 'express';
const router = Router();
import { loginController, verifyUser } from '../controllers/loginController.js';
import csrfProtection from '../middlewares/csrfTokenMiddleware.js';

router.post('/', csrfProtection, loginController);
router.get('/verify', verifyUser, (req, res) => {
    return res.json({status: "Success"});
});

export default router;