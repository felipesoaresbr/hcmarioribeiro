import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_URL}/news.php?action=read`);
        setNews(response.data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className="h-fit w-full px-5 sm:px-5 lg:px-25 2xl:px-70 my-10" data-aos="fade-down" data-aos-delay="100">
      <h1 className="text-3xl text-blue-800 mb-6">Todas as notícias</h1>
      <div className="flex flex-nowrap sm:flex-nowrap lg:flex-wrap gap-6 flex-col">
        {news.map((item) => (
          <div
            key={item.id}
            className="w-full flex flex-col pb-5 border-b border-gray-300"

          >
            <p className="text-blue-800 leading-5 sm:leading-5 lg:leading-auto font-medium text-lg self-center">{item.titulo}</p>
            <p className="text-gray-600 text-sm lg:self-center mb-5">
              {new Date(item.publicacao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div
              className="w-full sm:w-full lg:w-[800px] self-center h-[250px] sm:h-[250px] lg:h-[500px] mb-5 rounded-lg shadow bg-cover bg-center cursor-pointer"
              onClick={() => navigate(`/news/${item.id}`)}
              style={{
                backgroundImage: `url(${API_URL}/${item.image})`,
              }}
            />


            <p className="line-clamp-2 text-gray-800" dangerouslySetInnerHTML={{ __html: item.descricao }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default AllNews;