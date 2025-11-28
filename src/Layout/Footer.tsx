'use client';
import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Footer = ({
  smoothScroll,
}: {
  smoothScroll: (
    e: React.MouseEvent<HTMLButtonElement>,
    targetId: string
  ) => void;
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    asunto: '',
    telefono: '',
    mensaje: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  // 🔹 Refs para el formulario y el input file (CV)
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const formEl = e.currentTarget;

      // Enviamos TODO como FormData (incluye el archivo si lo hay)
      const formDataToSend = new FormData(formEl);

      const res = await fetch('/api/contacto', {
        method: 'POST',
        body: formDataToSend,
      });

      if (res.ok) {
        setStatus('success');
        // reset form
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          asunto: '',
          telefono: '',
          mensaje: '',
        });

        // limpiamos también el file input si existe
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // reseteamos el form real (por si acaso)
        formEl.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error al enviar formulario de contacto:', err);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Cuando el usuario hace click en "ENVIAR CV"
  const handleEnviarCvClick = () => {
    // si no escribió asunto, le ponemos uno por defecto
    setFormData((prev) => ({
      ...prev,
      asunto: prev.asunto || 'Envío de CV',
    }));

    // abrimos el selector de archivo
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 🔹 Cuando selecciona el archivo, mandamos el formulario automáticamente
  const handleFileChange = () => {
    if (fileInputRef.current?.files?.length && formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <footer id="contacto" className="relative">
      {/* Sección de Formulario con Imagen de Fondo */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('assets/Contacto/camion.png')" }}
      >
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Formulario de Contacto */}
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                ESCRÍBINOS
              </h2>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="NOMBRE"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-sm text-gray-900
        placeholder:text-gray-400 focus:border-[#2166b0] focus:outline-none transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="apellido"
                    placeholder="APELLIDO"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-sm text-gray-900
        placeholder:text-gray-400 focus:border-[#2166b0] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-sm text-gray-900
      placeholder:text-gray-400 focus:border-[#2166b0] focus:outline-none transition-colors"
                  required
                />

                <input
                  type="text"
                  name="telefono"
                  placeholder="TELÉFONO (opcional)"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-sm text-gray-900
      placeholder:text-gray-400 focus:border-[#2166b0] focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  name="asunto"
                  placeholder="ASUNTO"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-sm text-gray-900
      placeholder:text-gray-400 focus:border-[#2166b0] focus:outline-none transition-colors"
                  required
                />

                <textarea
                  name="mensaje"
                  placeholder="MENSAJE"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-sm text-gray-900
      placeholder:text-gray-400 focus:border-[#2166b0] focus:outline-none transition-colors"
                  required
                />

                {/* 🔹 Input file oculto para el CV (se dispara desde "ENVIAR CV") */}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="archivo"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#2166b0] text-white py-3 px-6 hover:bg-[#1a5490] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 group"
                >
                  {status === 'sending' ? 'ENVIANDO...' : 'ENVIAR'}
                  <Send
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                {status === 'success' && (
                  <p className="text-xs text-green-600 mt-2">
                    ¡Tu mensaje fue enviado correctamente!
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-red-600 mt-2">
                    Hubo un error al enviar el mensaje. Intentalo nuevamente.
                  </p>
                )}
              </form>
            </div>

            {/* Sección Derecha - CTAs */}
            <div className="space-y-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                <h3 className="text-2xl font-light mb-4">
                  ¿QUERÉS TRABAJAR CON NOSOTROS?
                </h3>
                <button
                  type="button"
                  onClick={handleEnviarCvClick}
                  className="bg-white text-[#2166b0] px-8 py-3 hover:bg-gray-100 transition-all duration-300 text-sm font-medium"
                >
                  ENVIAR CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Información */}
      <div className="bg-[#2166b0] text-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo */}
            <div>
              <img
                src="assets/discomeflogo.png"
                alt="DISCOMEF"
                className="h-32 w-auto object-contain mb-4 brightness-0 invert transition-transform hover:scale-105 duration-300"
              />
            </div>

            {/* Navegación */}
            <div>
              <h5 className="font-medium text-white mb-4 text-sm">
                NAVEGACIÓN
              </h5>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <button
                    onClick={(e) => smoothScroll(e, 'inicio')}
                    className="hover:text-white transition-all hover:translate-x-1 inline-block"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => smoothScroll(e, 'historia')}
                    className="hover:text-white transition-all hover:translate-x-1 inline-block"
                  >
                    Historia
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => smoothScroll(e, 'productos')}
                    className="hover:text-white transition-all hover:translate-x-1 inline-block"
                  >
                    Productos
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => smoothScroll(e, 'ccu')}
                    className="hover:text-white transition-all hover:translate-x-1 inline-block"
                  >
                    CCU
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h5 className="font-medium text-white mb-4 text-sm">
                CONTACTO
              </h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2 hover:text-white transition-colors group">
                  <Phone
                    size={16}
                    className="text-[#76c043] transition-transform group-hover:scale-110"
                  />
                  +54 381 123-4567
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors group">
                  <Mail
                    size={16}
                    className="text-[#76c043] transition-transform group-hover:scale-110"
                  />
                  info@discomef.com.ar
                </li>
              </ul>
            </div>

            {/* Redes Sociales */}
            <div>
              <h5 className="font-medium text-white mb-4 text-sm">
                SÍGUENOS
              </h5>
              <div className="flex gap-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61562237308522"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/discomef/"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
            <p>&copy; DISCOMEF. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
