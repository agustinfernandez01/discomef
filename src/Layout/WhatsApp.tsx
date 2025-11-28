'use client';

import React, { useMemo } from 'react';

type WhatsAppButtonProps = {
  /** Número de WhatsApp. Podés pasarlo con o sin +, espacios, guiones, etc. */
  phone: string;
  /** Mensaje opcional que se pre-carga en el chat */
  message?: string;
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phone, message }) => {
  const href = useMemo(() => {
    // Limpia el número para el formato que pide WhatsApp (solo dígitos)
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const base = `https://wa.me/${cleanPhone}`;

    if (!message) return base;

    return `${base}?text=${encodeURIComponent(message)}`;
  }, [phone, message]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="
        fixed 
        bottom-8 right-8 
        z-50 
        flex items-center justify-center
        h-14 w-14
        rounded-full 
        bg-[#FFFFFF]
        text-white
        shadow-lg
        hover:shadow-xl
        hover:scale-105
        transition-transform
      "
    >
      {/* Icono simple tipo WhatsApp */}
   <img src="/assets/wasaplogo.png" alt="" />
    </a>
  );
};

export default WhatsAppButton;
