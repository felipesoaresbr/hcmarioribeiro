import { FaHeadset, FaPhoneFlip } from "react-icons/fa6";
import Vector1 from '../assets/vectors/undraw_remote-worker_0l91.svg'

const Contact = () => {



    return (
        <>
            <main className="flex flex-col w-full justify-center pt-3 sm:pt-3 lg:pt-10">
                <div className="px-5 sm:px-5 lg:px-40 2xl:px-70 flex flex-col sm:flex-col lg:flex-row w-full gap-8 h-fit sm:h-fit lg:h-[450px]" data-aos="fade-down" data-aos-delay="100">
                    <div className="w-full sm:w-full lg:w-1/2 text-slate-800 lg:p-6 rounded-2xl tracking-wide flex flex-col">
                        <h1 className="text-3xl lg:text-2xl 2xl:text-3xl flex flex-row justify-between items-center mb-8 text-blue-800">Central de Relacionamentos <FaHeadset /></h1>
                        <p className="mb-8 lg:text-sm 2xl:text-base">
                            Na Central de Relacionamentos do Hospital das Clínicas Dr. Mário Ribeiro da Silveira, você consegue agendar consultas e exames, marcar visitas à instituição, obter informações e tirar suas dúvidas quanto à preços, horário de atendimento médico e corpo clínico.
                        </p>
                        <section className="text-lg">

                            <div className="flex flex-row items-center gap-2"><FaPhoneFlip className="bg-[#004688] text-white p-1 rounded-sm" /><span className="text-blue-600 underline">+55 38 3218-8150</span></div>
                        </section>
                    </div>
                    <div className="pb-5 sm:pb-5 lg:pb-0 w-full sm:w-full lg:w-1/2 flex justify-end">
                        <img src={Vector1} className="w-[550px] lg:w-[520px] 2xl:w-[550px]" />
                    </div>

                </div>
            </main>
        </>
    )
};

export default Contact;