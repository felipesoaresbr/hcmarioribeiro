import { FaXmark, FaRegPenToSquare, FaPenToSquare, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState, useRef } from "react";
import CreateDespesas from "./CreateDespesas";

const EditDespesas = ({ onClose }) => {
  const [despesas, setDespesas] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingDespesas, setEditingDespesas] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const timeoutRef = useRef(null);

  const getCsrfToken = async () => {
    const res = await axios.get(`${API_URL}/csrf-token`, { withCredentials: true });
    return res.data.csrfToken;
  };

  useEffect(() => {
    const refreshDespesas = async () => {
      try {
        const response = await axios.get(`${API_URL}/despesas`);
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
        alert(error.response?.data?.message || "Erro ao buscar despesas");
      }
    };

    refreshDespesas();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDelete = async (id) => {
    if (confirmDelete === id) {
      try {
        const csrfToken = await getCsrfToken();
        await axios.delete(`${API_URL}/despesas/delete/${id}`, {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken },
        });
        setDespesas((prev) => prev.filter((d) => d.id !== id));
        setConfirmDelete(null);
      } catch (error) {
        console.error("Erro ao excluir despesa:", error);
        alert(error.response?.data?.message || "Erro ao excluir despesa");
      }
    } else {
      setConfirmDelete(id);
      timeoutRef.current = setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const handleEdit = (despesa) => {
    setEditingDespesas(despesa);
    setShowEditModal(true);
  };

  const handleUpdateSuccess = (updatedDespesa) => {
    setDespesas((prev) =>
      prev.map((d) => (d.id === updatedDespesa.id ? updatedDespesa : d))
    );
    setShowEditModal(false);
    setEditingDespesas(null);
  };

  return (
    <>
      <main className="bg-white w-2/3 h-[500px] rounded-2xl shadow-md border border-gray-300 p-8 overflow-y-scroll">
        <header className="mb-8 flex items-center justify-between text-3xl text-slate-700 tracking-wide">
          <h2 className="flex items-center gap-4">
            Editar despesas <FaRegPenToSquare />
          </h2>
          <button
            aria-label="Fechar"
            className="text-slate-600 text-4xl hover:scale-110 cursor-pointer transition-all"
            onClick={onClose}
            type="button"
          >
            <FaXmark />
          </button>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-300">
                <th className="text-left p-3 w-2/6">Título</th>
                <th className="text-left p-3 w-3/6">Link</th>
                <th className="text-left p-3 w-1/6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((despesa) => (
                <tr
                  key={despesa.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                    {despesa.titulo}
                  </td>
                  <td className="p-3 text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                    {despesa.link}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      title="Editar"
                      className="text-slate-600 hover:scale-110 transition-all cursor-pointer"
                      onClick={() => handleEdit(despesa)}
                      type="button"
                      aria-label={`Editar despesa ${despesa.titulo}`}
                    >
                      <FaPenToSquare size={18} />
                    </button>
                    <button
                      title={
                        confirmDelete === despesa.id
                          ? "Confirmar exclusão?"
                          : "Excluir"
                      }
                      className={`${confirmDelete === despesa.id
                        ? "text-red-600"
                        : "text-slate-600"
                        } hover:scale-110 transition-all cursor-pointer`}
                      onClick={() => handleDelete(despesa.id)}
                      type="button"
                      aria-label={
                        confirmDelete === despesa.id
                          ? `Confirmar exclusão da despesa ${despesa.titulo}`
                          : `Excluir despesa ${despesa.titulo}`
                      }
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
          <CreateDespesas
            onClose={() => {
              setShowEditModal(false);
              setEditingDespesas(null);
            }}
            existingDespesas={editingDespesas}
            onSuccess={handleUpdateSuccess}
          />
        </div>
      )}
    </>
  );
};

export default EditDespesas;
