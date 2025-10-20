import pool from "../db.js";

export async function getAllDespesas() {
    try {
        const [rows] = await pool.execute('SELECT * FROM despesas');
        return rows;
    } catch (error) {
        console.error("Erro na query", error)
        throw error;
    }
};

export async function createDespesas(num, title, address) {
    try {
        const sql = `INSERT INTO despesas (numero, titulo, link) VALUES (?, ?, ?)`;
        const [result] = await pool.execute(sql, [num, title, address]);
        return result.insertId;

    } catch (error) {
        console.error("Erro na query", error);
        throw error;
    }
};

export async function deleteDespesas(id) {
    try {
        const sql = `DELETE FROM despesas WHERE id = ?`;
        const [result] = await pool.execute(sql, [id]);
        const affectedRows = result.affectedRows;
    } catch (error) {
        console.error("Erro na query", error)
        throw error;
    }
};

export async function updateDespesas(id, num, title, address) {
  try {
    const sql = `UPDATE despesas SET numero = ?, titulo = ?, link = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [num, title, address, id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Erro na query", error);
    throw error;
  }
}