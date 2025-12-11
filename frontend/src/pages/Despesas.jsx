import { API_URL } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

const Despesas = () => {
    const [despesas, setDespesas] = useState([]);

    useEffect(() => {
        const fetchDespesas = async () => {
            try {

                const response = await axios.get(`${API_URL}/despesas`);

                setDespesas(response.data);
            } catch (error) {
                console.error("Erro ao buscar despesas:", error);
            }
        }

        fetchDespesas();
    }, []);

    return (
        <>
            <main className="px-5 sm:px-5 lg:px-40 2xl:px-70 py-10 h-fit" data-aos="fade-down" data-aos-delay="100">
                <h1 className="text-3xl lg:text-2xl 2xl:text-3xl flex flex-row justify-between items-center mb-8 text-blue-800">Execução de Despesas</h1>
                <div className="text-lg lg:text-base 2xl:text-lg tracking-wide grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 space-y-1 sm:space-y-1 lg:space-y-2 gap-4 lg:gap-2 2xl:gap-4">
                    {
                        despesas.map((despesa) => (
                            <a key={despesa.id} href={despesa.link} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-gray-200 h-[120px] flex flex-col justify-center items-center p-2 px-3 text-blue-800 text-md hover:scale-101 transition-all hover:bg-blue-300">
                                <p>  {despesa.numero % 1 === 0
                                    ? despesa.numero
                                    : despesa.numero.toFixed(1)}
                                    - {despesa.titulo} - {despesa.titulo}</p>
                                <p className="text-sm lg:text-xs 2xl:text-sm">Acesse Aqui</p>
                            </a>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default Despesas;