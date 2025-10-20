import { FaNewspaper, FaXmark, FaImage } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { API_URL } from "../../config";

const CreateNews = ({ onClose, existingNews, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        dropcursor: false,
        gapcursor: false,
        hardBreak: false,
      }),
    ],
    content: existingNews?.descricao || "<p></p>",
  });

  useEffect(() => {
    if (existingNews) {
      setTitle(existingNews.titulo);
      setHighlight(existingNews.destaque === "S");
      if (existingNews.image) {
        setImagePreview(`${API_URL}/${existingNews.image}`);
      }
    }
  }, [existingNews]);

  const getCsrfToken = async () => {
    const res = await axios.get(`${API_URL}/csrf-token`, { withCredentials: true });
    return res.data.csrfToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", editor?.getHTML() || "");
    if (image) formData.append("image", image);
    formData.append("highlight", highlight ? "S" : "N");

    try {
      const csrfToken = await getCsrfToken();
      if (existingNews) {
        formData.append("id", existingNews.id);
        await axios.post(`${API_URL}/news/update/${existingNews}`, formData, {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken },
        });

        if (onSuccess) {
          onSuccess({
            id: existingNews.id,
            titulo: title,
            descricao: editor?.getHTML() || "",
            image: image ? URL.createObjectURL(image) : existingNews.image,
            publicacao: existingNews.publicacao,
            destaque: highlight ? "S" : "N",
          });
        }
      } else {
        await axios.post(`${API_URL}/news/create`, formData, {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken },
        });
        onClose();
      }

    } catch (error) {
      console.error("Erro ao publicar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleHighlightChange = (e) => {
    setHighlight(e.target.checked);
  };

  return (
    <main className="bg-white w-2/3 h-fit rounded-2xl shadow-md border border-gray-300 p-8">
      <header className="lg:mb-12 2xl:mb-15 flex flex-row items-center justify-between gap-10 lg:text-3xl 2xl:text-4xl text-slate-700 tracking-wide">
        <p className="flex flex-row lg:gap-7 2xl:gap-10 items-center">
          {existingNews ? "Editar notícia" : "Nova notícia"} <FaNewspaper />
        </p>
        <button
          className="cursor-pointer hover:scale-110 transition-all outline-0"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <FaXmark />
        </button>
      </header>

      <form className="flex flex-col lg:gap-4 2xl:gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:gap-1 2xl:gap-2">
          <label className="text-slate-700">Título</label>
          <input
            className="border-b border-gray-500 text-slate-800 lg:text-lg 2xl:text-xl lg:p-1.5 2xl:p-2 outline-0"
            placeholder="Digite o título"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col lg:gap-1.5 2xl:gap-2">
          <label className="text-slate-700">Descrição</label>
          <div className="border-b border-gray-500 rounded-none">
            <RichTextEditor
              editor={editor}
              styles={{
                root: {
                  border: "none",
                  borderRadius: 0,
                },
                content: {
                  fontSize: "1rem",
                  color: "#1e293b",
                  minHeight: "120px",
                  padding: "0.5rem",
                  "& p": {
                    margin: 0,
                    padding: "0.25rem 0",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                },
                toolbar: {
                  border: "none",
                  borderBottom: "1px solid #e2e8f0",
                  borderRadius: 0,
                  padding: "0.5rem 0",
                  marginBottom: "0.5rem",
                },
                control: {
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#64748b",
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                },
              }}
            >
              <RichTextEditor.Toolbar sticky>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content placeholder="Digite a descrição da notícia..." />
            </RichTextEditor>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700">Imagem</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={handleImageClick}
            className="cursor-pointer flex items-center gap-2 border border-gray-500 tracking-wide rounded p-4 text-md text-slate-700 hover:bg-gray-100 transition"
            disabled={isSubmitting}
          >
            <FaImage />
            {existingNews?.image ? "Alterar imagem" : "Escolher imagem"}
          </button>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="max-h-40 rounded object-contain" />
              <p className="text-sm text-gray-500 mt-1">Pré-visualização da imagem</p>
            </div>
          )}
          {existingNews?.image && !imagePreview && (
            <div className="mt-2">
              <img
                src={`${API_URL}/${existingNews.image}`}
                alt="Current"
                className="max-h-40 rounded object-contain"
              />
              <p className="text-sm text-gray-500 mt-1">Imagem atual</p>
            </div>
          )}
        </div>

        <div className="gap-2 flex flex-row items-center text-slate-800">
          <input
            type="checkbox"
            id="highlight"
            checked={highlight}
            onChange={handleHighlightChange}
            disabled={isSubmitting}
          />
          <label htmlFor="highlight">Destaque</label>
        </div>

        <button
          className="cursor-pointer text-lg tracking-wide bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded px-4 py-3 hover:bg-blue-700 hover:scale-y-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : existingNews ? "Atualizar" : "Publicar"}
        </button>
      </form>
    </main>
  );
};

export default CreateNews;
