'use client';
import Footer from "../../Layout/Footer";
import Navbar from "../../Layout/Navbar";
import React, { useState, useEffect } from 'react';

const page = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

   useEffect(() => {
       const handleScroll = () => {
         setIsScrolled(window.scrollY > 50);
   
         const sections = ['inicio', 'historia', 'productos', 'marcas', 'ccu', 'contacto'];
         const current = sections.find(section => {
           const element = document.getElementById(section);
           if (element) {
             const rect = element.getBoundingClientRect();
             return rect.top <= 100 && rect.bottom >= 100;
           }
           return false;
         });
         if (current) setActiveSection(current);
       };
       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll);
     }, []);
   
     const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
       e.preventDefault();
       const element = document.getElementById(targetId);
       if (element) {
         const navbarHeight = 80; // Ajusta este valor según la altura de tu navbar
         const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
         const offsetPosition = elementPosition - navbarHeight;
         
         window.scrollTo({
           top: offsetPosition,
           behavior: 'smooth'
         });
         setMobileMenuOpen(false);
       }
     };


    return <div className="min-h-screen bg-white">
        <Navbar isScrolled={isScrolled} activeSection={activeSection} smoothScroll={smoothScroll} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 min-h-screen">
        <br /><br />
            {/* Título */}
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Conocer Más</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#2166b0] to-[#76c043]"></div>
            </div>

            {/* Grid de logos - Más pequeños y centrados */}
            <div className="flex justify-center mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
                    {/* Logo CCU */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#2166b0] to-[#76c043] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300"></div>
                        <div className="relative bg-white p-6 sm:p-8 border border-gray-200 group-hover:border-[#2166b0] transition-all duration-300 hover:shadow-xl rounded-lg h-full flex items-center justify-center">
                            <div className="w-full max-w-[250px] sm:max-w-[300px]">
                                <img
                                    src="assets/CCU.png"
                                    alt="CCU Logo"
                                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo ADO */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#76c043] to-[#2166b0] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300"></div>
                        <div className="relative bg-white p-6 sm:p-8 border border-gray-200 group-hover:border-[#76c043] transition-all duration-300 hover:shadow-xl rounded-lg h-full flex items-center justify-center">
                            <div className="w-full max-w-[250px] sm:max-w-[300px]">
                                <img
                                    src="assets/ADOlogo.png"
                                    alt="ADO Logo"
                                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido de texto */}
            <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                    En CCU nos apasiona crear experiencias para compartir juntos un mejor vivir.
                    Con una amplia gama de bebidas y experiencias, mejoramos y acompañamos distintos 
                    momentos de la vida, guiados por nuestros principios, en beneficio de las personas 
                    con las cuales nos relacionamos y el cuidado del medioambiente.
                </p>
                
                <p className="text-gray-700 leading-relaxed text-lg">
                    Es una de las compañías de bebidas más importante del país, la segunda más grande 
                    del mercado cervecero argentino, líder en el mercado y un actor relevante en licores, 
                    destilados y vinos.
                    Elabora y comercializa las marcas de cerveza Schneider, Heineken, Imperial, Miller, Amstel, Sol, Grolsch, Warsteiner, Isenbeck, Salta, Santa Fe, Córdoba, Palermo e Iguana. 
                    Es una distribuidora exclusiva en la Argentina de Kunstmann.
                </p>
            </div>

            {/* Botón */}
            <div className="mt-12">
                <button
                    onClick={(e) => smoothScroll(e, 'contacto')}
                    className="px-8 py-3 bg-[#2166b0] text-white hover:bg-[#1a5490] transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:shadow-lg rounded"
                >
                    Contactar con nosotros
                </button>
            </div>
        </div>
        
        <Footer smoothScroll={smoothScroll} />
    </div>;
}

export default page;