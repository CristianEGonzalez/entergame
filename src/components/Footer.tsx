import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Catálogo", href: "#catalogo" },
    { name: "Canje", href: "#canje" },
    { name: "Comprar", href: "#comprar" },
    { name: "Vender", href: "#vender" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 px-4 lg:px-8 font-sans border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto">
        
        {/* === CONTENIDO PRINCIPAL === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* 1. Marca y Descripción */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl !font-orbitron font-black tracking-tighter mb-4 flex items-center gap-1">
              <span className="text-brand-cyan">Enter</span>
              <span className="text-brand-red">Game</span>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              Tu próxima aventura empieza acá. Nos especializamos en la compra, venta y canje de juegos físicos para Nintendo Switch.
            </p>
          </div>

          {/* 2. Navegación Rápida */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">
              Secciones
            </h3>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-red-500 transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Ubicación y Contacto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">
              Información
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <span className="text-xl">📍</span>
                <span className="font-medium">Zona Oeste, Buenos Aires</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="text-xl">🌐</span>
                <a 
                  href="https://entergame.vercel.app" 
                  className="font-medium hover:text-cyan-400 transition-colors"
                >
                  entergame.vercel.app
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="#inicio" // Asegurate de que tu Hero tenga id="inicio" o cambiá esto para subir al tope
                  className="inline-block bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-5 py-2 text-sm font-bold transition-all"
                >
                  ↑ Volver arriba
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* === LÍNEA DIVISORIA === */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

        {/* === COPYRIGHT === */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm font-medium gap-4 text-center md:text-left">
          <p>© {currentYear} EnterGame. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Desarrollado por{" "}
            <a 
              href="https://www.entercode.com.ar"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center ml-1 font-black tracking-wide hover:scale-105 transition-transform"
            >
              <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono mr-1">
                {`>`}
              </span>
              <span className="text-white">Enter</span>
              <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Code
              </span>
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;