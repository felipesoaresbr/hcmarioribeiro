import { useEffect, useState } from "react";
import { FaFileContract, FaXmark } from "react-icons/fa6";
import { API_URL } from "../../config";

const CreateDespesas = ({ onClose, existingDespesas, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [num, setNum] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingDespesas) {
      setNum(existingDespesas.num || "");
      setTitle(existingDespesas.titulo || "");
      setAddress(existingDespesas.link || "");
    }
  }, [existingDespesas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      num,
      title,
      address,
    };

    try {
      let response;

      if (existingDespesas) {
        // Edição
        response = await fetch(`${API_URL}/despesas.php?action=update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Envia cookies (inclui HttpOnly token)
          body: JSON.stringify({
            id: existingDespesas.id,
            ...payload,
          }),
        });

        if (!response.ok) throw new Error("Erro ao atualizar despesa");

        if (onSuccess) {
          onSuccess({
            id: existingDespesas.id,
            num: num,
            titulo: title,
            link: address,
          });
        }
      } else {
        // Criação
        response = await fetch(`${API_URL}/despesas.php?action=create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Envia cookies (inclui HttpOnly token)
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erro ao criar despesa");

        onClose();
      }
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
      alert("Erro ao salvar despesa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white w-2/3 h-fit rounded-2xl shadow-md border border-gray-300 p-8">
      <header className="mb-8 flex items-center justify-between text-3xl text-slate-700 tracking-wide">
        <h2 className="flex items-center gap-4">
          {existingDespesas ? "Editar Despesa" : "Nova Despesa"} <FaFileContract />
        </h2>
        <button
          className="text-slate-600 text-4xl hover:scale-110 cursor-pointer transition-all"
          onClick={onClose}
        >
          <FaXmark />
        </button>
      </header>

      <form className="flex flex-col lg:gap-4 2xl:gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:gap-1 2xl:gap-2">
          <label className="text-slate-700">Número</label>
          <input
            className="border-b border-gray-500 text-slate-800 lg:text-lg 2xl:text-xl lg:p-1.5 2xl:p-2 outline-0"
            placeholder="Digite o número"
            value={num}
            type="number"
            onChange={(e) => setNum(e.target.value)}
            required
            disabled={loading}
          />
          <label className="text-slate-700">Título</label>
          <input
            className="border-b border-gray-500 text-slate-800 lg:text-lg 2xl:text-xl lg:p-1.5 2xl:p-2 outline-0"
            placeholder="Digite o título"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
          <label className="text-slate-700">Link</label>
          <input
            className="border-b border-gray-500 text-slate-800 lg:text-lg 2xl:text-xl lg:p-1.5 2xl:p-2 outline-0"
            placeholder="Digite o link"
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all text-lg w-fit self-end ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? existingDespesas
              ? "Atualizando..."
              : "Salvando..."
            : existingDespesas
            ? "Atualizar"
            : "Salvar"}
        </button>
      </form>
    </main>
  );
};

export default CreateDespesas;
