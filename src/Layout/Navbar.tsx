'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 🔹 NUEVO

type NavbarProps = {
  isScrolled: boolean;
  activeSection: string;
  smoothScroll: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  isScrolled,
  activeSection,
  smoothScroll,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) => {
  const router = useRouter(); // 🔹 NUEVO

  // Handler para links que pueden venir desde otra página
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (window.location.pathname === '/') {
      smoothScroll(e, sectionId); // tu función ya hace preventDefault
    }
    // Si NO estoy en "/", dejo que el <Link> navegue normal a "/#sectionId"
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="assets/discomeflogo.png"
                alt="DISCOMEF"
                className="h-26 w-auto object-contain transition-transform hover:scale-105 duration-300"
              />
            </div>

            {/* Menu Desktop - Centrado */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link
                href="/"
                className={`text-sm font-medium transition-all duration-300 hover:text-[#2166b0] ${activeSection === 'inicio'
                    ? 'text-[#2166b0]'
                    : 'text-gray-900'
                  }`}
              >
                INICIO
              </Link>

              <Link
                href="/#historia"
                onClick={(e) => handleSectionClick(e, 'historia')}
                className={`text-sm font-medium transition-all duration-300 hover:text-[#2166b0] ${activeSection === 'historia'
                    ? 'text-[#2166b0]'
                    : 'text-gray-900'
                  }`}
              >
                HISTORIA
              </Link>

              <a
                href="/#productos"
                onClick={(e) => smoothScroll(e, 'productos')}
                className={`text-sm font-medium transition-all duration-300 hover:text-[#2166b0] ${activeSection === 'productos'
                    ? 'text-[#2166b0]'
                    : 'text-gray-900'
                  }`}
              >
                PRODUCTOS
              </a>

              <Link
                href="/#ccu"
                onClick={(e) => handleSectionClick(e, 'ccu')}
                className={`text-sm font-medium transition-all duration-300 hover:text-[#2166b0] ${activeSection === 'ccu'
                    ? 'text-[#2166b0]'
                    : 'text-gray-900'
                  }`}
              >
                CCU
              </Link>
            </div>

            {/* Botón de Contacto */}
            <div className="hidden md:flex items-center">
              <button
                onClick={(e) => smoothScroll(e, 'contacto')}
                className="px-6 py-2.5 bg-[#2166b0] text-white text-sm font-medium rounded hover:bg-[#1a5490] transition-all duration-300 transform hover:scale-105"
              >
                Contacto
              </button>
            </div>

            {/* Menú Móvil */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-900" />
              ) : (
                <Menu size={24} className="text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {/* INICIO MOBILE */}
              <Link
                href="/#inicio"
                onClick={(e) => {
                  const pathname =
                    typeof window !== 'undefined' ? window.location.pathname : '/';

                  if (pathname === '/') {
                    // Ya estoy en el home → scroll suave a la sección
                    smoothScroll(e, 'inicio');
                  } else if (
                    pathname === '/productos' ||
                    pathname === '/conocermas'
                  ) {
                    // Estoy en /productos o /conocermas → ir al home y a #inicio
                    e.preventDefault();
                    router.push('/#inicio');
                  } else {
                    // Cualquier otra ruta → igual, ir a home #inicio
                    e.preventDefault();
                    router.push('/#inicio');
                  }

                  setMobileMenuOpen(false);
                }}
                className="block text-gray-900 hover:text-[#2166b0] text-sm font-medium"
              >
                INICIO
              </Link>

              {/* HISTORIA móvil */}
              <Link
                href="/#historia"
                onClick={(e) => {
                  const pathname =
                    typeof window !== 'undefined' ? window.location.pathname : '/';

                  if (pathname === '/') {
                    smoothScroll(e, 'historia');
                  } else {
                    e.preventDefault();
                    router.push('/#historia');
                  }

                  setMobileMenuOpen(false);
                }}
                className="block text-gray-900 hover:text-[#2166b0] text-sm font-medium"
              >
                HISTORIA
              </Link>

              <a
                href="#productos"
                onClick={(e) => {
                  const pathname =
                    typeof window !== 'undefined' ? window.location.pathname : '/';

                  if (pathname === '/') {
                    smoothScroll(e, 'productos');
                  } else {
                    e.preventDefault();
                    router.push('/#productos');
                  }

                  setMobileMenuOpen(false);
                }}
                className="block text-gray-900 hover:text-[#2166b0] text-sm font-medium"
              >
                PRODUCTOS
              </a>

              {/* CCU móvil */}
              <Link
                href="/#ccu"
                onClick={(e) => {
                  const pathname =
                    typeof window !== 'undefined' ? window.location.pathname : '/';

                  if (pathname === '/') {
                    smoothScroll(e, 'ccu');
                  } else {
                    e.preventDefault();
                    router.push('/#ccu');
                  }

                  setMobileMenuOpen(false);
                }}
                className="block text-gray-900 hover:text-[#2166b0] text-sm font-medium"
              >
                CCU
              </Link>

              <button
                onClick={(e) => {
                  const pathname =
                    typeof window !== 'undefined' ? window.location.pathname : '/';

                  if (pathname === '/') {
                    smoothScroll(e, 'contacto');
                  } else {
                    e.preventDefault();
                    router.push('/#contacto');
                  }

                  setMobileMenuOpen(false);
                }}
                className="w-full px-6 py-2.5 bg-[#2166b0] text-white text-sm font-medium rounded hover:bg-[#1a5490] transition-all duración-300"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
