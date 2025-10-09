import Vector1 from '../assets/vectors/undraw_expecting_j6le.svg';
import Vector2 from '../assets/vectors/undraw_family_6gj8.svg';

const Maternity = () => {
    return (
        <>
            <main className="pt-10 h-fit" data-aos="fade-down" data-aos-delay="100">
                <h1 className="tracking-wider text-3xl lg:text-2xl px-5 sm:px-5 lg:px-40 2xl:px-70 2xl:text-3xl flex flex-row justify-between items-center mb-8 text-blue-800">Maternidade</h1>
                <p className="text-slate-800 mb-10 px-5 sm:px-5 lg:px-40 2xl:px-70">
                    A maternidade do Hospital das Clínicas Doutor Mário Ribeiro da Silveira é referência em qualidade, acolhimento e segurança, reunindo estrutura moderna e atendimento humanizado para tornar o nascimento um momento único e especial. Com ambientes planejados para oferecer conforto às gestantes e seus familiares, o hospital dispõe de um Centro de Parto Normal equipado com banheira para parto humanizado, possibilitando experiências de nascimento mais naturais e respeitosas, de acordo com as escolhas da mulher.
                    <br /><br />Um dos grandes diferenciais da maternidade é contar com a retaguarda de uma UTI Neonatal dentro da instituição, garantindo suporte imediato e especializado aos recém-nascidos que necessitem de cuidados intensivos, sem a necessidade de transferência para outra unidade. Essa estrutura integrada fortalece a segurança e a tranquilidade das famílias.
                    O corpo clínico é formado por profissionais altamente qualificados, com médicos obstetras, pediatras de sala de parto e enfermeiros obstetras presentes 24 horas por dia, possuindo uma escala completa de profissionais garante que cada nascimento seja acompanhado com dedicação, técnica e humanidade, assegurando assistência contínua, segura e de excelência.

                </p>
                <div className='px-5 sm:px-5 lg:px-40 2xl:px-70 flex flex-col sm:flex-col lg:flex-row items-center gap-9 sm:gap-9 lg:gap-15 bg-gray-100 border-y border-gray-300 py-10'>
                    <img src={Vector1} className="w-[220px] sm:[220px] lg:w-[270px]" />
                    <img src={Vector2} className="w-[220px] sm:[220px] lg:w-[270px]" />
                    <p className="text-blue-800 tracking-wide text-xl">Mais do que uma maternidade, o HCMR se destaca por oferecer um modelo de cuidado que valoriza a vida, respeita as escolhas maternas e assegura o melhor início para a jornada de cada criança, reafirmando seu compromisso com a saúde e o bem-estar das famílias do Norte de Minas.</p>
                </div>
            </main>
        </>
    )
};

export default Maternity;