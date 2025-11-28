'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Phone, Mail, MapPin, Award, TrendingUp, Users } from 'lucide-react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

const BebidasLanding: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['inicio', 'historia', 'productos', 'marcas', 'ccu', 'contacto'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // 🔹 Lógica extra: intentar autoplay del video SOLO en mobile
    const isMobile =
      typeof window !== 'undefined' &&
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const video = document.querySelector('#inicio video') as HTMLVideoElement | null;

      if (video) {
        // requisito para autoplay en mobile
        video.muted = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('No se pudo hacer autoplay en mobile:', err);
          });
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Altura aproximada del navbar (ajustá a gusto)
    const offset = 100;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };


  const brandLogos = [
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
    { name: 'Real', image: '/assets/Cidras/real.png' }
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(brandLogos.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }

        .gradient-border {
          position: relative;
        }

        .gradient-border::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2166b0, #76c043);
          transition: width 0.3s ease;
        }

        .gradient-border:hover::after {
          width: 100%;
        }
      `}</style>

      {/* NAVBAR */}
      <Navbar isScrolled={isScrolled} activeSection={activeSection} smoothScroll={smoothScroll} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <section id="inicio" className="pt-20 pb-20">
        <div className="w-full">
          <div
            className="relative w-full overflow-hidden animate-fadeInUp"
            style={{ height: '70vh', minHeight: '500px', maxHeight: '800px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10 pointer-events-none"></div>

            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
            >
              <source
                src="assets/Video/discomefvideo.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      </section>

      {/* Ubicaciones Section */}
      <section className="py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tucumán */}
            <div className="text-center p-10 bg-[#2166b0]/5 hover:bg-[#2166b0]/10 transition-colors duration-300 rounded-lg">
              <div className="text-3xl font-light text-[#2166b0] mb-1">TUCUMÁN</div>
              <div className="text-xs text-gray-600">Islas Malvinas s/n - Colombres (4111) - Cruz Alta</div>
            </div>

            {/* Catamarca */}
            <div className="text-center p-10 bg-[#76c043]/5 hover:bg-[#76c043]/10 transition-colors duration-300 rounded-lg">
              <div className="text-3xl font-light text-[#76c043] mb-1">CATAMARCA</div>
              <div className="text-xs text-gray-600">Av A Villafañe 2121 - S.F Del Valle de Catamarca (4700)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section id="historia" className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Nuestra Historia</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#2166b0] to-[#76c043]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-[#2166b0]/20">
                <div className="absolute left-0 top-0 w-4 h-4 bg-[#2166b0] rounded-full transform -translate-x-[9px]"></div>
                <div className="mb-2 text-sm font-medium text-[#2166b0]">1960 - Los Inicios</div>
                <p className="text-gray-600 leading-relaxed">
                  Vicente y Ernesto Evangelista comenzaron en el barrio de Villa Urquiza en Buenos Aires con una pequeña distribución del Grupo Peñaflor, sentando las bases de lo que hoy es DISCOMEF SRL.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-[#76c043]/20">
                <div className="absolute left-0 top-0 w-4 h-4 bg-[#76c043] rounded-full transform -translate-x-[9px]"></div>
                <div className="mb-2 text-sm font-medium text-[#76c043]">2003 - Crecimiento Estratégico</div>
                <p className="text-gray-600 leading-relaxed">
                  Pasamos a formar parte de la red de Distribuidores oficiales de CCU y DANONE en Argentina, consolidando nuestra presencia en Buenos Aires y expandiendo constantemente nuestros territorios.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-[#2166b0]/20">
                <div className="absolute left-0 top-0 w-4 h-4 bg-[#2166b0] rounded-full transform -translate-x-[9px]"></div>
                <div className="mb-2 text-sm font-medium text-[#2166b0]">2023 - Expansión al Norte</div>
                <p className="text-gray-600 leading-relaxed">
                  CCU en conjunto con ADO nos otorgaron la oportunidad de expandir nuestros negocios al norte argentino, <span className='text-gray font-semibold'> tomando la distribución oficial de Tucumán y Catamarca. Así nace DISCOMEF SRL. </span>
                </p>
              </div>

              {/* Estadísticas debajo de la línea de tiempo */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-[#2166b0]/5 hover:bg-[#2166b0]/10 transition-colors duration-300 rounded-lg">
                  <div className="text-3xl font-light text-[#2166b0] mb-1">65+</div>
                  <div className="text-xs text-gray-600">Años de experiencia</div>
                </div>
                <div className="text-center p-4 bg-[#76c043]/5 hover:bg-[#76c043]/10 transition-colors duration-300 rounded-lg">
                  <div className="text-3xl font-light text-[#76c043] mb-1">600+</div>
                  <div className="text-xs text-gray-600">Colaboradores</div>
                </div>
                <div className="text-center p-4 bg-[#2166b0]/5 hover:bg-[#2166b0]/10 transition-colors duration-300 rounded-lg">
                  <div className="text-3xl font-light text-[#2166b0] mb-1">3</div>
                  <div className="text-xs text-gray-600">Centros de distribución</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Card 1 */}
              <div className="bg-gray-50 p-8 border border-gray-200 hover:border-[#2166b0] transition-all duration-300 hover:shadow-lg rounded-lg">
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Empresa Familiar</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  DISCOMEF SRL es una empresa familiar perteneciente al mismo grupo que DISTRIBUIDORA SERVIMAR SRL en Buenos Aires.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Con más de 65 años de experiencia en la comercialización y distribución de consumo masivo, hemos crecido constantemente gracias a nuestros valores, dedicación y compromiso con el servicio brindado a nuestros proveedores y clientes.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-50 p-8 border border-gray-200 hover:border-[#76c043] transition-all duration-300 hover:shadow-lg rounded-lg">
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Inversión y Profesionalización</h3>
                <p className="text-gray-600 leading-relaxed">
                  Año tras año hemos invertido en tecnología, recursos humanos,
                  flota de camiones y centros logísticos,
                  profesionalizando todas nuestras áreas y formando equipos cada vez mejores para cumplir nuestros objetivos, los de nuestros proveedores y clientes.
                </p>
              </div>

              {/* Card 3 (separado) */}
              <div className="bg-gray-50 p-8 border border-gray-200 hover:border-[#76c043] transition-all duration-300 hover:shadow-lg rounded-lg">
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Grupo SERVIMAR - DISCOMEF</h3>
                <p className="text-gray-600 leading-relaxed">
                  Actualmente conformamos un grupo con presencia en Buenos Aires,
                  Tucumán y Catamarca,
                  con 3 centros de distribución que nos posicionan como uno de los principales actores de distribución de consumo masivo a nivel nacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Carousel */}
      <section id="productos" className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Productos</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#2166b0] to-[#76c043] mx-auto"></div>
          </div>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border-2 border-gray-200 hover:border-[#2166b0] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[#2166b0] transition-colors" />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
                      {brandLogos
                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                        .map((brand, index) => (
                          <div
                            key={index}
                            className="aspect-square border border-gray-200 flex items-center justify-center p-8 hover:border-[#2166b0] transition-all duration-300 bg-white group hover:shadow-md transform hover:-translate-y-1 rounded-lg"
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

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border-2 border-gray-200 hover:border-[#2166b0] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#2166b0] transition-colors" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                    ? 'w-8 bg-[#2166b0]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/productos"
              className="
      w-full sm:w-auto
      px-8 py-3
      bg-[#2166b0] text-white text-sm font-medium
      rounded
      hover:bg-[#1a5490]
      transition-all duration-300 transform hover:scale-105
      text-center
    "
            >
              Ver todos
            </Link>
          </div>
        </div>
      </section>

      {/* CCU Partnership Section */}
      <section id="ccu" className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 lg:order-1">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Alianzas Estratégicas
                  <span className="block text-[#2166b0] mt-2 font-normal">
                    con CCU y ADO
                  </span>
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#2166b0] to-[#76c043]" />
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#2166b0]/5 to-[#76c043]/5 p-6 rounded-lg border-l-4 border-[#2166b0]">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Discomef es un distribuidor oficial de CCU y ADO para toda la provincia de Tucumán y Catamarca
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#2166b0]/10 rounded-lg transition-colors group-hover:bg-[#2166b0]/20">
                      <Award className="text-[#2166b0]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Calidad Premium</h3>
                      <p className="text-sm text-gray-600">
                        Productos de las marcas líderes respaldadas por CCU
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#76c043]/10 rounded-lg transition-colors group-hover:bg-[#76c043]/20">
                      <TrendingUp className="text-[#76c043]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Logística Eficiente</h3>
                      <p className="text-sm text-gray-600">
                        Red de distribución optimizada para entregas puntuales
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#2166b0]/10 rounded-lg transition-colors group-hover:bg-[#2166b0]/20">
                      <Users className="text-[#2166b0]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Soporte Integral</h3>
                      <p className="text-sm text-gray-600">
                        Asesoramiento y acompañamiento constante para tu negocio
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botón centrado y responsive */}
                <div className="mt-8 flex justify-center lg:justify-start">
                  <Link href="/conocermas" className="w-full max-w-xs lg:w-auto">
                    <button
                      className="
                  w-full
                  px-8 py-3
                  bg-[#2166b0] text-white hover:bg-[#1a5490]
                  transition-all duration-300
                  text-sm md:text-base font-medium
                  transform hover:scale-105 hover:shadow-lg
                  rounded
                "
                    >
                      Conocer Más
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative order-2 lg:order-2">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="relative h-64 lg:h-64 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/CCU.png"
                      alt="CCU Partnership Logo"
                      width={300}
                      height={200}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
                <div className="relative h-64 lg:h-64 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/ADOlogo.png"
                      alt="ADO Partnership Logo"
                      width={300}
                      height={200}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer smoothScroll={smoothScroll} />
    </div>
  );
};

export default BebidasLanding;