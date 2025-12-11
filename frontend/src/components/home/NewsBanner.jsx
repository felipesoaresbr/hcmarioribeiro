import { useState, useEffect, useRef, useCallback } from "react";
import { FaRegNewspaper } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_URL } from "../../config";

const NewsBanner = () => {
  const [noticias, setNoticias] = useState([]);
  const [noticiaAtiva, setNoticiaAtiva] = useState(0);
  const [imagemAtual, setImagemAtual] = useState("");
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const noticiaIndexRef = useRef(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${API_URL}/news`);

        const destaqueNoticias = response.data
          .filter((n) => n.destaque === "S")
          .map((noticia) => ({
            ...noticia,
            descricao: noticia.descricao,
          }));

        setNoticias(destaqueNoticias);

        if (destaqueNoticias.length > 0) {
          setImagemAtual(destaqueNoticias[0].image);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const trocarNoticia = useCallback(
    (index) => {
      if (index === noticiaAtiva || noticias.length === 0) return;

      setFade(true);

      setTimeout(() => {
        setNoticiaAtiva(index);
        setImagemAtual(noticias[index].image);
        noticiaIndexRef.current = index;
        setFade(false);
      }, 500);
    },
    [noticiaAtiva, noticias]
  );

  useEffect(() => {
    if (noticias.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (noticiaIndexRef.current + 1) % noticias.length;
      trocarNoticia(nextIndex);
    }, 20000);

    return () => clearInterval(interval);
  }, [noticias, trocarNoticia]);

  const handleChange = (index) => trocarNoticia(index);

  const handleReadMore = () => {
    const currentNews = noticias[noticiaAtiva];
    if (currentNews?.id) navigate(`/news/${currentNews.id}`);
  };

  const handleNextImage = () => {
    const next = (noticiaAtiva + 1) % noticias.length;
    trocarNoticia(next);
  };

  if (loading) {
    return (
      <main className="w-full h-[575px] flex items-center justify-center bg-blue-100 text-slate-700">
        Carregando notícias...
      </main>
    );
  }

  if (!noticias.length) {
    return (
      <main className="w-full h-[575px] flex items-center justify-center bg-red-100 text-red-700">
        Nenhuma notícia em destaque.
      </main>
    );
  }

  const noticia = noticias[noticiaAtiva];

  return (
    <main className="bg-gradient-to-r from-blue-900 to-blue-700 w-full min-h-fit px-5 sm:px-5 lg:px-40 2xl:px-70 py-10">
      <header>
        <h1 className="text-3xl sm:text-3xl lg:text-3xl justify-center sm:justify-center lg:justify-start 2xl:text-4xl text-white flex flex-row items-center gap-2 tracking-wider">
          Principais notícias
        </h1>
      </header>

      <article className="flex flex-col sm:flex-col lg:flex-row gap-6 sm:gap-6 lg:gap-10 mt-6 sm:mt-6 lg:mt-10">
        <div className="w-full lg:w-3/6 2xl:w-3/5 h-full flex flex-col items-center relative">
          <div
            className={`w-full h-[300px] lg:h-[350px] 2xl:h-[425px] rounded-xl transition-opacity duration-500 ease-in-out ${fade ? "opacity-0" : "opacity-100"
              }`}
            style={{
              backgroundImage: `url(${API_URL}/${imagemAtual})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handleNextImage}
          />

          <nav className="w-full h-[8px] sm:h-[8px] lg:h-[7px] mt-2 flex flex-row gap-2 z-10">
            {noticias.map((_, index) => (
              <button
                key={index}
                style={{ width: `${100 / noticias.length}%` }}
                className={`h-full rounded-xl cursor-pointer ${noticiaAtiva === index ? "bg-gray-500" : "bg-gray-400"
                  }`}
                onClick={() => handleChange(index)}
              ></button>
            ))}
          </nav>
        </div>

        <div data-aos="fade-in" className="w-full lg:w-2/5 flex flex-col text-white">
          <header className="flex flex-row justify-between border-b border-blue-300 mb-5 pb-2">
            <span className="text-xl xl:text-xl 2xl:text-2xl font-semibold">{noticia.titulo}</span>
            <span className="text-blue-200 font-normal lg:text-xs">
              {new Date(noticia.publicacao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </header>

          <div
            className="text-justify text-sm lg:text-xs 2xl:text-sm whitespace-pre-wrap break-words overflow-hidden line-clamp-4"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: noticia.descricao }}
          />

          <button
            onClick={handleReadMore}
            className="relative inline-block group self-end mt-4 sm:mt-4 lg:mt-auto font-semibold text-lg sm:text-lg lg:text-md 2xl:text-lg text-white tracking-wide cursor-pointer hover:scale-105 transition-all"
          >
            <span className="relative z-10">Leia mais</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-400 group-hover:w-full"></span>
          </button>
        </div>
      </article>
    </main>
  );
};

export default NewsBanner;
