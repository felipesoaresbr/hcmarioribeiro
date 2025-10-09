import { FaRegCreditCard } from "react-icons/fa6";
import PlanCard from "../PlanCard";

const HealthPlans = () => {
    const convenios = ["unimed", "sulamerica", "saolucas", "ipsm", "ipsemg", "hapvida", "fundaffemg", "bradescosaude", "aurora"];
    const descricaoConvenios = {
        unimed: "Unimed",
        sulamerica: "Sulamérica",
        saolucas: "São Lucas",
        ipsm: "IPSM",
        ipsemg: "IPSEMG",
        hapvida: "Hapvida",
        fundaffemg: "FUNDAFFEMG",
        bradescosaude: "Saúde Bradesco",
        aurora: "Aurora Saúde"
    };

    return (
        <>
            <main className="py-10 px-6 sm:px-6 lg:px-50 2xl:px-70 w-full border-t-0 sm:border-t-0 lg:border-t border-gray-300 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                <header className="mb-10 lg:mb-12 2xl:mb-10">
                    <h1 className="text-xl font-semibold text-blue-800 flex flex-row items-center gap-2">
                        <FaRegCreditCard className="text-gray-50 bg-[#004688] p-1 rounded-sm" /> Convênios
                    </h1>
                    <h2 className="text-slate-600 text-sm">
                        Veja os convênios disponíveis:
                    </h2>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-8 lg:gap-5 2xl:gap-15 border border-gray-300 p-10 place-items-center w-full sm:w-full lg:w-4/6 2xl:w-3/6 self-center rounded-2xl">
                    {convenios.map((convenio, index) => (
                        <PlanCard key={index} nome={convenio} descricao={descricaoConvenios[convenio]} />
                    ))}
                </div>

            </main>
        </>
    )
};

export default HealthPlans;