import loginModel from "../models/loginModel.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

export async function loginController(req, res) {
    const {nome, senha} = req.body;
    try {
        const user = await loginModel(nome, senha);

        if(!user) {
            return res.status(401).json({error: "Usuário ou senha inválidos"});
        }

        const token = jwt.sign(
            {id: user.id, nome: user.nome},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.cookie('token', token);
        
        return res.json({status: "Success"});

    } catch (error) {
        console.error("Erro ao buscar usuários", error);
        res.status(500).json({error: "Erro interno no servidor."});
    }
};

export async function verifyUser (req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.json({error: "Sem token de autenticação"})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.json({error: "Erro de autenticação"});
            } else {
                next();
            }
        });
    }
};