import Logo from '../../assets/Logo-Hc.png';
import { NavLink } from 'react-router-dom';
import {
    FaBars, FaHouse, FaPerson, FaBuildingColumns,
    FaBabyCarriage, FaPhoneFlip, FaGraduationCap, FaBookMedical
} from "react-icons/fa6";
import { useState, useRef, useEffect } from 'react';

const Navbar = ({ onHeightChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const headerRef = useRef(null);

    const instituteRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                instituteRef.current &&
                !instituteRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Notificar o componente pai sobre mudanças na altura
    useEffect(() => {
        const updateHeight = () => {
            if (headerRef.current && onHeightChange) {
                onHeightChange(headerRef.current.offsetHeight);
            }
        };

        updateHeight();
        
        // Atualizar quando a janela for redimensionada
        window.addEventListener('resize', updateHeight);
        
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [isOpen, onHeightChange]);

    return (
        <>
            <header 
                ref={headerRef}
                className="fixed top-0 left-0 right-0 flex flex-col sm:flex-col lg:flex-row w-full items-center justify-around p-0 sm:p-0 lg:p-3 2xl:p-5 border-b border-gray-200 bg-white z-50"
            >
                <div className="flex flex-row w-full sm:w-full lg:w-auto items-center justify-between p-5 sm:p-5 lg:p-0">
                    <button className='text-blue-900 text-4xl block sm:block lg:hidden active:scale-110 cursor-pointer transition-all' onClick={toggleMenu}>
                        <FaBars />
                    </button>
                    <img src={Logo} className='w-[150px] lg:w-[130px] 2xl:w-[150px] cursor-pointer' />
                </div>
                <nav className="w-full sm:w-full lg:w-auto shadow-md shadow-black/10 sm:shadow-md sm:shadow-black/10 lg:shadow-none relative">
                    <ul className={`
                        ${isOpen ? 'max-h-screen' : 'max-h-0'}
                        flex flex-col sm:flex sm:flex-col lg:flex lg:flex-row
                        gap-0 sm:gap-0 lg:gap-5 2xl:gap-7
                        text-md lg:text-md 2xl:text-lg text-blue-950 font-normal
                        transition-all duration-500 ease-out
                        
                        /* Comportamento mobile: menu fora do fluxo */
                        absolute lg:static top-full left-0 z-40 bg-white

                        /* Tamanhos */
                        w-full sm:w-full lg:w-auto
                        overflow-hidden lg:overflow-visible
                        lg:max-h-full lg:h-fit
                        shadow-md lg:shadow-none
                    `}>
                        <NavLink to='/' onClick={toggleMenu}>
                            <li className="w-full p-4 sm:p-4 lg:p-0 border-t sm:border-t lg:border-t-0 border-gray-200 sm:w-full lg:w-auto hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between xl:gap-1 2xl:gap-1.5">
                                Home <FaHouse />
                            </li>
                        </NavLink>

                        <li ref={instituteRef} className="w-full sm:w-full lg:w-auto border-t sm:border-t lg:border-t-0 border-gray-200 lg:relative">
                            <div
                                className="w-full p-4 sm:p-4 lg:p-0 hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between gap-1.5"
                                onClick={() => toggleDropdown('institute')}
                            >
                                <span>Institucional</span> <FaBuildingColumns />
                            </div>

                            <ul className={`
                                bg-white text-sm lg:rounded-lg lg:shadow-md 
                                w-full sm:w-full lg:w-[200px] lg:border-gray-200
                                lg:absolute 
                                lg:left-0 z-50 text-nowrap 
                                transition-all duration-300 ease-in-out
                                ${openDropdown === 'institute' ? 'max-h-96 lg:border' : 'max-h-0'} 
                                overflow-hidden
                            `}>
                                <NavLink to="/about" onClick={() => { toggleMenu(); setOpenDropdown(null); }}>
                                    <li className="px-4 py-3 hover:bg-gray-100 text-blue-950 lg:px-4 lg:py-3 sm:pl-8">Quem Somos</li>
                                </NavLink>
                                <NavLink to="/despesas" onClick={() => { toggleMenu(); setOpenDropdown(null); }}>
                                    <li className="px-4 py-3 hover:bg-gray-100 text-blue-950 lg:px-4 lg:py-3 sm:pl-8">Execução de Despesas</li>
                                </NavLink>
                            </ul>
                        </li>

                        <NavLink to='/corpoclinico' onClick={toggleMenu}>
                            <li className="w-full p-4 sm:p-4 lg:p-0 border-t sm:border-t lg:border-t-0 border-gray-200 sm:w-full lg:w-auto hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between gap-1.5">
                                Corpo Clínico <FaPerson />
                            </li>
                        </NavLink>

                        <NavLink to='/services' onClick={toggleMenu}>
                            <li className="w-full p-4 sm:p-4 lg:p-0 border-t sm:border-t lg:border-t-0 border-gray-200 sm:w-full lg:w-auto hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between gap-1.5">
                                Serviços <FaBookMedical />
                            </li>
                        </NavLink>

                        <NavLink to='/maternity' onClick={toggleMenu}>
                            <li className="w-full p-4 sm:p-4 lg:p-0 border-t sm:border-t lg:border-t-0 border-gray-200 sm:w-full lg:w-auto hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between gap-1.5">
                                Maternidade <FaBabyCarriage />
                            </li>
                        </NavLink>

                        <NavLink to='/academic' onClick={toggleMenu}>
                            <li className="w-full p-4 sm:p-4 lg:p-0 border-t sm:border-t lg:border-t-0 border-gray-200 sm:w-full lg:w-auto hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between gap-1.5">
                                Acadêmico <FaGraduationCap />
                            </li>
                        </NavLink>

                        <NavLink to='/contact' onClick={toggleMenu}>
                            <li className="w-full p-4 sm:p-4 lg:p-0 border-t sm:border-t lg:border-t-0 border-gray-200 sm:w-full lg:w-auto hover:scale-107 cursor-pointer transition-all flex flex-row items-center justify-between gap-1.5">
                                Fale Conosco <FaPhoneFlip />
                            </li>
                        </NavLink>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Navbar;