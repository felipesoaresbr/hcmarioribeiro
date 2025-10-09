import { FaBullseye, FaCompass, FaHospital, FaScaleBalanced } from "react-icons/fa6";
import Img1 from '../assets/img/about/entrada.jpg';
import Img2 from '../assets/img/about/medico.jpg';
import Img5 from '../assets/img/about/leito2.jpg';
import Img3 from '../assets/img/about/leito1.jpg';
import Img6 from '../assets/img/about/robo.jpg';
import Img4 from '../assets/img/about/heli.jpg';

const About = () => {
    return (
        <>
            <main>
                <div className="px-5 sm:px-5 lg:px-40 2xl:px-70 py-10 h-fit " data-aos="fade-down" data-aos-delay="100">
                    <header className="text-3xl sm:text-3xl 2xl:text-4xl text-blue-800 mb-0 sm:mb-0 lg:mb-8 font-semibold">O Hospital das Clínicas</header>
                    <section className="flex flex-col sm:flex-col lg:flex-row justify-between xl:gap-15 2xl:gap-0 mb-20 sm:mb-20 lg:mb-55 2xl:mb-94 ">
                        <aside className="relative w-screen sm:w-screen lg:w-1/2">
                            {/* Primeira imagem */}
                            <div className="overflow-hidden relative lg:absolute z-5 bg-blue-400 h-[200px] sm:h-[200px] lg:h-[350px] 2xl:h-[450px] w-1/2 sm:w-1/2 top-10 sm:top-10 lg:top-0 left-0 rounded-2xl shadow-md">
                                <img src={Img1} className="w-full h-full object-cover object-[35%]" />
                            </div>

                            {/* Segunda imagem — sempre enquadrada em sm */}
                            <div className="overflow-hidden relative lg:absolute z-6 sm:z-6 lg:z-4 bg-blue-500 h-[200px] sm:h-[200px] lg:h-[350px] 2xl:h-[450px] w-1/2 sm:w-1/2 top-0 sm:top-0 lg:top-10 left-7/10 -translate-x-7/10 lg:left-[12rem] lg:translate-x-0 rounded-2xl">
                                <img src={Img2} className="w-full h-full object-cover" />
                            </div>
                        </aside>



                        <article className="w-full sm:w-full lg:w-1/2 text-blue-800 mt-10 sm:mt-10 top:mt-0 lg:text-sm 2xl:text-base">
                            <p className="text-xl">
                                O <strong>Hospital das Clínicas Doutor Mário Ribeiro da Silveira</strong> é reconhecido pela sua moderna estrutura e alto padrão tecnológico. Referência no atendimento humanizado, o HC possui equipe qualificada e serviços diferenciados que fazem dele uma instituição ímpar na assistência social à saúde.
                            </p>
                        </article>
                    </section>
                    <section className="">
                        <h1 className="text-2xl lg:text-xl 2xl:text-3xl mb-2 sm:mb-2 lg:mb-8 tracking-wider text-blue-800">
                            Nossa História
                        </h1>
                        <p className="text-slate-800">
                            O Hospital das Clínicas Doutor Mário Ribeiro da Silveira, sediado em Montes Claros (MG), foi inaugurado em 3 de julho de 2013 como um marco na assistência à saúde pública da região da região norte de Minas Gerais. Idealizado e construído pelos fundadores Ruy Muniz, médico, professor, empresário e político (ex-prefeito de Montes Claros), e Raquel Muniz, médica, professora universitária e reitora da Funorte em parceria com as Faculdades Unidas do Norte de Minas – Funorte, a Ambar Saúde e a Soebras, o hospital nasceu com a missão de ser um hospital-escola, oferecendo ensino, pesquisa e extensão na área da saúde, além de atendimento clínico e cirúrgico gratuito pelo SUS.
                            <br /><br />O nome homenageia o Dr. Mário Ribeiro da Silveira, médico e ex-prefeito de Montes Claros entre 1989 e 1992, reconhecido pelos avanços que promoveu na saúde e na educação locais FASI. Curiosamente, sua arquitetura em formato de "M", visível em imagens aéreas, é uma homenagem à própria cidade de Montes Claros.
                            A construção do hospital “consolida um marco de integralidade e universalidade da assistência à saúde no norte de Minas” ressaltando o orgulho de oferecer este "presente" à comunidade, destacando-se como um hospital-escola inovador.
                            Seguindo em contínua expansão e ampliando sua capacidade oferece uma diversidade de serviços para atender ainda mais as demandas da região sendo uma instituição que “salvar vidas é uma das missões”.

                        </p>
                    </section>
                </div>

                <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 sm:px-5 lg:px-40 2xl:px-70 py-6 sm:py-6 lg:py-10 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                    <header className="mb-12 text-xl sm:text-xl xl:text-2xl 2xl:text-3xl text-white tracking-wide">
                        <h1 className="tracking-wider">Atendimento Humanizado</h1>
                        <h2 className="tracking-wider">Medicina Avançada para todos</h2>
                        <h1 className="mt-2 sm:mt-2 lg:mt-1 font-bold text-4xl sm:text-3xl xl:text-4xl 2xl:text-5xl">Conheça nossos princípios e valores</h1>
                    </header>
                    <div className="flex flex-col sm:flex-col gap-5 sm:gap-5 lg:gap-10 2xl:gap-5 lg:flex-row items-center justify-between">
                        <article className="h-fit w-full sm:w-full lg:w-1/3 2xl:w-[400px] sm:h-fit lg:h-[350px] 2xl:h-[400px] bg-white border border-gray-300 rounded-2xl p-5">
                            <header className="flex flex-row gap-2 text-2xl lg:text-xl 2xl:text-2xl font-semibold text-blue-600 items-center mb-5">
                                <FaBullseye className="bg-[#004688] text-white p-0.5 rounded-sm" />Visão
                            </header>
                            <p className="text-sm text-slate-800">Ser referência no atendimento humanizado e na assistência à saúde para todo o norte de Minas, sendo retaguarda para o Sistema Único de Saúde nos serviços da média e alta complexidade.</p>
                        </article>

                        <article className="h-fit w-full sm:w-full lg:w-1/3 sm:h-fit lg:h-[350px] 2xl:h-[400px] bg-white border border-gray-300 rounded-2xl p-5">
                            <header className="flex flex-row gap-2 text-2xl lg:text-xl 2xl:text-2xl font-semibold text-blue-600 items-center mb-5">
                                <FaCompass className="bg-[#004688] text-white p-0.5 rounded-sm" />Missão
                            </header>
                            <p className="text-sm text-slate-800">Prestar atendimento humanizado e de excelência à comunidade, praticando uma Medicina avançada para todos, com ações integradas de assistência social, saúde, ensino e pesquisa com vistas à melhoria da assistência à saúde, à educação no Norte de Minas.</p>
                        </article>
                        <article className="h-fit w-full sm:w-full lg:w-1/3 sm:h-fit lg:h-[350px] 2xl:h-[400px] bg-white border border-gray-300 rounded-2xl p-5">
                            <header className="flex flex-row gap-2 text-2xl lg:text-xl 2xl:text-2xl font-semibold text-blue-600 items-center mb-5">
                                <FaScaleBalanced className="bg-[#004688] text-white p-0.5 rounded-sm" />Valores
                            </header>
                            <p className="text-sm text-slate-800">
                                <ul className="space-y-1.5 text-md">
                                    <li>Postura Ética;</li>
                                    <li>Responsabilidade Social;</li>
                                    <li>Sustentabilidade;</li>
                                    <li>Profissionalismo;</li>
                                    <li>Respeito às diferenças;</li>
                                    <li>Transparência;</li>
                                    <li>Beneficência;</li>
                                    <li>Justiça.</li>
                                </ul>
                            </p>
                        </article>
                    </div>
                </div>

                <div className="py-6 sm:py-6 lg:py-10 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                    <header className="px-6 sm:px-6 lg:px-40 2xl:px-70 text-2xl lg:text-xl 2xl:text-3xl mb-2 sm:mb-2 lg:mb-8 tracking-wider text-blue-800">Nossa Estrutura</header>
                    <p className="mx-6 sm:mx-6 lg:mx-50 2xl:mx-70 mb-10 sm:mb-10 lg:mb-20 bg-blue-200 p-4 text-slate-800 rounded-xl">Ao longo de sua trajetória, o Hospital das Clínicas Doutor Mário Ribeiro da Silveira consolidou um processo de expansão contínua, acompanhando as necessidades de saúde da região norte-mineira. </p>
                    <div className="flex flex-col gap-5 sm:gap-5 lg:gap-0">


                        <div className="flex justify-center sm:justify-center lg:justify-start items-center w-full bg-blue-300 px-6 sm:px-6 lg:px-40 2xl:px-70 py-4 sm:py-6 lg:py-2">
                            <div className=" gap-3 flex flex-col sm:flex-col lg:flex-row relative">
                                <div className="bg-gray-300 lg:-translate-y-8 w-full sm:w-full h-[300px] lg:h-[225px] 2xl:h-[300px] lg:w-1/4 rounded-3xl overflow-hidden">
                                    <img src={Img3} className="w-full h-full object-cover brightness-90" />
                                </div>
                                <div className="bg-gray-300 lg:translate-y-8 w-full sm:w-full h-[300px] lg:h-[225px] 2xl:h-[300px] lg:w-1/4 rounded-3xl overflow-hidden">
                                    <img src={Img4} className="w-full h-full object-cover brightness-90" />
                                </div>
                                <div className="bg-gray-300 lg:-translate-y-8 w-full sm:w-full h-[300px] lg:h-[225px] 2xl:h-[300px] lg:w-1/4 rounded-3xl overflow-hidden">
                                    <img src={Img5} className="w-full h-full object-cover object-[0%] brightness-90" />
                                </div>
                                <div className="bg-gray-300 lg:translate-y-8 w-full sm:w-full h-[300px] lg:h-[225px] 2xl:h-[300px] lg:w-1/4 rounded-3xl overflow-hidden">
                                    <img src={Img6} className="w-full h-full object-cover brightness-90" />
                                </div>
                            </div>

                        </div>
                        <div className="w-full sm:w-full flex justify-center items-center  px-6 sm:px-6 lg:px-50 2xl:px-70 ">
                            <p className="text-slate-800">
                                <p className="text-blue-800 text-2xl mt-10 sm:mt-10 lg:mt-20 mb-3 ">Atualmente, a instituição possui capacidade instalada para 300 leitos, dos quais 253 encontram-se em funcionamento.</p> Desses, 208 leitos são credenciados e disponibilizados de forma exclusiva ao Sistema Único de Saúde (SUS), reafirmando o compromisso com a assistência pública e universal.
                                Esses números refletem o crescimento histórico do hospital, que, desde sua inauguração, tem ampliado gradualmente sua estrutura física e tecnológica, garantindo mais acesso, resolutividade e qualidade no atendimento à população.
                            </p>
                        </div>
                    </div>


                </div>
            </main>
        </>
    )
};

export default About;

/*
                        <article className="h-fit w-full sm:w-full lg:w-[400px] sm:h-fit lg:h-[350px] 2xl:h-[400px] bg-white border border-gray-300 rounded-2xl p-5 flex flex-col">
                            <header className="flex flex-row gap-2 text-2xl lg:text-xl 2xl:text-2xl font-semibold text-blue-600 items-center mb-5">
                                <FaHospital className="bg-blue-600 text-white p-0.5 rounded-sm" />Estrutura
                            </header>
                            <p className="text-sm text-slate-700">O HC possui 300 leitos divididos em três pavimentos. Neles estão os serviços ambulatoriais, salas cirúrgicas, centro de referência em oftalmologia, centro de terapia intensiva, maternidade, clínica médica, cirurgia geral, ginecologia, ortopedia e traumatologia, consultas especializadas, exames laboratoriais e de imagem, pediatria e bloco obstétrico.</p>
                            <extra className="mt-auto text-slate-800 text-base lg:text-sm 2xl:text-base">
                                <h3 className="lg:text-md 2xl:text-lg tracking-wide text-blue-800">Somos referência em</h3>
                                <p>Oftalmologia</p>
                                <p>Maternidade</p>
                                <p>Cirurgias Eletivas</p>
                                <p>Cirurgia Robótica</p>
                                <p className="text-sm lg:text-xs 2xl:text-sm text-slate-600 italic">E muitas outras especialidades</p>
                            </extra>
                        </article>
*/