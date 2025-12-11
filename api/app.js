import express from "express";
import newsRoutes from './src/routes/newsRoutes.js';
import despesasRoutes from './src/routes/despesasRoutes.js';
import loginRoutes from './src/routes/loginRoutes.js';
import csrfRoute from './src/routes/csrfRoute.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import cors from 'cors';

const app = express();

app.use(cookieParser());

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS,
    methods: ["POST", "GET","DELETE"],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", csrfRoute);
app.use("/api/news", newsRoutes);
app.use("/api/despesas", despesasRoutes);
app.use("/api/login", loginRoutes);

export default app;