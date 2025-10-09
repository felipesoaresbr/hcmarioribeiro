import { FaUserDoctor } from "react-icons/fa6";
import Img1 from '../../assets/img/services/akram-huseyn-brbF5FSnSgI-unsplash.jpg';
import Img2 from '../../assets/img/services/jonathan-borba-Sq3tHw0y2qE-unsplash.jpg';
import Img3 from '../../assets/img/services/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg';
import { useState } from "react";
import { useRef } from "react";

const Specialties = () => {
    const sectionRef = useRef(null);

    const handleClick = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const ambulatoriais = [
        "Fisioterapia",
        "Atenção psicossocial",
        "Odontologia",
        "Nutrição",
        "Otorrinolaringologia",
        "Ginecologia e Obstetrícia",
        "Cardiologia",
        "Neurologia",
        "Pediatria",
        "Anestesiologia",
        "Clínica geral",
        "Dermatologia",
        "Endocrinologia",
        "Fonoaudiologia",
        "Gastroenterologia",
        "Mastologia",
        "Nefrologia",
        "Ortopedia",
        "Pneumatologia (adulto e infantil)",
        "Psiquiatria",
        "Reumatologia",
        "Urologia"
    ];

    const setores = [
        "Clínica Médica",
        "Clínica Pediátrica",
        "Clínica Cirúrgica",
        "Maternidade",
        "Centro de Parto Normal",
        "UTI Adulto",
        "UTI Pediátrica",
        "UTI Neonatal",
        "Centro de Oftalmologia",
        "Odontologia Hospitalar",
        "Bloco Cirúrgico Convencional e de Cirurgias minimamente invasivas",
        "Cirurgias Robóticas",
        "Cirurgias Bariátricas",
        "Alas de apartamentos"
    ];

    const procedimentos = [
        "Videolaparoscopia",
        "Audiologia",
        "Hemoterapia",
        "Endoscopia gástrica",
        "Colonoscopia",
        "Endoscopia respiratória",
        "Radiologia",
        "Tomografia",
        "Análises clínicas/laboratoriais",
        "Eletrocardiografia",
        "Ultrassonografia"
    ];

    const atendimento = [
        "Pronto-socorro 24 horas para atendimento clínico adulto, pediátrico e obstétrico",
        "Ortopedia e traumatologia adulta e pediátrica"
    ];

    const [listaAtual, setListaAtual] = useState(ambulatoriais);
    const [abaAtiva, setAbaAtiva] = useState("ambulatoriais");

    return (
        <>
            <div className="py-5 sm:py-5 lg:py-10 w-full flex flex-col mt-10 sm:mt-8 lg:mt-15 justify-center" data-aos="fade-up" data-aos-delay="100">
                <section className="w-full flex flex-col sm:flex-col lg:flex-row gap-10 px-6 sm:px-6 lg:px-50 2xl:px-70">
                    <aside className="mb-8 lg:mb-0 w-full sm:w-full lg:w-1/2 h-96 sm:h-80 lg:h-full flex flex-row gap-2">
                        <div className="h-full sm:h-full lg:h-[450px] w-[300px] bg-blue-300 rounded-2xl overflow-hidden">
                            <img src={Img2} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-full sm:h-full lg:h-[450px] w-[360px] bg-blue-300 rounded-2xl mt-8 overflow-hidden">
                            <img src={Img1} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-full sm:h-full lg:h-[450px] w-[300px] bg-blue-300 rounded-2xl overflow-hidden">
                            <img src={Img3} className="h-full w-full object-cover" />
                        </div>
                    </aside>
                    <main className="w-full sm:w-full lg:w-1/2">
                        <header className="">
                            <h1 className="text-2xl lg:text-2xl 2xl:text-3xl text-blue-800 flex flex-row items-center gap-5 mb-8 sm:mb-6 lg:mb-8 tracking-wider">
                                <FaUserDoctor className="text-gray-50 bg-[#004688] p-1 rounded-md" /> Especialidades
                            </h1>
                            <p className="text-slate-800 lg:text-sm 2xl:text-base">
                                O HC conta com um corpo clínico altamente qualificado, composto por especialistas de renome em diversas áreas da medicina. Com atuação pautada pela ética, competência e humanização, nossos profissionais oferecem um cuidado integral ao paciente — da prevenção ao tratamento — com excelência em cada atendimento.
                            </p>
                        </header>
                        <button className="hidden sm:hidden lg:block lg:text-md 2xl:text-xl mt-6 text-blue-800 lg:py-1 2xl:py-2 px-4 border border-blue-800 tracking-wide rounded-xl hover:scale-103 cursor-pointer transition-all" onClick={handleClick}>Confira mais abaixo</button>
                    </main>
                </section>
                <div className="bg-gradient-to-l from-blue-600 to-blue-900 w-full mt-12 sm:mt-12 lg:mt-28 pb-10 min-h-[460px]" ref={sectionRef}>
                    <div className="mt-8 px-5 sm:px-6 lg:px-50 2xl:px-70">
                        <header className="border-b-1 border-blue-500 mb-8 pb-2 lg:text-xl items-start text-gray-400 flex flex-col sm:flex-col lg:flex-row gap-0 sm:gap-0 lg:gap-8">
                            <button
                                onClick={() => {
                                    setListaAtual(ambulatoriais);
                                    setAbaAtiva("ambulatoriais");
                                }}
                                className={`transition-all text-left cursor-pointer ${abaAtiva === "ambulatoriais"
                                    ? "text-white"
                                    : ""
                                    }`}
                            >
                                Serviços Ambulatoriais
                            </button>

                            <button
                                onClick={() => {
                                    setListaAtual(setores);
                                    setAbaAtiva("setores");
                                }}
                                className={`transition-all text-left cursor-pointer ${abaAtiva === "setores"
                                    ? "text-white"
                                    : ""
                                    }`}
                            >
                                Serviços de atenção hospitalar
                            </button>

                            <button
                                onClick={() => {
                                    setListaAtual(procedimentos);
                                    setAbaAtiva("procedimentos");
                                }}
                                className={`transition-all text-left cursor-pointer ${abaAtiva === "procedimentos"
                                    ? "text-white"
                                    : ""
                                    }`}
                            >
                                Serviços auxiliares de diagnose e terapia
                            </button>

                            <button
                                onClick={() => {
                                    setListaAtual(atendimento);
                                    setAbaAtiva("atendimento");
                                }}
                                className={`transition-all text-left cursor-pointer ${abaAtiva === "atendimento"
                                    ? "text-white"
                                    : ""
                                    }`}
                            >
                                Serviços de urgência e emergência
                            </button>
                        </header>
                        <ul
                            className={`${abaAtiva === "atendimento" ? "lg:columns-1" : "lg:columns-3"
                                } columns-1 sm:columns-1 text-md sm:text-md lg:text-md 2xl:text-lg gap-2 text-blue-200 space-y-2`}
                        >
                            {listaAtual.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Specialties;