import pool from "../db.js";
import argon2 from "argon2";

export default async function loginModel(usuario, senha) {
    try {
        const [rows] = await pool.execute("SELECT * FROM funcionarios WHERE nome = ?", [usuario]);

        if(rows.length > 0) {
            const user = rows[0];
            const verifyPassword = await argon2.verify(user.senha, senha)
            if(!verifyPassword) return null;

            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Erro na query", error);
        throw error;
    }
};