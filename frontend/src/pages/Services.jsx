import HealthPlans from "../components/services/HealthPlans";
import Specialties from "../components/services/Specialties";
import { useEffect, useState } from "react";

const Services = () => {
    const [isTransitioning, setTransition] = useState(false);

    useEffect(() => {
        setTransition(true)
    }, [])

    return (
        <>
            <main className={`flex flex-col w-full justify-center transition-opacity delay-200 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
                <div className="mt-0 sm:mt-0 lg:mt-10 p-5 lg:p-4 2xl:p-5 rounded-0 sm:rounded-0 lg:rounded-2xl bg-blue-200 mx-0 sm:mx-0 lg:mx-40 2xl:mx-70 w-full sm:w-full lg:w-9/12 self-center" data-aos="fade-down">
                    <header>
                        <h1 className="text-3xl lg:text-2xl 2xl:text-3xl font-semibold text-slate-700 flex flex-row items-center gap-2 mb-2 tracking-wide">
                            Serviços
                        </h1>
                        <p className="text-slate-600 text-md lg:text-sm 2xl:text-md">
                            Localizado no bairro Amazonas, o HC é o maior centro de saúde do Norte de Minas, oferecendo especialidades médicas de média e alta complexidade. Destaca-se por cirurgias oftalmológicas, plásticas, eletivas, robóticas e partos humanizados, além de uma maternidade moderna e uma equipe altamente qualificada, comprometida com a valorização da vida.
                        </p>
                    </header>
                </div>
                <Specialties />
                <HealthPlans data-aos="fade-up" data-aos-delay="100" />
            </main>
        </>
    )
}

export default Services;