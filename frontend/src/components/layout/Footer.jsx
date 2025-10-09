import { IoLocationOutline } from "react-icons/io5";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";
import Logo from '../../assets/Logotipo.png';

const Footer = () => {
    return (
        <>
            <footer className="h-auto sm:h-auto lg:h-[250px] bg-gradient-to-t from-blue-100 to-blue-200 px-5 sm:px-5 lg:px-40 2xl:px-70 pt-8 pb-4 border-t border-blue-300 text-slate-800 flex flex-col">
                <div className="gap-5 sm:gap-5 lg:gap-0 flex flex-col sm:flex-col lg:flex-row items-center justify-between h-full w-full">
                    <div className="h-full w-full sm:w-full lg:w-1/3 flex sm:flex justify-center items-center lg:block">
                        <img src={Logo} className="w-[140px] sm:w-[120px] lg:w-[200px] 2xl:w-[240px]" />
                    </div>
                    <div className="h-full text-xl lg:text-lg 2xl:text-xl w-full sm:w-full lg:w-1/3 flex items-center flex-col">
                        <p className="tracking-wide">Redes Sociais:</p>
                        <div className="flex flex-row gap-5 text-3xl sm:text-3xl 2xl:text-4xl mt-1">
                            <a href="https://www.youtube.com/@hospitaldasclinicasdr.mari7600" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="hover:scale-110 transition-all duration-100" />
                            </a>
                            <a href="https://www.instagram.com/hcmarioribeiro/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="hover:scale-110 transition-all duration-100" />
                            </a>
                            <a href="https://www.facebook.com/hcmarioribeiro/?locale=pt_BR" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="hover:scale-110 transition-all duration-100" />
                            </a>
                        </div>
                    </div>
                    <div className="h-full w-full sm:w-full lg:w-1/3 text-right">
                        <div className="flex flex-col text-md sm:text-md lg:text-md 2xl:text-lg mb-2 sm:mb-2 lg:mb-4 pb-2 items-center sm:items-center lg:items-end">
                            <span className="flex flex-row items-center gap-1">
                                <IoLocationOutline className="h-5 w-5" /> Rua Plínio Ribeiro, 539
                            </span>

                            Jardim Brasil.
                            Montes Claros, MG <br className="hidden sm:hidden lg:block" />CEP: 39401-222
                        </div>
                        <div className="flex flex-col text-md lg:text-sm 2xl:text-md items-center sm:items-center lg:items-end pb-6 sm:pb-6 lg:pb-0">
                            <span className="flex flex-row items-center gap-1 tracking-wide font-semibold text-lg lg:text-md 2xl:text-lg">
                                <BsTelephone /> Central de Atendimento
                            </span> (38) 3218-8150
                        </div>
                    </div>
                </div>
                <span className="border-t sm:border-t lg:border-t-0 pt-3 sm:pt-3 lg:pt-0 border-blue-300 text-sm lg:text-xs 2xl:text-sm flex-col sm:flex-col flex lg:flex-row items-center justify-between text-center">Copyright © 2015-2025 Todos os direitos reservados ao Hospital das Clínicas Dr.Mário Ribeiro<span className="mt-3 sm:mt-3 lg:mt-0">Desenvolvido por Felipe Soares</span></span>

            </footer>
        </>
    )
}

export default Footer;