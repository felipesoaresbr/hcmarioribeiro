import { Router } from "express";
import { getAllNewsController, getNewsbyIdController, createNewsController, deleteNewsController, updateNewsController } from "../controllers/newsController.js";
import csrfProtection from '../middlewares/csrfTokenMiddleware.js';
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if(allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo não permitido"));
        }
    }
});

router.get('/', getAllNewsController);
router.get('/:id', getNewsbyIdController)
router.post('/create', csrfProtection, upload.single("image"), createNewsController);
router.post('/update/:id', csrfProtection, upload.single("image"), updateNewsController);
router.delete('/delete/:id', csrfProtection, deleteNewsController);

export default router;