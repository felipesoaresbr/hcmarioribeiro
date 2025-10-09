import { FaBookMedical, FaHouseChimneyMedical } from "react-icons/fa6";
import Vector1 from '../assets/vectors/undraw_reading-a-book_4cap.svg';
import Vector2 from '../assets/vectors/undraw_doctors_djoj.svg';
import Vector3 from '../assets/vectors/undraw_medicine_hqqg.svg';

const Academic = () => {

    return (
        <main className="pt-10 h-fit" data-aos="fade-down" data-aos-delay="100">
            
            <div className="flex flex-col sm:flex-col lg:flex-row justify-self-center gap-5 sm:gap-5 lg:gap-20 mb-10 justify-center px-5 sm:px-5 lg:px-40 2xl:px-70">
                <div className="flex flex-row justify-center lg:justify-start sm:flex-row lg:flex-col space-y-0 sm:space-y-0 lg:space-y-10 gap-3 sm:gap-3 lg:gap-0 items-center">
                    <img src={Vector1} className="w-[95px] sm:w-[100px] lg:w-[170px]" />
                    <img src={Vector3} className="w-[95px] sm:w-[100px] lg:w-[170px]" />
                    <img src={Vector2} className="w-[95px] sm:w-[100px] lg:w-[170px]" />
                </div>
                <div className="p-9 sm:p-9 lg:p-14 bg-gradient-to-l from-blue-900 to-blue-800 w-full sm:w-full lg:w-1/2 rounded-t-4xl sm:rounded-t-2xl lg:rounded-t-5xl rounded-br-4xl sm:rounded-br-4xl lg:rounded-br-5xl">
                <h1 className="tracking-wider text-3xl lg:text-2xl 2xl:text-3xl flex flex-row justify-between items-center mb-8 text-white">Acadêmicos</h1>
                    <p className="text-white">
                        O Hospital das Clínicas Doutor Mário Ribeiro da Silveira consolidou-se como campo de prática para estágios curriculares e extracurriculares, proporcionando aos estudantes e residentes vivências reais em estruturas modernas e de alta complexidade, o que é essencial para desenvolver competências clínicas, técnicas, éticas e humanas.
                    </p>
                </div>
            </div>
            <p className="text-slate-800 px-5 sm:px-5 lg:px-40 2xl:px-70 mb-8">A instituição está credenciada pelo Ministério da Educação (MEC) para oferecer programas de residência médica em dez especialidades, sendo elas: Clínica Médica, Cirurgia Geral, Ginecologia e Obstetrícia, Pediatria, Anestesiologia, Psiquiatria, Medicina Intensiva, Medicina de Emergência, Oftalmologia, Ortopedia e Traumatologia e Medicina de Família e Comunidade. Esse ambiente acadêmico dinâmico enriquece a formação desde a graduação, fortalecendo o papel do hospital como um espaço de ensino, pesquisa, extensão e excelência na assistência em saúde.</p>

            <div className="bg-gray-100 border-y border-gray-300 py-10 px-5 sm:px-5 lg:px-40 2xl:px-70">
                <h1 className="text-2xl mb-8 text-center tracking-wide text-blue-800">
                    Somos referência em:
                </h1>
                <section className="flex flex-col sm:flex-col lg:flex-row gap-4 justify-self-center">
                    <div className="bg-white h-[90px] justify-between w-full sm:w-full lg:w-[500px] flex flex-row gap-2 items-center p-3 px-8 rounded-lg tracking-wider text-xl text-blue-800 border border-gray-200">
                        Residências Médicas <FaHouseChimneyMedical />
                    </div>
                    <div className="bg-white w-full sm:w-full lg:w-[500px] justify-between flex flex-row gap-2 items-center p-3 px-8 rounded-lg tracking-wider text-xl text-blue-800 border border-gray-200">
                        Estágios Curriculares e Extracurriculares <FaBookMedical />
                    </div>
                </section>
            </div>

        </main>
    );
};

export default Academic;
