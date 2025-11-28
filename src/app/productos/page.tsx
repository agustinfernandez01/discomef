'use client';
import Navbar from "@/Layout/Navbar";
import Footer from "@/Layout/Footer";
import React, { useState, useEffect } from "react";

const productos = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const [currentSlide, setCurrentSlide] = useState(0);

    const brandLogos = [
        { name: "Graffigna" , image: "/assets/Vinos/graffigna.png" },
        { name: "Bodegas Colon" , image: "/assets/Vinos/bodegascolon.png" },
        { name: "0-61" , image: "/assets/Vinos/0-61.JPG" },
        { name: "Full Sport" , image: "/assets/Isotonicas/fullsport.jpeg" },
        { name: "Salta Cautiva" , image: "/assets/Cervezas/saltacautiva.png" },
        { name: "Iguana" , image: "/assets/Cervezas/iguana.png" },
        { name: "Basteiner" , image: "/assets/Cervezas/basteiner.png" },
        { name: "Gelish" , image: "/assets/Cervezas/gelish.png" },
        { name: "Blue Moon" , image: "/assets/Cervezas/bluemoon.png" },
        { name : "Pehuenia" , image: "/assets/Cidras/pehuenia.png" },
        { name: 'Norte', image: '/assets/Cervezas/norte.png' },
        { name: 'Heineken', image: '/assets/Cervezas/heineken.png' },
        { name: 'Imperial', image: '/assets/Cervezas/imperial.png' },
        { name: 'Villavicencio', image: '/assets/AguasPyS/villavicencio.png' },
        { name: 'Salta', image: '/assets/Cervezas/salta.png' },
        { name: 'Levite', image: '/assets/AguasPyS/levite.png' },
        { name: 'Colón', image: '/assets/Vinos/colon.png' },
        { name: 'La Celia', image: '/assets/Vinos/lacelia.png' },
        { name: '1888', image: '/assets/Cidras/1888.png' },
        { name: 'Miller', image: '/assets/Cervezas/miller.png' },
        { name: 'Schneider', image: '/assets/Cervezas/schneider.png' },
        { name: 'Amstel', image: '/assets/Cervezas/amstelpremium.png' },
        { name: 'Villa del Sur', image: '/assets/AguasPyS/villadelsur.png' },
        { name: 'Brío', image: '/assets/AguasPyS/brio.png' },
        { name: 'La Victoria', image: '/assets/Cidras/lavictoria.png' },
        { name: 'Real', image: '/assets/Cidras/real.png' },
        { name: 'Mistral', image: '/assets/Piscos/mistral.png' },
        { name: 'El Abuelo', image: '/assets/Piscos/elabuelo.png' },
    ];

    // 👉 Arrays que marcan el orden deseado
    const cervezaOrder = [
        'Norte',
        'Heineken',
        'Imperial',
        'Salta',
        'Miller',
        'Schneider',
        'Amstel',
        // resto...
        'Salta Cautiva',
        'Iguana',
        'Basteiner',
        'Gelish',
        'Blue Moon',
    ];

    const vinosOrder = [
        'La Celia',   // primero
        'Colón',
        'Bodegas Colon',
        '0-61',
        'Graffigna',  // último
    ];

    // 👉 Función genérica para ordenar según un array de nombres
    const sortByOrder = (order: string[]) => {
        return (a: { name: string }, b: { name: string }) =>
            order.indexOf(a.name) - order.indexOf(b.name);
    };

    const categories = [
        {
            name: 'CERVEZAS',
            brands: brandLogos
                .filter(b => cervezaOrder.includes(b.name))
                .sort(sortByOrder(cervezaOrder)),
            color: '#2166b0'
        },
        {
            name: 'AGUAS PURAS Y SABORIZADAS',
            brands: brandLogos.filter(b => ['Villavicencio', 'Levite', 'Villa del Sur', 'Brío'].includes(b.name)),
            color: '#76c043'
        },
        {
            name: 'VINOS',
            brands: brandLogos
                .filter(b => vinosOrder.includes(b.name))
                .sort(sortByOrder(vinosOrder)),
            color: '#2166b0'
        },
        {
            name: 'SIDRAS',
            brands: brandLogos.filter(b => ['1888', 'La Victoria', 'Real', 'Pehuenia'].includes(b.name)),
            color: '#76c043'
        },
        {
            name: 'GENEROSOS Y APERITIVOS',
            brands: brandLogos.filter(b => ['Mistral', 'El Abuelo'].includes(b.name)),
            color: '#2166b0'
        },
        {
            name: 'ISOTÓNICAS',
            brands: brandLogos.filter(b => ['Full Sport'].includes(b.name)),
            color: '#76c043'
        }
    ];

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
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setMobileMenuOpen(false);
        }
      };

    return (
      <div className="bg-white">
        <Navbar
          isScrolled={isScrolled}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection={activeSection}
          smoothScroll={smoothScroll}
        />

        <div className="pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-20 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-[#2166b0]/10 to-[#76c043]/10 rounded-full blur-3xl -z-10"></div>

              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-3 tracking-tight">
                PRODUCTOS Y CATEGORIAS
              </h1>
              <br />

              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#2166b0]"></div>
                <div className="h-1 w-1 rounded-full bg-[#2166b0]"></div>
                <div className="h-px w-24 bg-gradient-to-r from-[#2166b0] via-[#76c043] to-[#2166b0]"></div>
                <div className="h-1 w-1 rounded-full bg-[#76c043]"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#76c043]"></div>
              </div>
            </div>

            {/* Categorías de Productos */}
            <div className="space-y-16">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="mb-8">
                    <h2 className="text-3xl font-light mb-2" style={{ color: category.color }}>
                      {category.name}
                    </h2>
                    <div
                      className="h-0.5 w-24"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {category.brands.map((brand, brandIndex) => (
                      <div
                        key={brandIndex}
                        className="aspect-square border border-gray-200 flex items-center justify-center p-6 hover:border-[#2166b0] transition-all duration-300 bg-white group hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer
          smoothScroll={(e, targetId) => {
            e.preventDefault();
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>
    );
};

export default productos;
