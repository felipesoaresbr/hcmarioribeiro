import pool from "../db.js";

export async function getAllNews() {
  try {
    const [rows] = await pool.execute("SELECT * FROM noticias ORDER BY publicacao DESC"); // pega apenas rows
    return rows;
  } catch (error) {
    console.error("Erro na query:", error);
    throw error;
  }
};

export async function getNewsById(id) {
  try {
    const [rows] = await pool.execute("SELECT * FROM noticias WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Erro na query", error);
    throw error;
  }
};


export async function createNews(titulo, descricao, destaque, imagem) {
  try {
    const sql = `
      INSERT INTO noticias (titulo, descricao, destaque, image, publicacao)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const [result] = await pool.execute(sql, [titulo, descricao, destaque, imagem]);
    return result.insertId;
  } catch (error) {
    console.error("Erro na query", error);
    throw error;
  }
};

export async function deleteNews(id) {
  try {
    const sql = `DELETE FROM noticias WHERE id = ?`;
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Erro na query", error)
    throw error;
  }
};

export async function updateNews(id, title, description, highlight) {
  try {
    const sql = `UPDATE noticias SET titulo = ?, descricao = ?, destaque = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [title, description, highlight, id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Erro na query", error);
    throw error;
  }
}
