import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ IMPORTAR
import NewsBanner from "../components/home/NewsBanner";
import axios from "axios";
import { API_URL } from "../config";
import { FaUserInjured, FaTruckMedical, FaBone, FaBaby } from "react-icons/fa6";

const HomePage = () => {
    const [noticias, setNoticias] = useState([]);
    const navigate = useNavigate(); // ✅ HOOK PARA NAVEGAR

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get(`${API_URL}/news.php?action=read`);
                setNoticias(response.data);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            }
        };

        fetchNoticias();
    }, []);

    return (
        <>
            <main data-aos="fade-down" data-aos-delay="100">
                <NewsBanner />
                <div className="h-fit w-full px-5 sm:px-5 lg:px-40 2xl:px-70 mt-10">
                    <h1 className="text-2xl mb-5 text-blue-800">Mais notícias</h1>
                    <div className="grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 flex gap-4 flex-wrap flex-col">
                        {noticias.map((noticia) => (
                            <div
                                key={noticia.id}
                                className="w-full sm:w-full lg:w-[300px] cursor-pointer"
                                onClick={() => navigate(`/news/${noticia.id}`)}
                            >
                                <div
                                    className="shadow-md shadow-black/20 border border-gray-300 bg-gradient-to-br from-blue-500 to-blue-900 h-[200px] w-full rounded-xl"
                                    style={{
                                        backgroundImage: `url(${API_URL}/${noticia.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></div>
                                <p className="text-gray-600 text-sm mt-2 sm:mt-2 lg:mt-1">
                                    {new Date(noticia.publicacao).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="tracking-wide text-blue-800 text-md">{noticia.titulo}</p>
                            </div>
                        ))}

                    </div>
                    <div className="justify-self-end pt-4">
                        <button
                            onClick={() => navigate("/news")}
                            className="text-slate-800 font-medium text-lg cursor-pointer hover:scale-102 transition-all"
                        >
                            Ver todas as notícias
                        </button>
                    </div>
                </div>

                <div className="w-full px-5 sm:px-5 lg:px-40 2xl:px-70 mt-10 py-10 bg-gray-100 border-t border-gray-300 pb-10 mb-2">
                    <h1 className="text-2xl text-blue-800">Precisa de ajuda?</h1>
                    <p className="my-4 text-slate-800">Contamos com uma gama diversificada de serviços <strong className="text-blue-800">24 horas</strong> para cuidar da sua saúde! Conheça algumas de nossas unidades 24h:</p>
                    <section className="grid grid-cols-1 gap-5 text-blue-800">
                        <article className="bg-white border border-gray-200 p-6 rounded-lg sm:h-fit lg:h-[120px] 2xl:h-fit">
                            <header className="flex flex-row items-center gap-5 sm:gap-5 text-blue-800 lg:gap-0 justify-between sm:text-xl lg:text-lg 2xl:text-xl tracking-wider pb-2 border-b border-gray-300 mb-6">
                                <p>Pronto Socorro Adulto - <strong>24h</strong></p>
                                <FaTruckMedical className="text-gray-100 bg-[#004688] text-2xl p-0.5 rounded" />
                            </header>

                        </article>
                        <article className="bg-white border border-gray-200 p-6 rounded-lg h-fit sm:h-fit lg:h-[120px] 2xl:h-fit">
                            <header className="flex flex-row items-center justify-between text-blue-800 gap-5 sm:gap-5 lg:gap-5 2xl:gap-0 text-xl sm:text-xl lg:text-lg 2xl:text-xl tracking-wider pb-2 border-b border-gray-300 mb-6">

                                <p>Pronto Socorro Materno Infantil - <strong>24h</strong></p>
                                <FaBaby className="text-gray-100 bg-[#004688] text-2xl p-0.5 rounded" />


                            </header>
                        </article>
                        <article className="bg-white border border-gray-200 p-6 rounded-lg sm:h-fit lg:h-[120px] 2xl:h-fit">
                            <header className="flex flex-row gap-5 sm:gap-5 lg:gap-0  text-blue-800items-center justify-between text-xl sm:text-xl lg:text-lg 2xl:text-xl  tracking-wider pb-2 border-b border-gray-300 mb-6">

                                <p>Ortopedia - <strong>24h</strong></p>
                                <FaUserInjured className="text-gray-100 bg-[#004688] text-2xl p-0.5 rounded" />
                            </header>

                        </article>
                    </section>

                    <div className="flex flex-row items-center justify-end"><Link to="services" className="w-full sm:w-full lg:w-fit"><button className="w-full mt-6 sm:mt-6 lg:mt-8 py-4 sm:py-4 lg:py-2 px-10 sm:px10 lg:px-12 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg cursor-pointer transition-all hover:scale-102 hover:opacity-95 text-xl text-white">Veja mais</button></Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;
