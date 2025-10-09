import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RootLayout = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const handleNavbarHeightChange = (height) => {
        setNavbarHeight(height);
    };

    return (
        <main className="min-h-screen max-w-screen overflow-x-hidden bg-gray-50 poppins no-scrollbar flex flex-col">
            <Navbar onHeightChange={handleNavbarHeightChange} />
            <div className="flex-1" style={{ marginTop: `${navbarHeight}px` }}>
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};

export default RootLayout;