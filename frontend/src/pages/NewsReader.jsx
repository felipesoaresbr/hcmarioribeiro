import { FaCalendar } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const NewsReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/news/${id}`
        );

        if (response.data) {
          setNews(response.data);

          const allNews = await axios.get(
            `${API_URL}/news`
          );
          setRelatedNews(
            allNews.data
              .filter(item => item.id !== parseInt(id))
              .slice(0, 3)
          );
        } else {
          setError("Notícia não encontrada");
        }
      } catch (err) {
        console.error("Erro ao buscar notícia:", err);
        setError("Erro ao carregar a notícia");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <main className="py-10 px-5 sm:px-5 lg:px-40 2xl:px-70 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
        <p className="mt-4 text-slate-700">Carregando notícia...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-10 px-5 sm:px-5 lg:px-40 2xl:px-70 flex flex-col items-center justify-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate('/news')}
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Voltar para notícias
        </button>
      </main>
    );
  }

  if (!news) {
    return (
      <main className="py-10 px-5 sm:px-5 lg:px-40 2xl:px-70 flex flex-col items-center justify-center">
        <p className="text-slate-700">Notícia não encontrada</p>
        <button
          onClick={() => navigate('/news')}
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Voltar para notícias
        </button>
      </main>
    );
  }

  return (
    <>
      <main className="py-10 px-5 sm:px-5 lg:px-40 2xl:px-70 flex flex-col">
        <section className="w-full lg:w-2/3 self-center pb-8 border-b border-gray-300" data-aos="fade-down" data-aos-delay="100">
          <header className="flex flex-col mb-10">
            <h1 className="text-2xl sm:text-3xl tracking-wide text-blue-800">
              {news.titulo}
            </h1>
            <h2 className="text-sm tracking-wide text-gray-400 flex flex-row items-center gap-2">
              <FaCalendar className="text-slate-500 text-md" />
              {new Date(news.publicacao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h2>

          </header>

          {news.image && (
            <div className="mb-6 w-full h-64 sm:h-80 md:h-120 overflow-hidden rounded-lg">
              <img
                src={`${API_URL}/${news.image}`}
                alt={news.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="text-md text-justify text-slate-700 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: news.descricao }}
          />
        </section>

        <footer className="w-full lg:w-2/3 self-center pt-8">
          <h3 className="text-xl tracking-wide text-blue-800 mb-6">Leia mais</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedNews.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                {item.image && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={`${API_URL}/${item.image}`}
                      alt={item.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-blue-800">{item.titulo}</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.publicacao).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
};

export default NewsReader;