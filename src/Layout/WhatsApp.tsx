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
        bg-[#25D366]
        text-white
        shadow-lg
        hover:shadow-xl
        hover:scale-105
        transition-transform
      "
    >
      {/* Icono simple tipo WhatsApp */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          d="M16 3C9.37 3 4 8.22 4 14.68c0 2.59.88 4.98 2.39 6.93L4 29l7.64-2.31A12.5 12.5 0 0 0 16 26.36C22.63 26.36 28 21.14 28 14.68 28 8.22 22.63 3 16 3Z"
          fill="currentColor"
        />
        <path
          d="M12.84 10.49c-.23-.52-.48-.53-.7-.54-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61 0 1.54 1.13 3.03 1.29 3.24.16.21 2.18 3.46 5.39 4.71 2.66 1.05 3.21.84 3.79.79.58-.05 1.88-.77 2.14-1.51.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.6-.37-.31-.16-1.88-.93-2.17-1.04-.29-.11-.5-.16-.7.16-.2.31-.8 1.04-.98 1.25-.18.21-.36.24-.66.08-.29-.16-1.23-.46-2.34-1.46-.86-.76-1.44-1.7-1.62-1.99-.18-.29-.02-.46.14-.61.14-.14.31-.37.47-.56.16-.19.21-.31.31-.52.1-.21.05-.39-.02-.55-.08-.16-.7-1.73-.96-2.37Z"
          fill="#ffffff"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
