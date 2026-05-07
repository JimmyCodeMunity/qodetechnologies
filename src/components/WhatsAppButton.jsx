import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/254141447430"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-green-600 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7 text-white"
      >
        <path d="M16.002 2.001c-7.732 0-14 6.268-14 14 0 2.471.642 4.84 1.85 6.92L2.001 29.999l7.234-1.803A13.95 13.95 0 0016.002 30c7.732 0 14-6.268 14-14s-6.268-14-14-14zm7.72 19.28c-.32.9-1.87 1.83-2.61 1.94-.7.11-1.37.5-4.56-.96-3.86-1.7-6.32-6.08-6.51-6.36-.19-.28-1.55-2.06-1.55-3.93s.98-2.78 1.33-3.17c.35-.39.77-.48 1.02-.48.26 0 .51 0 .73.01.24.01.56-.09.87.66.32.77 1.09 2.69 1.18 2.88.09.19.15.41.03.66-.12.25-.18.41-.36.62-.18.22-.38.45-.53.6-.18.18-.36.37-.16.73.2.35.89 1.46 1.91 2.37 1.31 1.17 2.42 1.54 2.76 1.71.34.17.54.14.74-.08.2-.23.85-.99.96-1.15.12-.17.23-.14.39-.08.15.06.98.46 1.15.54.17.08.29.12.33.19.04.07.04.4-.09.91z" />
      </svg>
      <span className="absolute right-16 bg-white text-green-600 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
