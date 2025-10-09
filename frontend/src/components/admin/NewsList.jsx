import { FaXmark, FaEye, FaPenToSquare, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import CreateNews from "./CreateNews";
import { API_URL } from "../../config";

const NewsList = ({ onClose }) => {
  const [noticias, setNoticias] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const confirmTimeoutRef = useRef(null);
  const [editingNews, setEditingNews] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const token = localStorage.getItem("token");

  const formatDescription = (html, maxLength = 50) => {
    if (!html) return "";
    const strippedText = html.replace(/<[^>]*>/g, "");
    return strippedText.length > maxLength
      ? strippedText.substring(0, maxLength) + "..."
      : strippedText;
  };

  const handleDelete = useCallback(
    async (id) => {
      if (confirmDelete === id) {
        clearTimeout(confirmTimeoutRef.current);
        try {
          await axios.delete(`${API_URL}/news.php?action=delete`, {
            data: { id: id },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setNoticias((prev) => prev.filter((noticia) => noticia.id !== id));
          setConfirmDelete(null);
        } catch (error) {
          console.error("Erro ao excluir notícia:", error);
          alert(error.response?.data?.message || "Erro ao excluir notícia");
        }
      } else {
        setConfirmDelete(id);
        confirmTimeoutRef.current = setTimeout(() => setConfirmDelete(null), 3000);
      }
    },
    [confirmDelete, token]
  );

  const handleEdit = (noticia) => {
    setEditingNews(noticia);
    setShowEditModal(true);
  };

  const handleUpdateSuccess = (updatedNews) => {
    setNoticias((prev) => prev.map((n) => (n.id === updatedNews.id ? updatedNews : n)));
    setShowEditModal(false);
    setEditingNews(null);
  };

  const refreshNews = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/news.php?action=read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNoticias(response.data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    }
  }, [token]);

  useEffect(() => {
    refreshNews();
    return () => {
      clearTimeout(confirmTimeoutRef.current);
    };
  }, [refreshNews]);

  return (
    <>
      <main className="bg-white w-4/5 max-w-6xl h-fit rounded-2xl shadow-lg border border-gray-300 p-8">
        <header className="mb-8 flex items-center justify-between text-3xl text-slate-700 tracking-wide">
          <h2 className="flex items-center gap-4">
            Visualizar notícias <FaEye />
          </h2>
          <button
            className="text-slate-600 text-4xl hover:scale-110 cursor-pointer transition-all"
            onClick={onClose}
          >
            <FaXmark />
          </button>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-300">
                <th className="text-left p-3 w-2/6">Título</th>
                <th className="text-left p-3 w-3/6">Descrição</th>
                <th className="text-left p-3 w-1/6">Publicação</th>
                <th className="text-center p-3 w-1/6">Destaque</th>
                <th className="text-center p-3 w-1/6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((noticia) => (
                <tr
                  key={noticia.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-slate-800">{noticia.titulo}</td>
                  <td
                    className="p-3 text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                    title={formatDescription(noticia.descricao, 1000)}
                  >
                    {formatDescription(noticia.descricao)}
                  </td>
                  <td className="p-3 text-slate-600 whitespace-nowrap">
                    {new Date(noticia.publicacao).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-center">{noticia.destaque === "S" ? "Sim" : "Não"}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      title="Editar"
                      className="text-slate-600 hover:scale-120 transition-all cursor-pointer"
                      onClick={() => handleEdit(noticia)}
                    >
                      <FaPenToSquare size={18} />
                    </button>
                    <button
                      title={confirmDelete === noticia.id ? "Confirmar exclusão?" : "Excluir"}
                      className={`${
                        confirmDelete === noticia.id ? "text-red-600" : "text-slate-600"
                      } hover:scale-120 transition-all cursor-pointer`}
                      onClick={() => handleDelete(noticia.id)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <CreateNews
            className="shadow-xl shadow-black/30"
            onClose={() => {
              setShowEditModal(false);
              setEditingNews(null);
            }}
            existingNews={editingNews}
            onSuccess={handleUpdateSuccess}
          />
        </div>
      )}
    </>
  );
};

export default NewsList;
