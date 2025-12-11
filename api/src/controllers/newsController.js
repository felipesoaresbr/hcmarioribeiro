import {
  getAllNews,
  getNewsById,
  createNews,
  deleteNews,
  updateNews,
} from "../models/newsModel.js";
import path from "path";

export async function getAllNewsController(req, res) {
  try {
    const news = await getAllNews();

    // Corrige as barras invertidas e adiciona URL base se quiser
    const normalized = news.map((n) => ({
      ...n,
      image: n.image ? n.image.replace(/\\/g, "/") : null,
    }));

    res.json(normalized);
  } catch (e) {
    console.error("Erro ao buscar notícias", e);
    res.status(500).json({ error: "Erro ao buscar notícias" });
  }
}

export async function getNewsbyIdController(req, res) {
  const id = req.params.id;
  try {
    const news = await getNewsById(id);

    if (!news) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    // Corrige caminho da imagem
    if (news.image) {
      news.image = news.image.replace(/\\/g, "/");
    }

    res.json(news);
  } catch (e) {
    console.error("Erro ao buscar notícia", e);
    res.status(500).json({ error: "Erro ao buscar notícia" });
  }
}

export async function createNewsController(req, res) {
  try {
    const { title, description, highlight } = req.body;
    let imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newId = await createNews(title, description, highlight, imagePath);

    res.status(201).json({
      message: "Notícia criada com sucesso",
      news: {
        id: newId,
        title,
        description,
        highlight,
        image: imagePath,
      },
    });
  } catch (error) {
    console.error("Erro ao criar notícia", error);
    res.status(500).json({ error: "Erro ao criar notícia" });
  }
}

export async function deleteNewsController(req, res) {
  const id = req.params.id;
  try {
    const affectedRows = await deleteNews(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    return res.status(200).json({ message: "Notícia deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar notícia", error);
    res.status(500).json({ error: "Erro ao deletar notícia" });
  }
}

export async function updateNewsController(req, res) {
  const id = req.params.id;
  const { title, description, highlight } = req.body;

  try {
    let imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const affectedRows = await updateNews(id, title, description, highlight, imagePath);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }

    res.status(200).json({ message: "Notícia atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    res.status(500).json({ error: "Erro ao atualizar notícia" });
  }
}
